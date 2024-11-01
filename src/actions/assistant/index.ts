"use server"
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
import { array, object, string, z } from "zod";
import saveQuiz from "../db";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
})

export const onAssistantCreation = async () => {
  const newAssistant = await openai.beta.assistants.create({
    instructions:
      ` You will be provided with a study guide about a subject/topic, your job is to create a 10 question quiz about that topic to help the user study for an upcoming exam.
          `,
    name: "Quiz Creator",
    tools: [{ type: "file_search" }],
    model: "gpt-4o-mini",
  })

  return newAssistant.id
}

export const uploadFile = async (f: FormData) => {
  try {

    const vectorStore = await openai.beta.vectorStores.create({
      name: "domainId"
  })

    const uploadedFile = f.getAll("file") as File[]

    await openai.beta.vectorStores.fileBatches.uploadAndPoll(vectorStore.id, { files: uploadedFile })

    await openai.beta.assistants.update("asst_4YKpPMMuT351JDN4iuPcqV7N", {
      tool_resources: { file_search: { vector_store_ids: [vectorStore.id] } },
    })

    return vectorStore.id

  } catch (error) {
    return error
  }
}


export const onRunAssistant = async (assistant_id: string) => {
  const thread = await openai.beta.threads.create();
  await openai.beta.threads.messages.create(
    thread.id,
    {
      role: "user",
      content: "Use the latest file uploaded to make a quiz. Don't ask anymore questions.",
    }
  );

  const run = await openai.beta.threads.runs.createAndPoll(
    thread.id,
    {
      assistant_id,
    }
  );

  if (run.status === 'completed') {
    const messages = await openai.beta.threads.messages.list(run.thread_id);
    for (const message of messages.data.reverse()) {
        if (message.role === 'assistant') {
            return await generateQuizJSON(message.content[0].text.value);
        }
    }
} else {
    console.log(run.status);
    return null; // Handle cases where the run is not completed
}
}

export const generateQuizJSON = async (quiz: string) => {

  const answerSchema = z.object({
    id: z.string(),
    answerText: z.string(),
    isCorrect: z.boolean(),
    answerId: z.string() // Ensures answerNumber is between 1 and 4
  });

  const questionSchema = z.object({
    id: z.number(),
    questionText: z.string(),
    answers: z.array(answerSchema)
  });

  const quizSchema = z.object({
    name: z.string(),
    description: z.string(),
    quiz: z.object({
      questions: z.array(questionSchema)
    })
  });

  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    messages: [
      { role: "user", content: `I am giving you a multiple choice quiz, turn this into the desired JSON format, the answerId should always be a string that is either 1,2,3 or 4: ${quiz}` },
    ],
    response_format: zodResponseFormat(quizSchema, "quiz_schema"),
  });
  const response = completion.choices[0].message.parsed;

  const t =  await saveQuiz(response)
  console.log("id: ", t)
  return t
}



