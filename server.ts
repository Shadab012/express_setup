import app from './src/app'
import { config } from './src/config/config'
import connectDB from './src/config/db'

const port = config.port || 3000

async function startServer() {
  try {
    await connectDB()
    app.listen(port, () => {
      console.log(`⚙️ Server is running at port : ${port}`)
    })
  } catch (err) {
    console.log('MongoDB connection failed !!! ', err)
  }
}
startServer()
