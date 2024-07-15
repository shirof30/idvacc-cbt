import type { Metadata } from "next";
import { courses_data, Section } from "@data/constant-data";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Courses - IDvACC CBT SITE",
}

const Courses: React.FC = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold">My Courses</h1>
      <div className="p-4 mt-5 bg-base-100 rounded-3xl min-h-[70dvh]">
        <div className="flex flex-wrap gap-6 xl:justify-start lg:justify-center ms-auto">
          {
            courses_data.map((section: Section, idx: number) => (
              <Link key={idx} href={`/dashboard/courses/${idx + 1}`}>
                <div className="shadow-lg image-full card bg-base-200 w-[40dvh] h-[20dvh] hover:cursor-pointer hover:before:opacity-60 transition duration-500">
                  <figure>
                    <img src={section.imgUrl} alt={section.block} />
                  </figure>
                  <div className="p-3 text-white card-body">
                    <h1 className="text-lg font-semibold card-title">{`Block ${idx + 1}: ${section.block}`}</h1>
                    <div className="absolute right-5 bottom-3">
                      <div className="badge">
                        <span>&#10004; Completed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Courses;