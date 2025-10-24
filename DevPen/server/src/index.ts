import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"
import { config } from 'dotenv'
import { dbconnect } from "./lib/dbConnect";
import { Request, Response } from "express";
import { compilerRouter } from "./routes/compilerRouter";

const app = express();
config();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173', process.env.CLIENT_URL!]
}))

app.use('/api/v1/compiler', compilerRouter);


app.listen(4000, () => {
    dbconnect();
    console.log("Server active at port 4000");
})