import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

interface Server {
  ident: string;
  hostname_or_ip: string;
  location: string;
  name: string;
  clients_connection_allowed: number;
  client_connections_allowed: boolean;
  is_sweatbox: boolean;
}

interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export async function GET() {
  try {
    const response = await axios.get<{data: Server[]}>("https://data.vatsim.net/v3/all-servers.json")
    const { data } = response
    if (data){
      return NextResponse.json(data, {status: 200})
    } else {
      throw new AxiosError("No servers found", '204')
    }
  }
  catch (e: any) {
    if(axios.isAxiosError<ValidationError, Record<string, unknown>>(e)){
      return NextResponse.json(e.message, {status: e.status})
    }
  }
}