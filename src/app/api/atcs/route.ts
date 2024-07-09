import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

interface ATC {
  id: number;
  callsign: string;
  start: string;
  server: string;
  rating: number;
  fp: any;
}

interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export async function GET() {
  try {
    const { data } = await axios.get<ATC[]>("https://api.vatsim.net/v2/atc/online")
    if (data){
      let filtered_data = data.filter((atc: ATC) => atc.callsign.startsWith("WI") || atc.callsign.startsWith("WA"))
      if(filtered_data.length > 0) return NextResponse.json(filtered_data, {status: 200})
      throw new AxiosError("No Indonesia ATCs found", '204')
    } else {
      // return NextResponse.json("No ATCs found", {status: 404})
      throw new AxiosError("No ATCs found", '204')
    }
  }
  catch (e: any) {
    if(axios.isAxiosError<ValidationError, Record<string, unknown>>(e)){
      return NextResponse.json(e.message, {status: e.status})
    }
  }
}