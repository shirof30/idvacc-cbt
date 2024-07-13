'use client'
import axios from "axios"
import React, { useCallback, useState, useEffect } from "react";

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

const Events: React.FC = React.memo(() => {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const fetchEvents = useCallback(async () => {
    const { data } = await axios.get('api/events')
    Array.isArray(data) ? setEvents(data) : setEvents([])
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])
  return (
    <>
      {
        isLoading ?
          <div className="flex items-center justify-center w-full h-[20dvh]">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
          :
          <table className='table'>
            <thead>
              <tr>
                <th></th>
                <th>Event Name</th>
              </tr>
            </thead>
            <tbody>
              {
                events.length > 0 ?
                  events.map((event: Event, index) => (
                    <tr key={event.id || index}>
                      <td>{index + 1}</td>
                      <td className="font-semibold hover:underline">
                        <a href={event.link} target="_blank noopener noreferrer">
                          {event.name}
                        </a>
                      </td>
                    </tr>
                  ))
                  :
                  <tr>
                    <td colSpan={2} className="text-center">
                      No events found
                    </td>
                  </tr>
              }
            </tbody>
          </table>
      }
    </>
  )
})

export default Events