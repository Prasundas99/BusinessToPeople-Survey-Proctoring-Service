import mongoose from 'mongoose'
const questionSchema = new mongoose.Schema(
  {
    questionSet: {
      type: mongoose.Types.ObjectId,
      required: [true, 'A questionset is required to create a question'],
      ref: 'questionSetModel'
    },
    question: {
      type: String,
      required: true
    },
    dataType: {
      type: String
    },
    mandatory: {
      type: Boolean
    }
  },
  { timestamps: true }
)
const questionModel = mongoose.model('questionModel', questionSchema)
export default questionModel
