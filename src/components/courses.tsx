'use client'

import { Chapter } from "@data/constant-data";
import ReactGoogleSlides from 'react-google-slides';
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Course {
  id: string
  data: Chapter
  completed: boolean
}

const CourseData: React.FC<Course> = ({ id, data, completed }) => {
  const [sId, setSId] = useState<string>(id);
  const [slides, setSlides] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const incrementSlides = () => {
    if (slides === data.totalSlides) return;
    setSlides(slides + 1);
  }

  const decrementSlides = () => {
    if (slides <= 1) return;
    setSlides(slides - 1);
  }

  const handleCompleteSlide = async () => {
    setLoading(true);
    try {
      const res = await axios.put('/api/section', { sectionId: sId }, { headers: { 'Content-Type': 'application/json' } });
      if (res.status !== 200) throw new Error('Failed to complete section');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      const dialog = document.getElementById(`modal_${id}`) as HTMLDialogElement;
      if (dialog) dialog.close();
      setSlides(1);
      router.refresh();
    }
  }

  useEffect(() => {
    const dialog = document.getElementById(`modal_${id}`) as HTMLDialogElement;
    if (dialog) dialog.addEventListener('close', () => setSlides(1));
    return () => {
      if (dialog) dialog.removeEventListener('close', () => setSlides(1));
    }
  }, [id, data])

  return (
    <div>
      <button onClick={() => (document.getElementById(`modal_${id}`) as HTMLDialogElement)?.showModal()} className="p-3 w-full min-h-[4rem] hover:bg-base-300 transition bg-base-200 card flex justify-center">
        <div className="flex items-center justify-between w-full">
          <p className="text-xl font-semibold card-title">{data.name}</p>
          {
            completed ? <span className="badge badge-success">&#10004; Viewed</span> : null
          }
        </div>
      </button>
      <dialog className="modal" id={`modal_${id}`}>
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
            {
              slides === 1 ? <button disabled className="btn btn-primary">&lt;</button> : <button onClick={decrementSlides} className="btn btn-primary">&lt;</button>
            }
            <input type="text" className="w-16 text-center input" disabled value={slides} />
            {
              slides === data.totalSlides ? <button disabled className="btn btn-primary">&gt;</button> : <button onClick={incrementSlides} className="btn btn-primary">&gt;</button>
            }
            {
              slides === data.totalSlides ? loading ? <button disabled className="btn btn-success min-w-12"><span className="loading loading-md loading-spinner"></span></button> : <button onClick={handleCompleteSlide} className="btn btn-success min-w-12">&#10003; Completed</button> : <button className="btn btn-success min-w-12" disabled>&#10003; Completed</button>
            }
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </div>
  )
}

export default CourseData;