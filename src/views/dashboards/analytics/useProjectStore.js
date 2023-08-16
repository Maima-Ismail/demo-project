import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore/lite'
import { defineStore } from 'pinia'
import { dummyFirebase } from '../../../firebase/config'

export const useProjectStore = defineStore('ProjectStore', {
   state: () => ({
    studentData: [],
  }),
  actions: {
    // 👉 Fetch all project
 async fetchData() {
      try {
        const q = query(
          collection(dummyFirebase, 'Students Data'),
          orderBy('albumId', 'asc')
        )
        const qs = await getDocs(q)
        this.studentData = qs.docs.map((doc) => {
          return { ...doc.data(), id: doc.id, createdAt: serverTimestamp(),  isEditing: false,}
        }
        )
        console.log(this.studentData)
      } catch (error) {
        console.log('Error in load function', error)
      }
    },
     async deleteRow(id) {
      try {
        const StudentDel = doc(dummyFirebase, 'Students Data', id)
        await deleteDoc(StudentDel)
        console.log('deleted')
      } catch (error) {
        console.log(error)
      }
    },
     async editTitle({ student, title }) {
      const foundStudent = this.studentData.find(
        (item) => item.id === student.id
      )

      if (foundStudent) {
        // Update the title in the local state
        foundStudent.title = title

        // Update the title in Firestore
        try {
          const studentDocRef = doc(dummyFirebase, 'Students Data', student.id)
          await updateDoc(studentDocRef, { title }) // Update the 'title' field in the Firestore document
        } catch (error) {
          console.error('Error updating title:', error)
        }
      }
    },
     async addRow(newRow) {
      const StudentCollection = collection(dummyFirebase, 'Students Data')
      await addDoc(StudentCollection, newRow)
    },
    async editTitle({ student, title }) {
      const foundStudent = this.studentData.find(
        (item) => item.id === student.id
      )

      if (foundStudent) {
        // Update the title in the local state
        foundStudent.title = title

        // Update the title in Firestore
        try {
          const studentDocRef = doc(dummyFirebase, 'Students Data', student.id)
          await updateDoc(studentDocRef, { title }) // Update the 'title' field in the Firestore document
        } catch (error) {
          console.error('Error updating title:', error)
        }
      }
    },
  },
})