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
    user: null,
    studentData: [],
  }),
  actions: {
    setUser(user)
    {
      this.user= user
    },
    async fetchData() {
      try {
        const q = query(
          collection(dummyFirebase, 'Students Data'),
          orderBy('albumId', 'asc')
        );

        const qs = await getDocs(q);
        this.studentData = qs.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          createdAt: serverTimestamp(),
          isEditing: false,
        }));

        watchEffect(async () => {
          const updatedQs = await getDocs(q);
          const updatedStudentData = updatedQs.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            createdAt: serverTimestamp(),
            isEditing: false,
          }));

          this.studentData = updatedStudentData;
        });
      } catch (error) {
        console.log('Error in fetching', error);
      }
    },

     async deleteRow(id) {
      try {
        const studentDocRef = doc(dummyFirebase, 'Students Data', id);
        await deleteDoc(studentDocRef);

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
        foundStudent.title = title

        try {
          const studentDocRef = doc(dummyFirebase, 'Students Data', student.id)
          await updateDoc(studentDocRef, { title }) 
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