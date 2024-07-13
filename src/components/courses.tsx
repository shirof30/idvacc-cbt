'use client'

import { Chapter } from "@data/constant-data";

interface Course {
  data: Chapter
}

const CourseData: React.FC<Course> = ({ data }) => {
  return (
    <>
      <button onClick={() => (document.getElementById('courses_modal') as HTMLDialogElement)?.showModal()} className="p-3 w-full min-h-[4rem] hover:bg-base-300 transition bg-base-200 card flex justify-center">
        <div className="flex items-center justify-between w-full">
          <p className="text-xl font-semibold card-title">{data.name}</p>
          <span className="badge badge-success">&#10004; Viewed</span>
        </div>
      </button>
      <dialog className="modal" id="courses_modal">
        <div className="modal-box bg-base-200 min-w-[90dvw] min-h-[90dvh]">
          <iframe src={data.link} className="w-full h-[85dvh] rounded-lg" allowFullScreen></iframe>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </>
  )
}

export default CourseData;