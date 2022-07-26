import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })

    //    if (process.env.NODE_ENV === 'development')
    console.info(`connected to db at ${process.env.DB_URL}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
export default dbConnect
