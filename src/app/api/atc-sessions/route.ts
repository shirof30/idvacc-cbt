import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

interface ATCSession {
  connection_id: {
    id: number;
    vatsim_id: string;
    type: number;
    rating: number;
    callsign: string;
    start: string;
    end: string;
    server: string;
  };
  aircrafttracked: number;
  aircraftseen: number;
  flightsamended: number;
  handoffsinitiated: number;
  handoffsreceived: number;
  handoffsrefused: number;
  squawksassigned: number;
  cruisealtsmodified: number;
  tempaltsmodified: number;
  scratchpadmods: number;
}

interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export async function GET(request: Request) {
// export async function GET() {
  try {
    const { searchParams } = new URL(request.url)
    const cid = searchParams.get('cid')
    const { data } = await axios.get<{data: ATCSession[]}>(`https://api.vatsim.net/v2/members/${cid}/atc?limit=10`)
    // const response = await axios.get<{data: ATCSession[]}>(`https://api.vatsim.net/v2/members/1452880/atc`)
    if(data){
      return NextResponse.json(data, {status: 200})
    }
    else {
      throw new AxiosError("No ATC sessions found", '204')
    }
  }
  catch (e: any) {
    if(axios.isAxiosError<ValidationError, Record<string, unknown>>(e)){
      return NextResponse.json(e.message, {status: e.status})
    }
  }
}