'use client'
import axios from "axios"
import React, { useCallback, useState, useEffect } from "react";

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

type ATCSessionsProps = {
  cid: string;
}

const ATCSessions: React.FC<ATCSessionsProps> = React.memo(({ cid }) => {
  const [atcSessions, setATCSessions] = useState<ATCSession[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchATCSessions = useCallback(async () => {
    const response = await axios.get<{items: ATCSession[]}>(`api/atc-sessions?cid=${cid}`)
    const data = response.data.items
    if (data.length > 0) {
      setATCSessions(data)
    } else {
      setATCSessions([])
    }
    setIsLoading(false)
  }, [])

  const ConvertTimeAgo = (start: string, end: string) => {
    const timeStart = new Date(start).getTime()
    const timeEnd = new Date(end).getTime()

    let diff = timeEnd - timeStart

    let hour = Math.floor(diff / (1000 * 60 * 60))
    let minute = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0')

    return `${hour}:${minute}`
  }

  useEffect(() => {
    fetchATCSessions()
  }, [fetchATCSessions])
  return (
    <>
      {
        isLoading ?
          <div className="flex items-center justify-center w-full h-[20dvh]">
            <span className="loading loading-spinner loading-lg"></span>
          </div> :
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Callsign</th>
                <th>Time Elapsed</th>
              </tr>
            </thead>
            <tbody>
              {atcSessions.length > 0 ?
                atcSessions.map((atcSession, index) => (
                  <tr key={atcSession.connection_id.id}>
                    <td>{index + 1}</td>
                    <td>{atcSession.connection_id.callsign}</td>
                    <td>{ConvertTimeAgo(atcSession.connection_id.start, atcSession.connection_id.end)}</td>
                  </tr>
                )) :
                <tr>
                  <td colSpan={3} className="text-center">No ATC sessions found</td>
                </tr>
              }
            </tbody>
          </table>
      }
    </>
  )
})

export default ATCSessions