import { Request, Response } from "express";
import { getStructredREecomendation } from "../service/langchain.service";

export async function recomendedMovies(req: Request, res: Response) {
    try {
        const {
            userPrompt = "suggest movie for high action",
            genre = "Action",
            mood = "high ",
            count = "5",
            type = "all"
        } = req.body

        const result = await getStructredREecomendation({
            userPrompt, genre, mood, count: Number(count), type
        })
        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: "something wrong" })

    }
}