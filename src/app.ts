import express, { Application, json } from "express"

const app : Application = express()

app.use(json())

const PORT : number = 3000;
const runningMsg = `Server is running on http://localhost:${PORT}`
app.listen(PORT, () => {
    console.log(runningMsg)
})