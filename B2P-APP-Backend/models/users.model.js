import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    adminName: {
      type: String,
      unique: true,
      default: null
    },
    workerName: {
      type: String,
      unique: true,
      default: null
    },
    clientName: {
      type: String,
      unique: true,
      default: null
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    isWorker: {
      type: Boolean,
      default: false
    },
    isClient: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

const compare = async (enteredPassword, hashedPassword) => {
  return !enteredPassword.localeCompare(hashedPassword)
}

userSchema.methods.checkPassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password)
}

const userModel = mongoose.model('userModel', userSchema)

export default userModel
