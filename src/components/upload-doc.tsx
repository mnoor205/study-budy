"use client"
import { useState } from "react"
import { Button } from "./ui/button"
import { onAssistantCreation, onRunAssistant, uploadFile } from "@/actions/assistant"
import { useRouter } from "next/navigation"

const UploadDoc = () => {
    const [document, setDocument] = useState<Blob | File | null | undefined>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const isFile = (doc: Blob | File | null | undefined): doc is File => {
        return doc instanceof File;
    };

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!document) {
            setError("Please Upload a Document (PDF)")
            return
        }
        setIsLoading(true)
        try {
            const assistantid = await onAssistantCreation()
            const fileData = new FormData()
            fileData.append("file", document)
            await uploadFile(fileData)
            const quizid = await onRunAssistant(assistantid)
            if (quizid) {
                router.push(`/quiz/${quizid}`);
            } else {
                console.error("Quiz ID is undefined.");
            }

        } catch (error) {
            return error
        }
    }
    return (
        <div className="w-full">
        {isLoading ? (
            <p>Loading...</p>
        ) : (
            <form className="w-full" onSubmit={handleSubmit}>
                <label htmlFor="document" className="bg-secondary w-full flex h-20 rounded-md border-4 border-dashed border-blue-900 relative">
                    <div className="absolute inset-0 m-auto flex justify-center items-center">
                        {document && isFile(document) ? document.name : "Drag a file"}
                    </div>
                    <input
                        accept="application/pdf"
                        type="file"
                        id="document"
                        className="relative block w-full h-full z-50 opacity-0"
                        onChange={(e) => {
                            setDocument(e?.target?.files?.[0]);
                        }}
                    />
                </label>
                {error ? <p className="text-red-500">{error}</p> : null}
                <Button size="lg" className="mt-2" type="submit">Generate Quiz</Button>
            </form>
        )}
    </div>
    )
}

export default UploadDoc