import mongoose from "mongoose"
import { config } from "dotenv"

config();

export const dbconnect = () => {
    mongoose.connect(process.env.MONGO_URL!)
        .then(() => console.log("Connected to Mongo Database"))
        .catch(() => console.log("Error connecting to database"));
}