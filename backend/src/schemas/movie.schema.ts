
import { z } from "zod"

const MovieSchema = z.object({
    title: z.string().describe("Movie title"),
    year: z.number().describe("Release year"),
    genre: z.array(z.string()).describe("Movie genres"),
    cast: z.array(z.string()).describe("Top 3 cast"),
    reson: z.string().describe("why movie matches the user mood and prefrence"),
    rating: z.number().min(0).max(10).describe("Movie rating"),
    platform: z.string().url().describe("Streaming platform link"),
}).passthrough();

export const RecomendationSchema = z.object({
    movies: z.array(MovieSchema).describe("list of movies")
})

export type Movie = z.infer<typeof MovieSchema>

export type Recomendation = z.infer<typeof RecomendationSchema>
