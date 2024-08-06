import CourseData from "@/components/courses";
import { courses_data } from "@data/constant-data";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { auth } from "@auth";
import { prisma } from "@lib/prisma";

interface CoursePageProps {
  params: {
    id: number;
  };
}

export const generateMetadata = ({ params }: CoursePageProps): Promise<Metadata> => {
  return Promise.resolve({
    title: `${courses_data[params.id - 1].block} - IDvACC CBT SITE`,
  });
}

const CoursePage: React.FC<CoursePageProps> = async ({ params }) => {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: { cid: session?.user.cid },
    select: { id: true }
  })

  const userSections = await prisma.userSection.findMany({
    where: { userId: user?.id },
    select: {
      completed: true,
      section: {
        select: {
          title: true,
          id: true,
          courseId: true
        },
      }
    },
    orderBy: {
      section: {
        title: 'asc'
      }
    }
  })
  
  const currentCourse = courses_data[params.id - 1].id;
  const currentCourseSections = userSections.filter(section => section.section.courseId === currentCourse);
  const completedSectionCount = currentCourseSections.filter(section => section.completed).length;
  const totalSections = courses_data[params.id - 1].chapters.length;

  return (
    <div id={courses_data[params.id - 1].id}>
      <h1 className="text-2xl font-semibold">{`Courses: ${courses_data[params.id - 1].block}`}</h1>
      <Link className="mt-3 text-lg btn btn-outline" href='/dashboard/courses'><ChevronLeft /> Back</Link>
      <div className="p-4 mt-5 bg-base-content rounded-3xl min-h-[60dvh]">
        <div className="mb-3 text-xl text-neutral">
          Course Section
        </div>
        <div className="flex flex-col gap-6">
          {
            courses_data[params.id - 1].chapters.map(chapter => {
              const isCompleted = userSections.some(section => section.section.id === chapter.id && section.completed);
              return (
                <div key={chapter.id}>
                  <CourseData id={chapter.id} data={chapter} completed={isCompleted} />
                </div>
              )
            })
          }
          {
            completedSectionCount === totalSections ? (<Link href={`../pretest?courseId=${courses_data[params.id - 1].id}`} className="w-72 btn bg-base-200">Start Pre-Test Exam</Link>) : null
          }
        </div>
      </div>
    </div>
  )
}

export default CoursePage;