import userModel from '../models/users.model.js'
import expressAsyncHandler from 'express-async-handler'
import generateAuthToken from '../utils/token.js'

/**
 * @description Add user to DB , One type of user can only have one record with same username
 * @route GET add/user/:userType
 * i.e: /user/add/admin
 * i.e: /user/add/client
 * i.e: /user/add/worker
 * @access Public
 */
export const addUser = expressAsyncHandler(async (req, res, next) => {
  const { name, password } = req.body
  const { userType } = req.params
  try {
    //Initialising object due to scope
    let userDef = {}
    //Checking condition  for userType
    if (userType == 'admin') {
      userDef = { adminName: name, isAdmin: true }
    } else if (userType == 'worker') {
      userDef = { workerName: name, isWorker: true }
    } else if (userType == 'client') {
      userDef = { clientName: name, isClient: true }
    }

    //finding the user with user type in DB
    const userExist = await userModel.findOne(userDef)

    //If user Exists Throw error
    if (userExist) {
      res.status(403)
      const err = new Error('User already exists')
      return next(err)
    }
    //Add Password to object which will be added to DB
    userDef.password = password

    // Model initialised with data in it and saved in DB
    const user = new userModel(userDef)
    const createUser = await user.save()

    //Removed password from object to reeturn it as response
    delete userDef.password

    if (createUser) {
      return res.status(201).json({
        success: true,
        message: 'User created successfully!',
        _id: createUser._id,
        userDef
      })
    } else {
      res.status(404)
      const err = new Error('Invaid User data')
      next(err)
    }
  } catch (error) {
    console.log('Listen Here You Little shit......', error)
    next(error)
  }
})

/**
 * @description Login and Authenticate user wuth accessToken
 * @route GET /user/add/:userType
 * i.e: /user/login/admin
 * i.e: user/login/client
 * i.e: user/login/worker
 * @access Public
 *
 */
export const loginUser = expressAsyncHandler(async (req, res, next) => {
  const { name, password } = req.body
  const { userType } = req.params
  try {
    //Initialising object due to scope
    let userDef = {}
    //Checking condition  for userType
    if (userType == 'admin') {
      userDef = { adminName: name, isAdmin: true }
    } else if (userType == 'worker') {
      userDef = { workerName: name, isWorker: true }
    } else if (userType == 'client') {
      userDef = { clientName: name, isClient: true }
    }
    //Finding user IF user dosnt exist throw error else check password for auth
    const user = await userModel.findOne(userDef)
    let userExist
    if (user) {
      userExist = user
    } else {
      const err = new Error('Username Does not exist')
      next(err)
    }
    if (userExist && (await user.checkPassword(password))) {
      return res.json({
        success: true,
        message: 'User Authenticated successfully',
        _id: user.id,
        token: generateAuthToken(user._id),
        userDef
      })
    } else {
      const err = new Error('Invalid Credentials')
      next(err)
    }
  } catch (error) {
    next(error)
  }
})

/**
 * @description Show all types of users
 * @route GET /user
 * @access admin
 */
export const viewAllUsers = expressAsyncHandler(async (req, res, next) => {
  try {
    const users = await userModel.find({})
    return res.json({ success: true, message: users })
  } catch (error) {
    next(error)
  }
})

/**
 * @description: Delete User according to their id
 * @route DELETE /user/:id
 * @access Admin
 */
export const deleteUser = expressAsyncHandler(async (req, res, next) => {
  const { userId } = req.params

  try {
    const user = await userModel.findByIdAndDelete(userId)
    return res
      .status(202)
      .json({ success: true, message: 'User Delete successfully', info: user })
  } catch (error) {
    res.status(404)
    throw new Error('User not Found !!')
  }
})

/**
 * @description Change Password of any user on admin reqiest
 * @route POST /user/:userId
 * @access Admin
 */
export const changeUserPassword = expressAsyncHandler(
  async (req, res, next) => {
    const { password } = req.body
    const { userId } = req.params

    try {
      //Finding user according to their id
      const user = await userModel.findOne({ _id: userId })
      if (user) {
        //Check password if match throw error
        if (await user.checkPassword(password)) {
          const err = new Error('Password Cannot Be Same !')
          return next(err)
        } else {
          // Change password in DB
          user.password = password
          await user.save()
          user.password = undefined
          return res.status(200).json({
            success: true,
            message: 'Password Changed Successfully',
            body: user
          })
        }
      } else {
        res.status(404)
        throw new Error('User not Found !!')
      }
    } catch (error) {
      return next(error)
    }
  }
)

/**
 * @description Search user using their username and userType
 * @route POST /user/search/:userType
 * @access Admin
 */
export const searchUser = expressAsyncHandler(async (req, res, next) => {
  const { name } = req.body
  const { userType } = req.params
  try {
    let userDef = []
    //Checking condition  for userType
    if (userType == 'admin') {
      userDef = { adminName: { $regex: name }, isAdmin: true }
    } else if (userType == 'worker') {
      userDef = { workerName: { $regex: name }, isWorker: true }
    } else if (userType == 'client') {
      userDef = { clientName: { $regex: name }, isClient: true }
    }
    //Finding user
    const user = await userModel.find(userDef)
    if (user) {
      return res.status(200).json({
        success: true,
        body: user
      })
    } else {
      res.status(404)
      throw new Error('User not Found !!')
    }
  } catch (error) {
    return next(error)
  }
})
