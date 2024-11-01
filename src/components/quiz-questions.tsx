"use client"
import ProgressBar from "@/components/progress-bar";
import ResultCard from "@/components/result-card";
import QuizSubmission from "@/components/submission";
import { Button } from "@/components/ui/button";

import { ChevronLeft, X } from "lucide-react";
import { useState } from "react";

interface QuizAnswer {
    id: string;
    answerText: string;
    isCorrect: boolean;
    answerId: string; // New field to represent the position within each question (1 to 4)
}

interface QuizQuestion {
    id: string
    questionText: string;
    answers: QuizAnswer[];
}

interface Quiz {
    questions: QuizQuestion[];
}

interface QuizData {
    description: string;
    name: string;
    quiz: Quiz;
}

type Props = {
    QuizData: QuizData | null
}

export default function QuizQuestions({ QuizData }: Props) {
    if (QuizData !== null) {
        const [started, setStarted] = useState<boolean>(false)
        const [currentQuestion, setCurrentQuestion] = useState<number>(0)
        const [score, setScore] = useState<number>(0)
        const [userAnswers, setUserAnswers] = useState<{ questionId: string, answerId: string }[]>([])
        const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
        const [submitted, setSubmitted] = useState<boolean>(false)

        const questions = QuizData.quiz.questions

        const handleNext = () => {
            if (!started) {
                setStarted(true);
                return;
            }

            // Move to the next question
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                setSubmitted(true);
                return;
            }

            setIsCorrect(null); // Reset the correctness state for the new question
        };

        const handleAnswer = (answer: QuizAnswer, questionId: string) => {
            const newUserAnswer = [
                ...userAnswers,
                {
                    answerId: answer.id, // Keep it as string
                    questionId // Keep it as string
                }
            ];

            setUserAnswers(newUserAnswer);
            const isCurrentCorrect = answer.isCorrect;
            if (isCurrentCorrect) {
                setScore(score + 1);
            }
            setIsCorrect(isCurrentCorrect);
        }


        const handleBackPress = () => {
            if (currentQuestion !== 0) {
                setCurrentQuestion(prevCurrentQuestion => prevCurrentQuestion - 1)
            }
        }

        const scorePercentage: number = Math.round((score / questions.length) * 100)
        const selectedAnswer: string | null = userAnswers.find((item) =>
            item.questionId === questions[currentQuestion].id)?.answerId || null;


        if (submitted) {
            return (
                <QuizSubmission
                    score={score}
                    scorePercentage={scorePercentage}
                    totalQuestions={questions.length} />
            )
        }

        return (
            <div className="flex flex-col flex-1">
                <div className="position-sticky top-0 z-10 shadow-md py-4 w-full">
                    <header className="grid grid-cols-[auto,1fr,auto] grd-flow-col items-center justify-between py-">
                        <Button onClick={handleBackPress} size="icon" value="outline"><ChevronLeft /></Button>
                        <ProgressBar value={(currentQuestion / questions.length) * 100} />
                        <Button size="icon" variant="outline">
                            <X />
                        </Button>

                    </header>
                </div>
                <main className="flex justify-center flex-1">
                    {!started ? <h1 className="text-3xl font-bold mt-8">
                        Welcome to the quiz page </h1> : (
                        <div>
                            <h2 className="text-3xl font-bold mt-10 mb-7">
                                {questions[currentQuestion].questionText}
                            </h2>
                            <div className="grid grid-cols-1 gap-6 mt-6">
                                {
                                    questions[currentQuestion].answers.map(answer => (
                                        <Button
                                            className="hover:bg-green-400 disabled:opacity-50"
                                            key={answer.id}
                                            variant={"secondary"}
                                            disabled={!!selectedAnswer} // Disable if answer is already selected
                                            onClick={() => handleAnswer(answer, questions[currentQuestion].id)}
                                        >
                                            {answer.answerText}
                                        </Button>
                                    ))
                                }
                            </div>
                        </div>
                    )}
                </main>
                <footer className="footer pb-9 px-6 relative mb-0 flex flex-col items-center">
                    <ResultCard
                        isCorrect={isCorrect}
                        correctAnswer={questions[currentQuestion].answers.find(answer => answer.isCorrect)?.answerText || ""}
                    />
                    <Button
                        className="mt-10 w-fit p-5 rounded-lg"
                        variant="neo"
                        onClick={handleNext}
                    >
                        {!started ? 'Start' : (currentQuestion === questions.length - 1) ? 'Submit' : 'Next'}
                    </Button>
                </footer>

            </div>
        )
    }
}