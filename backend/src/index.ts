import "dotenv/config"
import express from 'express'
import cors from 'cors'
import { recommededRouter } from "./routes/recommanded.router"

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ status: "ok" })
})

app.use("/api/recomended", recommededRouter);
const PORT = process.env.PORT || 8000




app.listen(PORT, () => {
    console.log(`we are running on ${PORT}`)
})