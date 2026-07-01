"use client"
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL
export const postMoviePrefrence = async (data: any) => {
    try {
        return await axios.post(`${API_URL}/movies`, data).then((d) => d.data)
    } catch (err) {
        console.log(err)
    }
}