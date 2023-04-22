require('dotenv').config()

import express,{Request, Response}  from "express";
import cors from 'cors'
import { routes } from "./routes";
import { AppDataSource } from "../data.source";
import cookieParser from "cookie-parser";

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:3000"],
    credentials: true
}))

app.get('/', (req: Request, res:Response) => {
    res.send('Hello world')
})

routes(app)

app.listen(8000, ()=>{
    AppDataSource.initialize()
    .then(() => {
        console.log('listening to port 8000')
        console.log("Database is ready")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
})