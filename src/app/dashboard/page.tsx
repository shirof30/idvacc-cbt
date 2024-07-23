import { BookCheck, Clock, ShieldHalf } from 'lucide-react';
import Events from '@/components/events';
import Servers from '@/components/servers';
import ATCs from '@/components/atcs';
import ATCSessions from '@/components/atc-sessions';
import { auth } from '@auth';
import { redirect } from 'next/navigation';

const Dashboard: React.FC = async () => {
  const session = await auth();
  console.log();
  
  return (
    <>
      <h1 className='text-xl font-semibold'>Welcome Aboard, {session?.user.personal.name_full}!</h1>
      <div className='grid grid-flow-col p-4 mt-5 gap-9 lg:grid-cols-2 lg:grid-rows-1 bg-base-content rounded-3xl'>
        <div className='flex flex-col col-span-3 gap-8 h-[70dvh]'>
          <div className='flex gap-5'>
            <div className='w-full lg:w-[22rem] col-span-3'>
              <div className='relative h-32 shadow bg-base-300 card card-compact'>
                <div className='flex flex-col justify-between mt-auto card-body'>
                  <p className='text-base font-semibold card-title lg:text-2xl'>{session?.user.vatsim.rating.short} - {session?.user.vatsim.rating.long}</p>
                  <p className='font-base'>Rating</p>
                  <div className='absolute flex items-center justify-center w-10 h-10 border-4 rounded-full -top-2 border-base-content bg-base-300 -right-3'>
                    <ShieldHalf />
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full lg:w-[22rem]'>
              <div className='relative h-32 shadow bg-base-300 card card-compact'>
                <div className='flex flex-col justify-between mt-auto card-body'>
                  <div className='text-base font-semibold card-title lg:text-2xl'>{
                    await fetch(`https://api.vatsim.net/v2/members/${session?.user.cid}/stats`).then(res => res.json()).then(data => !data.atc ? 0 : data.atc)} hours</div>
                  <p className='font-base'>Time Spended</p>
                  <div className='absolute flex items-center justify-center w-10 h-10 border-4 rounded-full -top-2 border-base-content bg-base-300 -right-3'>
                    <Clock />
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full lg:w-[15rem]'>
              <div className='relative h-32 shadow bg-base-300 card card-compact'>
                <div className='flex flex-col justify-between mt-auto card-body'>
                  <p className='text-base font-semibold card-title lg:text-2xl'>3</p>
                  <p className='font-base'>Courses Completed</p>
                  <div className='absolute flex items-center justify-center w-10 h-10 border-4 rounded-full -top-2 border-base-content bg-base-300 -right-3'>
                    <BookCheck />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full h-[560px] p-4 row-span-1 bg-base-300 rounded-xl flex flex-col gap-4 shadow'>
            <h1 className='font-semibold'>VATSIM Details</h1>
            <div className='flex gap-7'>
              <div className='w-[300px]'>
                Active Events
                <div className='mt-4 overflow-y-auto'>
                  <Events />
                </div>
              </div>
              <div>
                Server Status
                <div className='mt-4 overflow-y-auto'>
                  <Servers />
                </div>
              </div>
              <div>
                Active ATC
                <div className='mt-4 overflow-y-auto'>
                  <ATCs />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-1 row-span-2 p-4 shadow w-[350px] rounded-xl bg-base-300'>
          <h2 className='font-semibold'>ATC Session History</h2>
          <div className='overflow-x-auto'>
            <ATCSessions cid={session?.user.cid ?? ''} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard;