import VerticalBar from "./vertical-bar"

type Props = {
    scorePercentage: number,
    score: number,
    totalQuestions: number
}

const QuizSubmission = ({ scorePercentage, score, totalQuestions }: Props) => {

    return (
        <div className="flex flex-col flex-1">
            <main className="py-11 flex flex-col gap-4 items-center flex-1 mt-24">
                <h2 className="text-3xl font-bold">Quiz Finished</h2>
                <p>You scored: {scorePercentage}</p>
                <>
                <div className="flex flex-row gap-8 mt-6">
                    <VerticalBar percentage={scorePercentage} color="green"/>
                    <VerticalBar percentage={100 - scorePercentage} color="red"/>
                </div>
                <div className="flex flex-row gap-8">
                    <p>{score} Correct</p>
                    <p>{totalQuestions - score} Incorrect </p>
                </div>
                </>
            </main>
        </div>
    )
}

export default QuizSubmission