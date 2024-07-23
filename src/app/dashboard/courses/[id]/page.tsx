import CourseData from "@/components/courses";
import { courses_data } from "@data/constant-data";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

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

const CoursePage: React.FC<CoursePageProps> = ({ params }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">{`Courses: ${courses_data[params.id - 1].block}`}</h1>
      <Link className="mt-3 text-lg btn btn-outline" href='/dashboard/courses'><ChevronLeft /> Back</Link>
      <div className="p-4 mt-5 bg-base-content rounded-3xl min-h-[60dvh]">
        <div className="mb-3 text-xl text-neutral">
          Course Section
        </div>
        <div className="flex flex-col gap-6">
          {
            courses_data[params.id - 1].chapters.map((chapter, idx) => (
              <>
                <CourseData key={idx} data={chapter} />
              </>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default CoursePage;