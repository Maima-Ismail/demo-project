import * as firebase from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: 'AIzaSyBB0XqApTC2IffhAsZzr43A2qTFkzCRV-A',
  authDomain: 'student-info-37c3d.firebaseapp.com',
  projectId: 'student-info-37c3d',
  storageBucket: 'student-info-37c3d.appspot.com',
  messagingSenderId: '68896003246',
  appId: '1:68896003246:web:a7a228cfcb0bc34cbf893f',
}

const myfirebase = firebase.initializeApp(firebaseConfig)
const dummyFirebase = getFirestore(myfirebase)

export { dummyFirebase }

