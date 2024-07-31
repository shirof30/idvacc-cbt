'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { courses_data, Question } from '@data/constant-data'

interface PretestProps {
  id: number
  questions?: Question[]
}

interface ConfirmPretestProps extends PretestProps {
  setConfirmed: (value: boolean) => void
  setLoading: (value: boolean) => void
}

interface PretestQuestionProps extends PretestProps {
  currentQuestion: number
  setCurrentQuestion: (value: (prev: number) => number) => void
  setScore?: (value: number) => void
}

const Pretest: React.FC<PretestProps> = ({ id, questions }) => {
  const [confirmed, setConfirmed] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)


  useEffect(() => {

  }, [confirmed])

  return (
    <>
      {
        loading ?
          (
            <div className='flex relative items-center justify-center h-[500px]'>
              <span className='loading loading-spinner text-base-200 loading-lg'>
              </span>
            </div>
          ) :
          confirmed ? (
            <div>
              <div className='flex items-center justify-center'>
                <ul className='steps'>
                  {
                    questions?.map((question, idx) => (
                      <li className={`step ${idx <= currentQuestion ? 'step-primary' : ''}`}></li>
                    ))
                  }
                </ul>
              </div>
              <div className='flex flex-col items-center justify-center w-full h-96 gap-7 text-neutral'>
                <p>Question</p>
                <PretestQuestion id={id} questions={questions} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />
              </div>
            </div>
          ) : (
            <>
              <ConfirmPretest id={id} setConfirmed={setConfirmed} setLoading={setLoading} />
            </>
          )
      }
    </>
  )
}

const ConfirmPretest: React.FC<ConfirmPretestProps> = ({ id, setConfirmed, setLoading }) => {
  const { data: session } = useSession()

  const handleConfirm = () => {
    setLoading(true)
    setTimeout(() => {
      setConfirmed(true)
      setLoading(false)
    }, 3000)
  }

  return (
    <div>
      <h1 className='text-xl font-semibold text-neutral'>Confirmation</h1>
      <div className='flex flex-col items-center justify-center w-full h-96 gap-7 text-neutral'>
        <p>Are you want to start this test?</p>
        <div className='text-neutral'>
          <table>
            <tbody>
              <tr className='text-2xl'>
                <td className='font-semibold'>VATSIM CID</td>
                <td className='font-semibold'>:&nbsp;</td>
                <td>{session?.user.cid}</td>
              </tr>
              <tr className='text-2xl'>
                <td className='font-semibold'>Name</td>
                <td className='font-semibold'>:&nbsp;</td>
                <td>{session?.user.personal.name_full}</td>
              </tr>
              <tr className='text-2xl'>
                <td className='font-semibold'>Course Taken&nbsp;</td>
                <td className='font-semibold'>:&nbsp;</td>
                <td>{courses_data[id].block}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button onClick={handleConfirm} className='btn'>Start Test</button>
      </div>
    </div>
  )
}

const PretestQuestion: React.FC<PretestQuestionProps> = ({ questions, currentQuestion, setCurrentQuestion }) => {
  const [score, setScore] = useState<number>(0)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(Array(questions?.length).fill(''))
  const [isTestCompleted, setIsTestCompleted] = useState<boolean>(false)
  const [randomQuestions, setRandomQuestions] = useState<Question[]>([])

  console.log(randomQuestions);


  const shuffleArray = (arr: any[]) => {
    return arr.sort(() => Math.random() - 0.5)
  }

  const handleAnswer = (answer: string, index: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[index] = answer
    setSelectedAnswers(newAnswers)

    if (answer === randomQuestions[currentQuestion].answer) {
      if (selectedAnswers[currentQuestion] !== randomQuestions[currentQuestion].answer) {
        setScore((prev) => prev + 1)
      }
    } else {
      if (selectedAnswers[currentQuestion] === randomQuestions[currentQuestion].answer) {
        setScore((prev) => prev - 1)
      }
    }

    if (currentQuestion + 1 < randomQuestions.length) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < randomQuestions.length) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  useEffect(() => {
    if (questions) {
      const shuffledQuestion = shuffleArray([...questions])
      const shuffledQuestionChoices = shuffledQuestion.map((question: Question) => ({
        ...question,
        choices: shuffleArray([...question.choices])
      }))
      setRandomQuestions(shuffledQuestionChoices)
    }
  }, [questions])
  return (
    <div>
      <div>
        <p className='my-8 text-3xl font-semibold text-center'>
          {
            randomQuestions.length > 0 &&
            randomQuestions[currentQuestion].question
          }
        </p>
        <div className='flex gap-8'>
          {
            randomQuestions.length > 0 &&
            randomQuestions[currentQuestion].choices.map((choice, idx) => (
              <button key={idx} onClick={() => handleAnswer(choice, currentQuestion)} className='shadow rounded-xl w-72 btn'>{choice}</button>
            ))
          }
        </div>
        <div className='flex items-center justify-center w-full gap-8 mt-12'>
          {
            currentQuestion > 0 ?
              <button onClick={handlePrevQuestion} className='w-24 shadow btn btn-primary'>Previous</button>
              :
              <button className='w-24 shadow cursor-not-allowed btn btn-primary' disabled>Previous</button>
          }
          {
            currentQuestion + 1 === randomQuestions.length ?
              <button onClick={handleNextQuestion} className='w-24 shadow cursor-not-allowed btn btn-primary' disabled>Next</button>
              :
              <button onClick={handleNextQuestion} className='w-24 shadow btn btn-primary'>Next</button>
          }
          {
            currentQuestion + 1 === randomQuestions.length ?
              <button onClick={() => setIsTestCompleted(true)} className='shadow w-36 btn btn-success'>Finish</button>
              :
              <button onClick={() => setIsTestCompleted(true)} className='shadow cursor-not-allowed w-36 btn btn-success' disabled>Finish</button>
          }
        </div>
      </div>
    </div>
  )
}

export default Pretest