import Multer from 'multer'
import FirebaseStorage from 'multer-firebase-storage'
import FirebaseAdmin from '../config/firebaseAdminSdk.js'
import dotenv from 'dotenv'

dotenv.config()

const upload = Multer({
  storage: FirebaseStorage({
    bucketName: process.env.storageBucket,
    credentials: {
      clientEmail: FirebaseAdmin.client_email,
      privateKey: FirebaseAdmin.private_key,
      projectId: process.env.projectId
    },
    public: true,
    unique: true
  }),
  limits: { fileSize: 10000000 } // 10MB
}).single('file')

/**
 * @description: This function is used to upload a file to firebase storage
 * @route POST /public/common/upload
 * @access Public
 */
export const fileUpload = (req, res) => {
  upload(req, res, async function (error) {
    if (error) {
      return res.status(500).json({ success: false, error })
    }
    res.status(201).json({ success: true, fileLink: req.file.publicUrl })
  })
}

