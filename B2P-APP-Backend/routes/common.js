import express from 'express'
import { fileUpload } from '../controllers/common.controllers.js'


const router = express.Router()

router.route('/fileUpload').post(fileUpload)
export default router
