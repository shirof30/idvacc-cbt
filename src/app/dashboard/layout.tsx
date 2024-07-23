import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import NextTopLoader from "nextjs-toploader";
import type { Metadata } from 'next';

interface DashboardLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  description: "CBT Training page for IDvACC",
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <NextTopLoader showSpinner={false} />
        <div className="flex min-h-screen overflow-y-auto bg-base-100">
          <Sidebar />
          <div className="flex-1 flex-grow w-full">
            <Header />
            <main className="p-4 overflow-y-auto">
              {children}
              <div className="absolute text-xs font-semibold bottom-2 left-2 text-neutral-content">
                &copy;{ new Date().getFullYear() } IDvACC
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}