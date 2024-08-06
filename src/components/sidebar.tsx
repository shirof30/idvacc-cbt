'use client';
import { Dispatch, SetStateAction, useState } from "react";
import { useSidebar } from "@hooks/useSidebar";
import { cn } from "@lib/utils";
import { Icons } from "./icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronLeft } from "lucide-react";

interface SidebarProps {
  className?: string;
}

interface DashboardNavProps {
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobile?: boolean;
  items: NavItem[];
}

interface NavItem {
  title: string;
  href: string;
  icon: keyof typeof Icons;
  label?: string;
}

interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export type MainNavItem = NavItemWithOptionalChildren;
export type SidebarNavItem = NavItemWithChildren;

export const NavItems: NavItem[] = [
  {
    title: 'Home',
    href: '/',
    icon: 'home',
  },
  {
    title: 'Courses',
    href: '/courses',
    icon: 'course',
  },
  {
    title: 'Statistics',
    href: '/statistics',
    icon: 'statistic',
  },

]



const Sidebar: React.FC = ({ className }: SidebarProps) => {
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = useState(false);

  const handleToggle = () => {
    setStatus(!status);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };

  return (
    <div>
      <nav className={cn("mt-8 border border-base-200 rounded-e-xl h-[85dvh] bg-base-300 md:block hidden", status && 'duration-500', !isMinimized ? 'w-56' : 'w-[72px]', className)}>
        <div className="py-4 space-y-4">
          <div className="px-3 py-2">
            <div className="mt-2 space-y-1">
              <div className={cn('text-3xl text-neutral-content cursor-pointer ms-2 -mt-3 mb-10 rounded-full size-8')} onClick={handleToggle}>
                {isMinimized ? <Menu /> : <ChevronLeft />}
              </div>
              <DashboardNav items={NavItems} />
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export const DashboardNav = ({ items, setOpen, isMobile = false }: DashboardNavProps) => {
  const path = usePathname();
  const { isMinimized } = useSidebar();

  if (!items?.length) {
    return null;
  }

  return (
    <div className="grid items-start gap-2">
      {items.map((item, idx) => {
        const Icon = Icons[item.icon]
        return (
          item.href && (
            <div key={idx} className={`${isMinimized ? 'tooltip tooltip-right' : ''}`} data-tip={item.title}>
              <Link href={!item.href ? '/' : item.href} className={cn('flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-base-100 hover:text-neutral-content transition-colors duration-300', path === item.href ? 'bg-primary text-primary-content' : 'bg-transparent')} onClick={() => { if (setOpen) setOpen(false) }}>
                <Icon className='ml-3 size-5' />
                {isMobile || (!isMinimized && !isMobile) ? <span className='mr-2 font-semibold truncate'>{item.title}</span> : ''}
              </Link>
            </div>
          )
        )
      })}
    </div>
  )
}



export default Sidebar;