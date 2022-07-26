import admin from 'firebase-admin'

import serviceAccount from './firebaseAdminSdk.js'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
  // databaseURL: process.env.fb_db_url
})

export default admin
