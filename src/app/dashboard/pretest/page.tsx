import { questions, courses_data } from '@data/constant-data';
import { auth } from '@auth';
import type { Metadata } from 'next';
import Pretest from '@/components/pretest';

interface PretestPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
};

export const metadata: Metadata = {
  title: 'Pretest - IDvACC CBT SITE',
};

const PretestPage: React.FC<PretestPageProps> = ({ searchParams }) => {
  const courseIndex = courses_data.findIndex(course => course.id === searchParams.courseId);
  return (
    <div>
      <h1 className="text-2xl font-semibold">{`${courses_data[courseIndex].block} - Pretest`}</h1>
      <div className='p-4 mt-5 bg-base-content rounded-3xl min-h-[60dvh]'>
        <Pretest id={courseIndex} questions={questions} courseId={courses_data[courseIndex].id} />
      </div>
    </div>
  )
}

export default PretestPage;
