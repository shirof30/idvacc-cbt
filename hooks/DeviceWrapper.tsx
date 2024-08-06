'use client'
import { useMediaQuery } from "react-responsive"
import { ReactNode, useEffect, useState } from "react";

export default function DeviceWrapper({ children }: { children: ReactNode }) {
  const [mobileView, setMobileView] = useState(false)
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    setMobileView(isMobile)
  }, [isMobile])
  return (
    <>
      {mobileView ? <MobileWarning /> : children}
    </>
  )
}

const MobileWarning = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-3 text-neutral-content rounded-box">
        <div className="flex-1">
          <p className="font-semibold">Warning</p>
          <p className="text-sm">This website is not optimized for mobile devices. Please use a desktop or laptop for the best experience.</p>
        </div>
      </div>
    </div>
  )
}