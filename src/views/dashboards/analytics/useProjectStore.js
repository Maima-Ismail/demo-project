import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore/lite';
import { defineStore } from 'pinia';
import { dummyFirebase } from '../../../firebase/config';

export const useProjectStore = defineStore('ProjectStore', {
  state: () => ({
    studentData: [],
  }),
  actions: {
    async fetchData() {
      try {
        const q = query(
          collection(dummyFirebase, 'Students Data'),
          orderBy('albumId', 'asc')
        );

        // Initial fetch using getDocs
        const qs = await getDocs(q);
        this.studentData = qs.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          createdAt: serverTimestamp(),
          isEditing: false,
        }));

        // Watch for real-time changes using watchEffect
        watchEffect(async () => {
          const updatedQs = await getDocs(q);
          const updatedStudentData = updatedQs.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            createdAt: serverTimestamp(),
            isEditing: false,
          }));

          // Update the studentData array with the updated data
          this.studentData = updatedStudentData;
        });
      } catch (error) {
        console.log('Error in load function', error);
      }
    },

     async deleteRow(id) {
      try {
        const studentDocRef = doc(dummyFirebase, 'Students Data', id);
        await deleteDoc(studentDocRef);

        // Update the local state by removing the deleted row
        this.studentData = this.studentData.filter(item => item.id !== id);
      } catch (error) {
        console.error('Error deleting row:', error);
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
  },
})