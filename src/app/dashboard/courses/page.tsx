import type { Metadata } from "next";
import { courses_data, Section } from "@data/constant-data";
import Link from "next/link";
import { prisma } from "@lib/prisma";
import { auth } from "@auth";


export const metadata: Metadata = {
  title: "Courses - IDvACC CBT SITE",
}

const Courses: React.FC = async () => {
  const session = await auth();

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



  return (
    <div>
      <h1 className="text-xl font-semibold">My Courses</h1>
      <div className="p-4 mt-5 bg-base-content rounded-3xl min-h-[70dvh]">
        <div className="flex flex-wrap gap-6 xl:justify-start lg:justify-center ms-auto">
          {
            courses_data.map((section: Section, idx: number) => {
              const userCourse = userCourses.find(course => course.course.id === section.id);
              return (
                <Link key={idx} id={section.id} href={`/dashboard/courses/${idx + 1}`}>
                  <div className="shadow-lg image-full card bg-base-200 w-[40dvh] h-[20dvh] hover:cursor-pointer hover:before:opacity-60 transition duration-500">
                    <figure>
                      <img src={section.imgUrl} alt={section.block} />
                    </figure>
                    <div className="p-3 text-white card-body">
                      <h1 className="text-lg font-semibold card-title">{`Block ${idx + 1}: ${section.block}`}</h1>
                      <div className="absolute right-5 bottom-3">
                        {
                          userCourse && userCourse.completed ? (
                            <div className="badge badge-success">
                              <span>&#10004; Completed</span>
                            </div>
                          )
                            :
                            null
                        }
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Courses;