const { Groq } = require('groq-sdk')
const { z } = require('zod')

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
})

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behaviouralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioural questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    summary: z.string().describe("2-3 line honest summary of the candidate's profile and readiness for this job"),
    insights: z.array(z.string()).describe("Actionable insights telling the candidate what to improve or focus on"),
    strengths: z.array(z.string()).describe("Key strengths of the candidate based on resume vs job match"),
    nextBestAction: z.string().describe("The single most important next step the candidate should take to improve their chances"),
})

async function generateAiReport({resumeText, jobDescription}) {

    const prompt = `
        You are a senior software engineering interviewer and career coach.

        Your goal is to deeply analyze the candidate's profile against the job and provide honest, practical, and actionable feedback.

        Return ONLY valid JSON.

        Focus on:
        - Realistic interview questions (avoid generic ones)
        - Practical skill gaps based on real industry expectations
        - Clear, actionable insights (what the candidate should do next)
        - Honest evaluation (do not sugarcoat)
        - Keep answers concise and useful

        Also provide:
        - A short summary of the candidate
        - Key strengths
        - Specific improvement insights

        Resume:
        ${resumeText}

        Job Description:
        ${jobDescription}
    `

    const compilation = await groq.chat.completions.create({
        model: 'openai/gpt-oss-20b',
        messages: [
            {
                role: 'user',
                content: prompt
            }
        ],
        response_format: {
            type: 'json_schema',
            json_schema: {
                name: 'interview_preparation_report',
                schema: z.toJSONSchema(interviewReportSchema)
            }
        }
    })

    const response = JSON.parse(compilation.choices[0].message.content)

    const result = interviewReportSchema.safeParse(response)

    if (!result.success) {
        console.error(result.error)
        throw new Error("Failed to generate AI report")
    }

    return result.data
}

module.exports = {
    generateAiReport
}