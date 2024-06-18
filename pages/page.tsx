'use client';

import React, { useState, useEffect } from 'react';
import Footer from './footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Chapter {
  chapter: number;
  name: string;
  link: string;
  viewed: boolean;
  isPreTest?: boolean;
}

interface Section {
  block: string;
  chapters: Chapter[];
}

export default function Home() {
  const [embedLink, setEmbedLink] = useState<string | null>(null);
  const [sections, setSections] = useState<Section[]>([
    {
      block: 'Block 1: Welcome to IDVACC',
      chapters: [
        { chapter: 1, name: 'Welcome to IDVACC', link: 'https://docs.google.com/presentation/d/1/view?usp=sharing', viewed: false },
        { chapter: 2, name: 'IDVACC Training Introduction', link: 'https://docs.google.com/presentation/d/2/view?usp=sharing', viewed: false },
      ],
    },
    {
      block: 'Block 2: New - Block I - Foundations',
      chapters: [
        { chapter: 1, name: 'Indonesian Airspace Introduction', link: 'https://docs.google.com/presentation/d/3/view?usp=sharing', viewed: false },
        { chapter: 2, name: 'Flight Data', link: 'https://docs.google.com/presentation/d/4/view?usp=sharing', viewed: false },
        { chapter: 3, name: 'Radio Technique & Communications', link: 'https://docs.google.com/presentation/d/5/view?usp=sharing', viewed: false },
        { chapter: 4, name: 'Flight Rules', link: 'https://docs.google.com/presentation/d/6/view?usp=sharing', viewed: false },
        { chapter: 5, name: 'Understanding METARs', link: 'https://docs.google.com/presentation/d/7/view?usp=sharing', viewed: false },
      ],
    },
    {
      block: 'Block 3: New - Block II - Ground Training (S1)',
      chapters: [
        { chapter: 1, name: 'IFR Clearances', link: 'https://docs.google.com/presentation/d/8/view?usp=sharing', viewed: false },
        { chapter: 2, name: 'Ground Surface Movement', link: 'https://docs.google.com/presentation/d/9/view?usp=sharing', viewed: false },
        { chapter: 3, name: 'VFR Clearances', link: 'https://docs.google.com/presentation/d/10/view?usp=sharing', viewed: false },
      ],
    },
    {
      block: 'Block 4: New - Block III - Tower Training (S2)',
      chapters: [
        { chapter: 1, name: 'Tower Introduction', link: 'https://docs.google.com/presentation/d/11/view?usp=sharing', viewed: false },
        { chapter: 2, name: 'Initial Separation', link: 'https://docs.google.com/presentation/d/12/view?usp=sharing', viewed: false },
        { chapter: 3, name: 'Departures', link: 'https://docs.google.com/presentation/d/13/view?usp=sharing', viewed: false },
        { chapter: 4, name: 'Arrivals', link: 'https://docs.google.com/presentation/d/14/view?usp=sharing', viewed: false },
        { chapter: 5, name: 'Tower VFR Circuit', link: 'https://docs.google.com/presentation/d/15/view?usp=sharing', viewed: false },
      ],
    },
    {
      block: 'Block 5: S3 Rating: Radar Training',
      chapters: [
        { chapter: 1, name: 'Introduction to Radar', link: 'https://docs.google.com/presentation/d/20/view?usp=sharing', viewed: false },
        { chapter: 2, name: 'Radar Procedures for Airport Operations', link: 'https://docs.google.com/presentation/d/21/view?usp=sharing', viewed: false },
        { chapter: 3, name: 'Radar Seperations', link: 'https://docs.google.com/presentation/d/22/view?usp=sharing', viewed: false },
        { chapter: 4, name: 'Radar Departures', link: 'https://docs.google.com/presentation/d/22/view?usp=sharing', viewed: false },
      ],
    },
    {
      block: 'Block 6: C1 Rating: Centre Training',
      chapters: [
        { chapter: 1, name: 'Indonesian Classes of Airspace', link: 'https://docs.google.com/presentation/d/23/view?usp=sharing', viewed: false },
        { chapter: 2, name: 'Area Control Centre: Enroute Operations', link: 'https://docs.google.com/presentation/d/24/view?usp=sharing', viewed: false },
      ],
    },
  ]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const router = useRouter();

  const openPreview = (link: string) => {
    if (link) {
      setEmbedLink(link);
      setStartTime(Date.now());
    }
  };

  const closePreview = () => {
    if (embedLink && startTime) {
      const elapsedTime = (Date.now() - startTime) / 1000; // time in seconds
      if (elapsedTime >= 1) { // minimum time threshold (e.g., 30 seconds)
        setSections((prevSections) =>
          prevSections.map((section) => ({
            ...section,
            chapters: section.chapters.map((chapter) =>
              chapter.link === embedLink ? { ...chapter, viewed: true } : chapter
            ),
          }))
        );
      }
    }
    setEmbedLink(null);
    setStartTime(null);
  };

  useEffect(() => {
    const updatedSections = sections.map((section) => {
      const allViewed = section.chapters.every((chapter) => chapter.viewed);
      if (allViewed && !section.chapters.find((ch) => ch.isPreTest)) {
        return {
          ...section,
          chapters: [
            ...section.chapters,
            { chapter: section.chapters.length + 1, name: 'Take Pre-Test', link: '/test', viewed: false, isPreTest: true },
          ],
        };
      }
      return section;
    });
    setSections(updatedSections);
  }, [sections]);

  const handlePreTestClick = (sectionIndex: number, chapterIndex: number) => {
    setSections((prevSections) => {
      const newSections = [...prevSections];
      newSections[sectionIndex].chapters[chapterIndex].viewed = true;
      return newSections;
    });
  };

  return (
    <>
      <div
        className="fixed inset-0 z-0 w-full h-full bg-center bg-no-repeat bg-cover bg-gray-800/50 filter blur-sm"
        style={{ backgroundImage: "url('/bgimg.png')" }}
      ></div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md bg-opacity-90">
          <h1 className="justify-center mb-4 text-2xl font-bold">Computer Based Training</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="text-gray-600 bg-gray-200">
                <tr>
                  <th className="w-1/6 px-4 py-2 text-left">Chapter</th>
                  <th className="w-4/6 px-4 py-2 text-left">Name</th>
                  <th className="w-1/6 px-4 py-2 text-left">Done?</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {sections.map((section, idx) => (
                  <React.Fragment key={idx}>
                    <tr className="bg-gray-100">
                      <td colSpan={3} className="px-4 py-2 font-semibold">
                        {section.block}
                      </td>
                    </tr>
                    {section.chapters.map((chapter, chapterIdx) => (
                      <tr key={chapterIdx} className="border-t">
                        <td className="px-4 py-2">{chapter.chapter}</td>
                        <td className="px-4 py-2 text-blue-500 cursor-pointer">
                          {chapter.isPreTest ? (
                            <Link href={chapter.link} legacyBehavior>
                              {
                                (
                                <a
                                  onClick={() => {
                                    router.push(chapter.link)
                                    setTimeout(() => {
                                      router.refresh()
                                    }, 1000)
                                  }}
                                >
                                  {chapter.name}
                                </a>) 
                              }
                              
                            </Link>
                          ) : (
                            <span onClick={() => openPreview(chapter.link)}>{chapter.name}</span>
                          )}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {chapter.viewed ? '✔' : '✕'}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {embedLink && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg relative w-[90%] md:w-[70%]">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold">CBT Reader</h2>
                <button
                  onClick={closePreview}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ✕
                </button>
              </div>
              <div className="p-4">
                <iframe
                  src={embedLink}
                  frameBorder="0"
                  className="w-full h-[70vh]"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="relative z-20 w-full">
        <Footer />
      </div>
    </>
  );
}
