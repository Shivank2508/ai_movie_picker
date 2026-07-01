import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts"
import { RecomendationSchema } from "../schemas/movie.schema";

const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
    //lower the temperatur = more consistency
    //less random answer
})

const promptTemplate = ChatPromptTemplate.fromMessages([
    [
        "system",
        `
You are an expert movie recommendation assistant with deep knowledge of global cinema.

Your task is to recommend movies based on:
- User request
- Genre
- Mood
- Number of movies
- Preferred industry/type (Hollywood, Bollywood, Korean, Anime, International, or Mixed)

Rules:
1. Recommend only high-quality, well-rated, and relevant movies.
2. Match the emotional tone and mood carefully.
3. Balance popular titles with hidden gems.
4. Avoid repetitive or generic recommendations.
5. Ensure variety in storytelling, style, and pacing.
6. Prioritize strong audience reception and critical acclaim.
7. If the user gives vague input, intelligently infer the best options.
8. Never recommend random or low-quality movies.
9. Each recommendation must feel personalized and intentional.

Output format:
Return ONLY a valid JSON array.

Each movie object must contain:
  - User's request
        - Genre
        - Mood
        - Count
       

Do not add extra text outside JSON.
`
    ],
    [
        "human",
        `
User Request: {userPrompt}

Preferences:
- Genre: {genre}
- Mood: {mood}
- Number of Movies: {count}
- Movie Type: {type}
`
    ]
]);


async function getRecommendations(input: {
    userPrompt: string;
    genre: string;
    mood: string;
    count: number;
    type: string;
}) {

    const chain = promptTemplate.pipe(model)
    const res = await chain.invoke({
        userPrompt: input.userPrompt,
        genre: input.genre,
        mood: input.mood,
        count: input.count,
        type: input.type,
    })


    console.log(res.text)

    return res.text


}


// zod +structured output

const structuredOutput = model.withStructuredOutput(RecomendationSchema)

async function getStructredREecomendation(input: {
    userPrompt: string;
    genre: string;
    mood: string;
    count: number;
    type: string;
}) {
    const chain = promptTemplate.pipe(structuredOutput)

    const result = await chain.invoke({
        userPrompt: input.userPrompt,
        genre: input.genre,
        mood: input.mood,
        count: input.count,
        type: input.type
    })
    console.log(result)
    return result
}

export { getRecommendations, getStructredREecomendation }