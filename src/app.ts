import express from 'express'
import { globalErrorHandler } from './middlewares/globalErrorHandlers'

const app = express()

app.get('/', (req, res) => {
  res.json({ message: 'initial setup is done' })
})

app.use(globalErrorHandler)
export default app
