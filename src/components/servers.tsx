'use client'
import { cn } from "@lib/utils";
import axios from "axios"
import React, { useCallback, useState, useEffect } from "react";

interface Server {
  ident: string;
  hostname_or_ip: string;
  location: string;
  name: string;
  clients_connection_allowed: number;
  client_connections_allowed: boolean;
  is_sweatbox: boolean;
}

const Servers: React.FC = React.memo(() => {
  const [servers, setServers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const fetchServers = useCallback(async () => {
    const { data } = await axios.get('api/servers')
    setServers(data)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchServers()
  }, [fetchServers])

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
                <th>Server Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {servers.map((server: Server, index) => (
                <tr key={server.ident || index}>
                  <td>{server.name}</td>
                  <td>
                    <p className={cn('badge font-semibold', server.client_connections_allowed === true ? 'badge-success' : 'badge-warning', 'flex items-center justify-center')}>
                      {server.client_connections_allowed === true ? 'Online' : 'Maintenance'}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      }
    </>
  )
})

export default Servers