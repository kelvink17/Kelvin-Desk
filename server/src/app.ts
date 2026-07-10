import express from "express"
import cors from "cors"
import ticketroute from "./routes/ticketRoute"


const app = express()

app.use(cors())

app.use(express.json())
app.use("/api/tickets", ticketroute)

app.get("/", (req,res)=> {
    res.send("APP IS RUNNING")
})


export default app