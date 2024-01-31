import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import UserRoute from './route/user'
import { InitDB } from './adapter/db'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/v1/users', UserRoute)

app.listen(PORT, async () => {
  await InitDB()
  console.log(`Server is running on port ${PORT}`)
})
