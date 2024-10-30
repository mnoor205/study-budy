"use client"
import ProgressBar from "@/components/progress-bar";
import ResultCard from "@/components/result-card";
import QuizSubmission from "@/components/submission";
import { Button } from "@/components/ui/button";
import { ChevronLeft, X } from "lucide-react";
import { useState } from "react";

export default function Quiz() {
    const [started, setStarted] = useState<boolean>(false)
    const [currentQuestion, setCurrentQuestion] = useState<number>(0)
    const [score, setScore] = useState<number>(0)
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [submitted, setSubmitted] = useState<boolean>(false)

    const questions = [
        {
            questionText: "First Question",
            answers: [
                { answerText: "correct", isCorrect: true, id: 1},
                { answerText: "wrong", isCorrect: false, id: 2},
                { answerText: "wrong", isCorrect: false, id: 3},
                { answerText: "wrong", isCorrect: false, id: 4},
            ]
        },
        {
            questionText: "Second Question",
            answers: [
                { answerText: "correct", isCorrect: true, id: 1},
                { answerText: "wrong", isCorrect: false, id: 2},
                { answerText: "wrong", isCorrect: false, id: 3},
                { answerText: "wrong", isCorrect: false, id: 4},
            ]
        },
        {
            questionText: "Third Question",
            answers: [
                { answerText: "correct", isCorrect: true, id: 1},
                { answerText: "wrong", isCorrect: false, id: 2},
                { answerText: "wrong", isCorrect: false, id: 3},
                { answerText: "wrong", isCorrect: false, id: 4},
            ]
        },
    ]

    const handleNext = () => {
        if (!started) {
            setStarted(true)
            return
        }

        if(currentQuestion < questions.length -1) {
            setCurrentQuestion(currentQuestion + 1)
        } else {
            setSubmitted(true)
            return
        }

        setSelectedAnswer(null)
        setIsCorrect(null)
    }

    const handleAnswer = (answer) => {
        setSelectedAnswer(answer.id)
        const isCurrentCorrect = answer.isCorrect
        if(isCurrentCorrect) {
            setScore(score + 1)
        }
        setIsCorrect(isCurrentCorrect)
    }

    const scorePercentage: number = Math.round((score / questions.length) * 100)

    if(submitted) {
        return (
            <QuizSubmission 
            score={score}
            scorePercentage={scorePercentage}
            totalQuestions={questions.length}/>
        )
    }

    return (
        <div className="flex flex-col flex-1">
            <div className="position-sticky top-0 z-10 shadow-md py-4 w-full">
                <header className="grid grid-cols-[auto,1fr,auto] grd-flow-col items-center justify-between py-">
                    <Button size="icon" value="outline"><ChevronLeft /></Button>
                    <ProgressBar value={(currentQuestion / questions.length) * 100}/> 
                    <Button size="icon" variant="outline">
                        <X/>
                    </Button>
                   
                </header>
            </div>
            <main className="flex justify-center flex-1">
                {!started ? <h1 className="text-3xl font-bold">
                    Welcome to the quiz page </h1> : (
                        <div>
                            <h2 className="text-3xl font-bold">
                                {questions[currentQuestion].questionText}
                            </h2>
                            <div className="grid grid-cols-1 gap-6 mt-6">
                               {
                                questions[currentQuestion].answers.map
                                (answer => {
                                    return (
                                        <Button
                                        key={answer.id}
                                        variant={"secondary"}
                                        onClick={() => handleAnswer(answer)}>
                                        {answer.answerText}
                                        </Button>
                                    )
                                })
                               }
                            </div>
                        </div>
                    )}
            </main>
            <footer className="footer pb-9 px-6 relative mb-0">
                <ResultCard isCorrect={isCorrect} correctAnswer={questions[currentQuestion].answers.find(answer => 
                    answer.isCorrect === true )?.answerText}/>
                <Button variant="neo" onClick={handleNext}>{!started ? 'Start' : (currentQuestion === questions.length - 1) ? 'Submit'
                : 'Next'}</Button>
            </footer>
        </div>
    )
}