import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

interface Event {
  id: number;
  type: string;
  name: string;
  link: string;
  organisers: {
    region: string;
    division: string;
    subdivision: string | null;
    organised_by_vatsim: boolean;
  }[];
  airports: {
    icao: string;
  }[];
  routes: any[];
  start_time: string;
  end_time: string;
  short_description: string;
  description: string;
  banner: string;
}

interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export async function GET() {
  try {
    const response = await axios.get<{data: Event[]}>("https://my.vatsim.net/api/v2/events/latest")
    const { data } = response.data
    if (data){
      const filtered_data = data.filter((event) => event.airports.some((airport) => airport.icao.startsWith("WI") || airport.icao.startsWith("WA")))
      return NextResponse.json(filtered_data, {status: 200})
    } else {
      throw new AxiosError("No events found", '204')
    }
  }
  catch (e: any) {
    if(axios.isAxiosError<ValidationError, Record<string, unknown>>(e)){
      return NextResponse.json(e.message, {status: e.status})
    }
  }
}