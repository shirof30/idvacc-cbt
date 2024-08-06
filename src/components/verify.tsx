'use client'
import { useState } from "react"
import axios from "axios"

interface VerifyProps {
  cid: string
  name: string
  course: string
}

const Verify: React.FC = () => {
  const [code, setCode] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<VerifyProps>();

  const handleSearchCode = async () => {
    setLoading(true)
    try {
      const { data } = await axios.post('/api/verify', { code }, { headers: { 'Content-Type': 'application/json' } }).catch(e => { 
        setData(undefined)
        throw new Error(e.message)
      })

      if (data.message === 'Code found') {
        setData({
          cid: data.data.cid,
          name: data.data.name,
          course: data.data.course
        })
      }
    } catch (e) {
      console.error(e)
      alert('Code not found')
    }
    setLoading(false)
  }

  return (
    <div className="relative flex-1 w-full p-3 font-semibold">
      <div className="text-center">
        <h1 className="mt-8 text-4xl">Verify Code</h1>
        <p className="mt-2 font-normal">Please enter the code you received</p>
      </div>
      <div className="flex items-center justify-center gap-4 mt-12">
        <input type="text" className="flex items-center justify-center p-4 text-lg text-white input h-1/6 hover:text-neutral-content input-bordered" placeholder="Enter Code" value={code} onChange={e => setCode(e.target.value)} />
        <button onClick={handleSearchCode} className="flex items-center justify-center p-4 text-lg text-white h-1/6 btn hover:text-neutral-content btn-primary" type="button">
          <p>Submit</p>
        </button>
      </div>
      <div className="mx-auto mt-12">
        {loading ? (
          <div className="flex h-[20dvh] w-full items-center justify-center">
            <span className="loading loading-lg loading-spinner"></span>
          </div>
        ) : data && (
          <>
            <VerifyData data={data} />
          </>
        )}
      </div>
    </div>
  )
}

const VerifyData: React.FC<{ data: VerifyProps }> = ({ data }) => {
  return (
    <div className="w-full h-48 p-3 card bg-base-200">
      {
        data !== undefined ? (
          <>
            <h1 className="text-xl ">Data Found!</h1>
            <table className="mt-3 ">
              <tbody>
                <tr>
                  <td>CID</td>
                  <td>:</td>
                  <td>{data.cid}</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>:</td>
                  <td>{data.name}</td>
                </tr>
                <tr>
                  <td>Course</td>
                  <td>:</td>
                  <td>{data.course}</td>
                </tr>
              </tbody>
            </table>
          </>
        ) : (
          <h1 className="text-xl">Data Not Found!</h1>
        )
      }
    </div>
  )
}

export default Verify