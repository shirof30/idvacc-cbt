'use client'
import axios from "axios"
import React, { useCallback, useState, useEffect } from "react";

interface ATC {
  id: number;
  callsign: string;
  start: string;
  server: string;
  rating: number;
  fp: any;
}

const ATCs: React.FC = React.memo(() => {
  const [atcs, setATCs] = useState<ATC[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  const fetchATCs = useCallback(async () => {
    const response = await axios.get('api/atcs')
    const data = response.data
    if (Array.isArray(data)){
      setATCs(data)
    }else{
      setATCs([])
    }
    setIsLoading(false)
  }, [])

  const ConvertTimeAgo = (time: string) => {
    const date = new Date(time).getTime()
    const now = new Date().getTime()

    let diff = now - date

    let hour = Math.floor(diff / (1000 * 60 * 60))
    let minute = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0')

    return `${hour}:${minute}`
  }

  useEffect(() => {
    fetchATCs()
  }, [fetchATCs])
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
                <th>Callsign</th>
                <th>Time Elapsed</th>
              </tr>
            </thead>
            <tbody>
              {atcs.length > 0 ?
              atcs.map((atc: ATC, index) => (
                <tr key={atc.id || index}>
                  <td>{index + 1}</td>
                  <td>{atc.callsign}</td>
                  <td>{ConvertTimeAgo(atc.start)}</td>
                </tr>
              )) :
              <tr>
                <td colSpan={3} className="text-center">No ATCs found</td>
              </tr>
              }
              
            </tbody>
          </table>
      }
    </>
  )
})

export default ATCs