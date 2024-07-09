'use client'
import { cn } from "@lib/utils";
import { useState } from "react";
import { DashboardNav, NavItems } from "./sidebar";
import { MenuIcon } from "lucide-react";

const Header: React.FC = () => {
  return (
    <div className="sticky top-0 left-0 z-20 w-full ring-0 bg-inherit/95 h-14">
      <nav className="flex items-center justify-between px-4">
        <div className={cn('block md:!hidden')}>
          <MobileNav />
        </div>
        <h1 className="hidden my-3 ml-5 text-2xl font-semibold md:block">Indonesia vAcc CBT</h1>

        <div className="flex items-center gap-2">
          <UserNav />
        </div>
      </nav>
    </div>
  )
}

const MobileNav = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-3 drawer">
      <input type="checkbox" className="drawer-toggle" id="drawer-nav" />
      <div className="drawer-content">
        <label htmlFor="drawer-nav" aria-label="close sidebar" className="drawer-overlay btn btn-base-100"><MenuIcon /></label>
      </div>
      <div className="drawer-side">
        <div className="min-h-full p-4 menu bg-base-200 text-base-content w-80">
          <div className="space-y-1">
            <DashboardNav setOpen={setOpen} isMobile={true} items={NavItems} />
          </div>
        </div>
      </div>
    </div>
  )
}

const UserNav = () => {
  return (
    <div className="cursor-pointer avatar dropdown dropdown-end">
      <div tabIndex={0} className="w-10 rounded-full">
        <img src="https://ui-avatars.com/api/?background=0D8ABC&color=fff" alt="avatar" />
      </div>
      <ul tabIndex={0} className="shadow dropdown-content menu bg-base-200 rounded-box w-52 z-[1] mt-2 font-semibold">
        <li><a href="#">Profile</a></li>
        <li><a href="#">Logout</a></li>
      </ul>
    </div>
  )
}

export default Header;