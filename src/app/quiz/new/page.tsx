import { onAssistantCreation, onRunAssistant } from "@/actions/assistant"
import UploadDoc from "@/components/upload-doc"

const Page = async () => {
    // await onAssistantCreation()
    await onRunAssistant("asst_6KCxhYp6dqQ7dk9DWyQi3Fis")
    return (
        <div className="flex flex-col flex-1">
            <main className="py-11 flex flex-col text-center gap-4 items-center flex-1 mt-24">
                <h2 className="text-3xl font-bold mb-4">
                    What do you want to quiz?
                    <UploadDoc/>
                </h2>
            </main>
        </div>
    )
}

export default Page