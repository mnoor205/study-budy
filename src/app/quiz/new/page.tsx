import { generateQuizJSON, onAssistantCreation, onRunAssistant } from "@/actions/assistant"
import UploadDoc from "@/components/upload-doc"

const Page = async () => {
    // await onAssistantCreation()
    // await onRunAssistant("asst_4YKpPMMuT351JDN4iuPcqV7N")
    // await generateQuizJSON()
    return (
        <div className="flex flex-col flex-1">
            <main className="py-11 flex flex-col text-center gap-8 items-center flex-1 mt-24">
                <h2 className="text-3xl font-bold mb-5">
                    What do you want to be quizzed on?
                </h2>
                <div className="w-fill">
                   <UploadDoc /> 
                </div>
                
            </main>
        </div>
    )
}

export default Page