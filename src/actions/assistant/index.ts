"use server"

import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
import { array, object, string, z } from "zod";
import fs from "fs"

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
})
export const onAssistantCreation = async () => {

    const Questions = z.object({
        question: z.string(),
        answerChoiceOne: z.string(),
        answerChoiceTwo: z.string(),
        answerChoiceThree: z.string(),
        answerChoiceFour: z.string()
    });
    
    const QuizSchema = z.object({
        name: string(),
        description: string(),
        quiz: object({
            questions: array(Questions)
        })
    })

    const myAssistant = await openai.beta.assistants.update(
        "asst_6KCxhYp6dqQ7dk9DWyQi3Fis",
        {
        
        instructions:
          `
          You will be provided with a study guide about a subject/topic, your job is to create a 10 question quiz about that topic to help the user study for an upcoming exam.
          `,
        name: "Quiz Creator",
        tools: [{ type: "function", function:{
            name: "name"
        } }],
        model: "gpt-4o-mini",
        response_format: zodResponseFormat(QuizSchema, "quiz_outline")
    })

    onRunAssistant(myAssistant.id)
}


export const onRunAssistant = async (assistant_id : string) => {

    const aapl10k = await openai.files.create({
        file: fs.createReadStream("public/study-guide.pdf"),
        purpose: "assistants",
    });

    const thread = await openai.beta.threads.create();

    await openai.beta.threads.messages.create(
        thread.id,
        {
          role: "user",
          content: "I have attached the study guide pdf",
          attachments: [{ file_id: aapl10k.id, tools: [{ type: "file_search" }] }]
        }
      );

      const run = await openai.beta.threads.runs.createAndPoll(
        thread.id,
        { 
          assistant_id,
        }
      );

      while (run.status !== 'completed') {
        setTimeout(() => {
            console.log("status: ", run.status)
        }, 1000)
      }

      if (run.status === 'completed') {
        const messages = await openai.beta.threads.messages.list(
          run.thread_id
        );
        for (const message of messages.data.reverse()) {
          console.log(`${message.role} > ${message.content[0].text.value}`);
        }
      } else {
        console.log(run.status);
      }
    
}



