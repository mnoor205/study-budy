"use server"
import { client } from "@/lib/prisma";

interface QuizAnswer {
    id: string;
    answerText: string;
    isCorrect: boolean;
    answerId: string; // Updated to string
}

interface QuizQuestion {
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

type QuizDataType = QuizData | null;

export default async function saveQuiz(quizData: QuizDataType) {
    // Step 1: Create the Quiz
    const newQuiz = await client.quiz.create({
        data: {
            name: quizData?.name ?? "name",
            description: quizData?.description ?? "description"
        },
        select: { id: true } // Select only the ID to get the created quiz ID
    });

    const quizId = newQuiz.id;

    // Step 2: Create Questions and Answers in a transaction
    await client.$transaction(async (tx) => {
        if (quizData?.quiz.questions) {
            for (const question of quizData.quiz.questions) {
                // Create each question associated with the quiz
                const newQuestion = await tx.question.create({
                    data: {
                        questionText: question.questionText,
                        quizId: quizId
                    },
                    select: { id: true } // Select only the ID to get the created question ID
                });

                const questionId = newQuestion.id;

                if (question.answers && question.answers.length > 0) {
                    await tx.answer.createMany({
                        data: question.answers.map((answer) => ({
                            answerText: answer.answerText,
                            isCorrect: answer.isCorrect,
                            answerId: answer.answerId, 
                            questionId: questionId,
                        }))
                    });
                }
            }
        }
    });
    return quizId
}

