'use client'

import { Chapter } from "@data/constant-data";
import ReactGoogleSlides from 'react-google-slides';
import { useState, useEffect } from "react";

interface Course {
  data: Chapter
}

const CourseData: React.FC<Course> = ({ data }) => {
  const [slides, setSlides] = useState<number>(1);

  const incrementSlides = () => {
    setSlides(slides + 1);
  }

  const decrementSlides = () => {
    if (slides <= 1) return;
    setSlides(slides - 1);
  }

  useEffect(() => {
    const dialog = document.getElementById('courses_modal') as HTMLDialogElement;
    dialog.addEventListener('close', () => setSlides(1));
  }, [])

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
          <ReactGoogleSlides
            width="100%"
            height="720px"
            slidesLink="https://docs.google.com/presentation/d/1fS-PudNadIgsViO1FPkHuKld0N2qmVcp/"
            showControls={false}
            position={slides}
            className="pointer-events-none"
          />
          <div className="flex items-center justify-center w-full gap-4 mt-2">
            <button onClick={decrementSlides} className="btn btn-primary">&lt;</button>
            <input type="text" className="w-16 text-center input" disabled value={slides} />
            <button onClick={incrementSlides} className="btn btn-primary">&gt;</button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </>
  )
}

export default CourseData;