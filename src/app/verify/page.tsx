import Verify from "@/components/verify"
import SplashLogin from "@public/SplashLogin.webp"
import Image from "next/image"


const VerifyCode = () => {
  return (
    <div className="flex min-h-screen">
      <div className="image-full card rounded-none w-[70dvw] h-screen bg-cover before:!rounded-none">
        <figure className="rounded-none">
          <Image src={SplashLogin} alt="Image Login" />
        </figure>
        <div className="card-body">
          <div className="mt-auto font-semibold">
            <img src="https://idvacc.id/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fidvacc-logo.69d8c535.png&w=256&q=75" alt="IDvACC Logo" />
            <h1 className="text-6xl text-[#29b473]"><span className="text-red-600">I</span><span className="text-white">D</span>vACC <span className="text-white">CBT</span></h1>
            <p>Indonesia vACC CBT Website</p>
            <span className="text-xs font-light">v{process.env.APP_VERSION}</span>
          </div>
        </div>
      </div>
      <Verify />
    </div>
  )
}

export default VerifyCode
