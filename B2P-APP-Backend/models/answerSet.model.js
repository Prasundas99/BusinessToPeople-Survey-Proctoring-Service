import mongoose from 'mongoose'

const answerSetSchema = new mongoose.Schema(
  {
    question: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'questionModel'
    },
    questionSet: {
      type: mongoose.Types.ObjectId,
      required: [true, 'A answer should have a linked question set to it'],
      ref: 'questionSetModel'
    },
    worker: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'userModel',
       unique: [
         true,
         'This user cannot give more than one answer to same question.'
       ]
    },
    data: [
      {
        type: String,
        required: [true, 'An answer is required !']
      }
    ],
    coordinates: {
      type: [Number],
      default: [0, 0] // [Longitude, latitude]
    }
  },
  { timestamps: true }
)
const answerSetModel = mongoose.model('answerSetModel', answerSetSchema)

export default answerSetModel
