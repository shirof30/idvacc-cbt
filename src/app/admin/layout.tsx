import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import NextTopLoader from "nextjs-toploader";
import type { Metadata } from 'next';
import { auth } from "@auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { prisma } from "@lib/prisma";
import { courses_data } from "@data/constant-data";

interface DashboardLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  description: "CBT Training page for IDvACC",
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await auth();
  if (!session) redirect('/login');
  

  const user = await prisma.user.findUnique({
    where: { cid: session?.user.cid },
    select: { id: true }
  })

  const userCourses = await prisma.userCourse.findMany({
    where: { userId: user?.id },
    select: {
      completed: true,
      course: {
        select: {
          title: true,
          id: true
        },
      }
    },
    orderBy: {
      course: {
        title: 'asc'
      }
    }
  })

  const userSections = await prisma.userSection.findMany({
    where: { userId: user?.id },
    select: {
      completed: true,
      section: {
        select: {
          title: true,
          id: true
        },
      }
    }
  })

  if (userCourses.length === 0) {
    courses_data.forEach(async (section) => {
      await prisma.userCourse.create({
        data: {
          userId: user?.id ?? "",
          courseId: section.id,
          completed: false
        }
      })
    })
  }

  if (userSections.length === 0) {
    courses_data.forEach(async (section) => {
      section.chapters.forEach(async (chapter) => {
        await prisma.userSection.create({
          data: {
            userId: user?.id ?? "",
            sectionId: chapter.id,
            completed: false
          }
        })
      })
    })
  }

  return (
    <SessionProvider session={session}>
      <NextTopLoader showSpinner={false} />
      <div className="flex min-h-screen overflow-y-auto bg-base-100">
        <Sidebar />
        <div className="flex-1 flex-grow w-full">
          <Header />
          <main className="p-4 overflow-y-auto">
            {children}
            <div className="absolute text-xs font-semibold bottom-2 left-2 text-neutral-content">
              &copy;{new Date().getFullYear()} IDvACC
            </div>
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}