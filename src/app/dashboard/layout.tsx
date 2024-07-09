import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  description: "CBT Training page for IDvACC",
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-[#e9ecef] overflow-y-auto">
          <Sidebar />
          <div className="flex-1 flex-grow w-full">
            <Header />
            <main className="p-4 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}