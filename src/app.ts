import express from 'express'
import { globalErrorHandler } from './middlewares/globalErrorHandlers'
import userRouter from './features/users/userRouter'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'initial setup is done' })
})

app.use('/api/users', userRouter)
app.use(globalErrorHandler)
export default app
