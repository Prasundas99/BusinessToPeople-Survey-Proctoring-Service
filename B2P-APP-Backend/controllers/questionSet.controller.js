import questionSetModel from '../models/questions.model.js'
import questionModel from '../models/questionSet.js'
import answerSetModel from '../models/answerSet.model.js'

/**
 * @description Admin is goin to add question assigning it to its field workers and client
 * @access admin
 * @route POST /question-set
 * @status done
 */
export const addQuestion = async (req, res, next) => {
  const { setName, client, worker, querry } = req.body
  const { id: adminId } = req.user

  try {
    const set = new questionSetModel({
      setName: setName,
      admin: adminId,
      client: client,
      worker: worker
    })
    const questionSet = await set.save()

    //after creation of question set, the array of querry will create list of questions in questionset model
    for (let i = 0; i < querry.length; i++) {
      const question = await questionModel.create({
        questionSet: questionSet._id,
        question: querry[i].question,
        dataType: querry[i].dataType,
        mandatory: querry[i].mandatory
      })
      if (!question) {
        const err = 'Unable to create question !'
        return next(err)
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Question Created successful',
      body: { questionSet, querry }
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @description Show all restricted question set to all dedicated users
 * @access All restricted users
 * @route GET /question-set
 * @status done
 */
export const viewQuestionSet = async (req, res, next) => {
  try {
    console.log(req.body)
    const { id: userId, isAdmin, isWorker, isClient } = req.user

    //Find questionset with user id
    let questionSet
    if (isAdmin) {
      questionSet = await questionSetModel.find()
    } else if (isWorker) {
      questionSet = await questionSetModel.find({ worker: userId })
    } else if (isClient) {
      questionSet = await questionSetModel.find({ client: userId })
    }
    //Show the json data to user
    res.status(200).json({
      success: true,
      messgae: 'successfully retrieve data',
      body: questionSet
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @description Show details of a single question
 * @access All restricted users
 * @route GET /question-set/:questionId
 * @status done
 */
export const viewSingleQuestionSet = async (req, res, next) => {
  const { questionId } = req.params
  try {
    /**
     * 1. Get Question set
     * 2. get Questions in questionset
     * 3. get answers in questionset
     */
    //Step 1
    let questionSet = await questionSetModel
      .findOne({ _id: questionId })
      .populate('admin')
      .populate('client')
      .populate('worker')
    if (!questionSet) {
      res.status(404)
      throw new Error('Not Found !!')
    }

    //step 2
    let questions = await questionModel.find({ questionSet: questionSet._id })
    if (!questions) {
      res.status(404)
      throw new Error('Not Found !!')
    }

    //step 3
    for (let i = 0; i < questions.length; i++) {
      let answers = await answerSetModel
        .find({ question: questions[i]._id })
        .populate('worker')
      questions[i] = { ...questions[i]._doc, answer: answers }
    }
    // get All answers
    const answers = await answerSetModel
      .find({
        questionSet: questionId
      })
      .populate('question')

    //add questions to questionset object using spread operator
    questionSet = { ...questionSet._doc, querry: questions }

    if (questionSet) {
      res.status(200).json({
        success: true,
        message: 'Successfully retrieve data',
        body: questionSet,
        answers: answers
      })
    } else {
      res.status(404)
      throw new Error('Not Found !!')
    }
  } catch (error) {
    next(error)
  }
}

/**
 * @description Edit question  by admin
 * @access admin
 * @route /question-set/:questionId
 * @status done
 */
export const editQuestionSet = async (req, res, next) => {
  const { id: userId } = req.user
  const { questionId } = req.params
  const { setName, client, worker } = req.body
  try {
    const body = {
      setName: setName,
      admin: userId,
      client: client,
      worker: worker
    }

    const updateQuestionSet = await questionSetModel.findByIdAndUpdate(
      questionId,
      body,
      { new: true }
    )
    return res.json({
      success: true,
      message: 'Question Set Updated Successfully',
      body: updateQuestionSet
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @description Edit single question by admin
 * @access admin
 * @route /question-set/:questionId/question/:qId
 */
export const editSingleQuestion = async (req, res, next) => {
  const { questionId: qId } = req.params
  const { question, dataType, mandatory } = req.body
  try {
    const body = {
      question,
      dataType,
      mandatory
    }
    const updateQuestionSet = await questionModel.findByIdAndUpdate(qId, body, {
      new: true
    })
    return res.json({
      success: true,
      message: 'Question Updated Successfully',
      body: updateQuestionSet
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @description Delete single question by admin
 * @access admin
 * @route /question-set/:questionId/question/:qId
 */
export const deleteSingleQuestion = async (req, res, next) => {
  const { questionId: qId } = req.params
  try {
    const deleteQuestion = await questionModel.findByIdAndDelete(qId)
    console.log(deleteQuestion)
    const deleteanswer = await answerSetModel.deleteMany({ question: qId })
    console.log(deleteanswer)
    return res.json({
      success: true,
      message: 'Question Deleted Successfully',
      body: deleteQuestion
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @description Post answer
 * @access workers
 * @route /question-set/:questionSetID/answer
 */
export const postAnswer = async (req, res, next) => {
  const { id: workerId } = req.user
  const { answerArray } = req.body
  const { questionSetID } = req.params
  try {
    console.log(req.body)
    console.log(workerId)

    const workerPresent = await questionSetModel.find({
      _id: questionSetID,
      worker: workerId
    })

    if (workerPresent.length == 0) {
      const err = new Error('Worker not assigned to this question')
      return next(err)
    }

    //insert many to answer model consisting of answerArray and worker id in everyobject of array
    const answer = await answerSetModel.insertMany(
      answerArray.map((answer) => ({
        questionSet: questionSetID,
        worker: workerId,
        question: answer.questionId,
        data: answer.answerBody,
        coordinates: answer.coordinates
      }))
    )

    return res.status(201).json({
      success: true,
      message: 'answer posted successfully',
      body: answer
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @description
 * @access Admin
 * @route /question-set/answer/:questionId/:workerId
 */
export const getSingleAnswer = async (req, res, next) => {
  const { questionId: questionSet, workerId } = req.params
  try {
    console.log(questionSet, workerId)
    let question
    if (workerId === '621e4711f035eb8f807a9890') {
      question = await answerSetModel
        .find({
          worker: workerId
        })
        .populate('question')
    } else {
      question = await answerSetModel
        .find({
          questionSet: questionSet,
          worker: workerId
        })
        .populate('questionSet')
        .populate('question')
        .populate('worker')
    }

    console.log(question)

    if (!question) {
      const err = 'Invalid question Id'
      return next(err)
    }

    return res.status(201).json({
      success: true,
      message: 'answer posted successfully',
      body: question
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @description Search user using their username and userType
 * @route POST /question-set/search
 * @access Admin
 */
export const searchQuestion = async (req, res, next) => {
  const { setName } = req.body
  try {
    userDef = { setName: { $regex: setName } }

    //Finding user
    const user = await questionSetModel.find(userDef)
    if (user) {
      return res.status(200).json({
        success: true,
        body: user
      })
    } else {
      res.status(404)
      throw new Error('Question set not Found !!')
    }
  } catch (error) {
    return next(error)
  }
}

/**
 * @description Delete the selected questionSet with id
 * @access admin
 * @route /question-set/:questionId
 */
export const deleteQuestionSet = async (req, res, next) => {
  const { questionId } = req.params
  try {
    await questionSetModel.findByIdAndDelete(questionId)
    const questions = await questionModel.find({ question: questionId })
    if (!questions) {
      const err = new Error('Something went wrong!!')
      next(err)
    }
    const questionIdArray = []
    for (let i = 0; i < questions.length; i++) {
      questionIdArray.push(questions[i]._id)
    }
    await answerSetModel.deleteMany({ question: { $in: questionIdArray } })
    await questionModel.deleteMany({ question: questionId })
    return res
      .status(200)
      .json({ success: true, messgae: 'Question Set Deleted Successfully!' })
  } catch (error) {
    next(error)
  }
}
