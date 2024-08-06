'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { courses_data, Question } from '@data/constant-data'
import axios from 'axios'

interface PretestProps {
  id: number
  setIsTestCompleted?: (value: boolean) => void
  questions?: Question[]
  courseId?: string
}

interface ConfirmPretestProps extends PretestProps {
  setConfirmed: (value: boolean) => void
  setLoading: (value: boolean) => void
}

interface PretestQuestionProps extends PretestProps {
  currentQuestion: number
  setCurrentQuestion: (value: (prev: number) => number) => void
  setScore: (value: (prev: number) => number) => void
  score: number
  setLoading: (value: boolean) => void
}

interface VerifyCodeProps extends PretestProps {
  score: number
  code: string
  setTestCompleted?: (value: boolean) => void
}

const Pretest: React.FC<PretestProps> = ({ id, questions, setIsTestCompleted, courseId }) => {
  const [confirmed, setConfirmed] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [code, setCode] = useState<string>('')
  const { data: session } = useSession()
  const [testCompleted, setTestCompleted] = useState<boolean>(false)


  const handleSubmit = async () => {
    setIsTestCompleted && setIsTestCompleted(true)
    setLoading(true)
    setConfirmed(false)
    try {
      if (courseId) {
        if (score < 8) {
          setTimeout(() => {
            setTestCompleted(true)
            setLoading(false)
            return
          }, 3000)
        }
        const res = await axios.post('/api/submit-test', { cid: session?.user.cid, courseId: courseId }, { headers: { 'Content-Type': 'application/json' } })
        if (res.status !== 200) throw new Error('Failed to submit test')
        if (res.data.code) setCode(res.data.code)
        setTestCompleted(true)
      } else {
        throw new Error('Course ID not found')
      }
      setTimeout(() => {
        setLoading(false)
      }, 3000)
    } catch (e) {
      console.error(e)
    }
  }

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
                <PretestQuestion id={id} questions={questions} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} setLoading={setLoading} score={score} setScore={setScore} />
              </div>
            </div>
          ) :
            testCompleted ? (
              <>
                <VerifyCode id={id} score={score} code={code} />
              </>
            ) :
              (
                <>
                  <ConfirmPretest id={id} setConfirmed={setConfirmed} setLoading={setLoading} />
                </>
              )
      }
      <dialog id={`confirm_answer_modal__${id}`} className='modal'>
        <div className='modal-box'>
          <h3 className='text-lg font-bold'>Confirmation</h3>
          <p className='py-4'>Are you sure want to finish this test? (Any answer cannot be edited)</p>
          <div className='modal-action'>
            <form method='dialog' className='flex gap-4'>
              <button onClick={handleSubmit} className='btn btn-primary'>Proceed</button>
              <button className='btn btn-danger'>Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

const ConfirmPretest: React.FC<ConfirmPretestProps> = ({ id, setConfirmed, setLoading }) => {
  const { data: session } = useSession()

  const handleConfirm = () => {
    setLoading(true);
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

const PretestQuestion: React.FC<PretestQuestionProps> = ({ questions, currentQuestion, setCurrentQuestion, setLoading, id, score, setScore }) => {
  const [answeredQuestions, setAnsweredQuestions] = useState<number>(0)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(Array(questions?.length).fill(''))
  const [isTestCompleted, setIsTestCompleted] = useState<boolean>(false)
  const [randomQuestions, setRandomQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<string[]>([])


  const shuffleArray = (arr: any[]) => {
    return arr.sort(() => Math.random() - 0.5)
  }

  const handleAnswer = (answer: string, index: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[index] = answer
    setSelectedAnswers(newAnswers)
    setAnswers(newAnswers)

    if (answer === randomQuestions[currentQuestion].answer) {
      if (selectedAnswers[currentQuestion] !== randomQuestions[currentQuestion].answer) {
        setScore((prev) => prev + 1)
      }
    } else {
      if (selectedAnswers[currentQuestion] === randomQuestions[currentQuestion].answer) {
        setScore((prev) => prev - 1)
      }
    }

    const answeredCount = newAnswers.filter((answer) => answer !== '').length
    setAnsweredQuestions(answeredCount)
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

  const handleFinish = () => {
    (document.getElementById(`confirm_answer_modal__${id}`) as HTMLDialogElement)?.showModal();
    if (isTestCompleted) {
      setLoading(true);
      (document.getElementById(`confirm_answer_modal__${id}`) as HTMLDialogElement)?.close();
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
            randomQuestions[currentQuestion].choices.map((choice, idx) => {
              const tempAnswer = randomQuestions[currentQuestion].answer
              if (randomQuestions[currentQuestion].choices.some((choice) => choice === tempAnswer)) {
                return (
                  <button key={idx} onClick={() => handleAnswer(choice, currentQuestion)} className={`shadow rounded-xl w-64 btn ${selectedAnswers[currentQuestion] === choice ? 'btn-success' : ''}`}>{choice}</button>
                )
              }
              return (
                <button key={idx} onClick={() => handleAnswer(choice, currentQuestion)} className={`shadow rounded-xl w-64 btn ${selectedAnswers[currentQuestion] === choice ? 'btn-primary' : ''}`}>{choice}</button>
              )
            })
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
              <button className='w-24 shadow cursor-not-allowed btn btn-primary' disabled>Next</button>
              :
              <button onClick={handleNextQuestion} className='w-24 shadow btn btn-primary'>Next</button>
          }
          {
            answeredQuestions === randomQuestions.length ?
              <button onClick={handleFinish} className='shadow w-36 btn btn-success'>Finish</button>
              :
              <button className='shadow cursor-not-allowed w-36 btn btn-success' disabled>Finish</button>
          }
        </div>
      </div>
    </div>
  )
}

const VerifyCode: React.FC<VerifyCodeProps> = ({ id, score, code }) => {
  const [copied, setCopied] = useState<boolean>(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
  }

  return (
    <div>
      <h1 className='text-xl font-semibold text-neutral'>Score</h1>
      <div className='flex flex-col items-center justify-center w-full h-96 gap-7 text-neutral'>
        {
          score > 6 ? (
            <>
              <p className='text-2xl font-bold'>Congratulations, you passed the pre-test exam!</p>
              <h1 className='text-3xl font-bold'>Score: {score}/{10}</h1>
              <p>Here is the verify code</p>
              <label htmlFor="code" className='relative flex items-center'>
                <input type='text' readOnly value={code} name='code' className='h-12 shadow pointer-events-none w-[400px] input grow input-lg text-neutral-content' />
                {
                  copied ?
                    <button className='absolute w-20 right-4 btn btn-xs btn-success'>&#10003; Copied</button>
                    :
                    <button onClick={handleCopy} className='absolute w-20 right-4 btn btn-xs btn-primary'>Copy</button>
                }
              </label>
            </>
          )
            :
            (
              <>
                <p className='text-2xl font-bold'>You failed the pre-test exam, keep going!</p>
                <h1 className='text-3xl font-bold'>Score: {score}/{10}</h1>
              </>
            )
        }
      </div>
    </div>
  )
}

export default Pretest