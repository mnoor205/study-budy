import QuizQuestions from "@/components/quiz-questions"
import { client } from "@/lib/prisma"


const page = async ({ params }: {
    params: {
        quizid: string
    }
}) => {
    const { quizid } = await params

    const quiz = await client.quiz.findFirst({
        where: {
            id: quizid
        },
        select: {
            questions: {
                select : {
                    answers: true
                }
            }
        }
    })

    if (!quizid || !quiz || !quiz.questions) {
        return <div>This Quiz Does Not Exist</div>
    }

    const quizz = await client.quiz.findFirst({
        where: {
            id: quizid
        },
        select: {
            name: true,
            description: true,
            id: true,
            questions: {
                select: {
                    id: true,
                    questionText: true,
                    answers: {
                        select: {
                            id: true,
                            answerText: true,
                            isCorrect: true,
                            answerId: true
                        }
                    }
                }
            }
        }
    })

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

    const quizData: QuizData | null = quizz ? {
        name: quizz.name,
        description: quizz.description,
        quiz: {
            questions: quizz.questions
        }
    } : null;

    return (
        <QuizQuestions QuizData={quizData}/>
    )
}

export default page