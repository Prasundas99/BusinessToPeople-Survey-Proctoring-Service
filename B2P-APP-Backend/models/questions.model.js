import mongoose from 'mongoose'

const questionSetSchema = new mongoose.Schema(
  {
    setName: {
      type: String,
      required: [true, 'Name is required !']
    },
    admin: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'userModel'
    },
    client: [
      {
        type: mongoose.Types.ObjectId,
        required: [true, 'A client need to be assigned !'],
        ref: 'userModel'
      }
    ],
    worker: [
      {
        type: mongoose.Types.ObjectId,
        required: [true, 'Atleast one Field Worker is required'],
        ref: 'userModel'
      }
    ]
  },
  { timestamps: true }
)
const questionSetModel = mongoose.model('questionSetModel', questionSetSchema)

export default questionSetModel
