'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { courses_data, Question } from '@data/constant-data'

interface PretestProps {
  id: number
  questions?: Question[]
}

interface ConfirmPretestProps extends PretestProps {
  setConfirmed: (value: boolean) => void
}

const Pretest: React.FC<PretestProps> = ({ id, questions }) => {
  const [confirmed, setConfirmed] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {

  }, [confirmed])

  return (
    <>
      {
        loading ?
          (
            <div className='flex items-center justify-center h-[500px]'>
              <span className='loading loading-spinner text-base-200 loading-lg'>
              </span>
            </div>
          ) :
          confirmed ? (
            <>
              <h1 className='text-xl font-semibold text-neutral'>Pretest</h1>
              <div className='flex flex-col items-center justify-center w-full h-96 gap-7 text-neutral'>
                <p>Pretest questions here</p>
              </div>
            </>
          ) : (
            <>
              <ConfirmPretest id={id} setConfirmed={setConfirmed} />
            </>
          )
      }
    </>
  )
}

const ConfirmPretest: React.FC<ConfirmPretestProps> = ({ id, setConfirmed }) => {
  const { data: session } = useSession()

  const handleConfirm = () => {
    setConfirmed(true)
  }

  return (
    <div>
      <h1 className='text-xl font-semibold text-neutral'>Confirmation</h1>
      <div className='flex flex-col items-center justify-center w-full h-96 gap-7 text-neutral'>
        <p>Are you want to start this test?</p>
        <div className='text-neutral'>
          <table>
            <tbody>
              <tr className='text-2xl'>
                <td className='font-semibold'>VATSIM CID</td>
                <td className='font-semibold'>:&nbsp;</td>
                <td>{session?.user.cid}</td>
              </tr>
              <tr className='text-2xl'>
                <td className='font-semibold'>Name</td>
                <td className='font-semibold'>:&nbsp;</td>
                <td>{session?.user.personal.name_full}</td>
              </tr>
              <tr className='text-2xl'>
                <td className='font-semibold'>Course Taken&nbsp;</td>
                <td className='font-semibold'>:&nbsp;</td>
                <td>{courses_data[id].block}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button onClick={handleConfirm} className='btn'>Start Test</button>
      </div>
    </div>
  )
}

const PretestQuestion: React.FC = () => {
  const shuffleArray = (arr: Question[]) => {
    return arr.sort(() => Math.random() - 0.5)
  }
  return (
    <div>
    </div>
  )
}

export default Pretest