  <script setup>
  import { useProjectStore } from '@/views/dashboards/analytics/useProjectStore'
  import { onMounted } from 'vue'
  import modalFormData from './modalFormData.vue'
import { doc, deleteDoc, updateDoc, collection, addDoc } from 'firebase/firestore/lite'
import { dummyFirebase } from '@/firebase/config'

  
  const projectStore = useProjectStore()
  const searchQuery = ref('')
  const rowPerPage = 5;
  const currentPage = ref(1)
  const loading = ref(false)
  const editedTitle = ref('')
  const originalTitle= ref('')
  const editError = ref({})

  onMounted(() => {
    projectStore.fetchData()
  })

  const totalPage = computed(() => Math.ceil(filteredData.value.length / rowPerPage));

  // Filtered data based on search query
  const filteredData = computed(() => {
    if (!searchQuery.value) {
      return projectStore.studentData;
    } else {
      const lowercaseQuery = searchQuery.value.toLowerCase();
      return projectStore.studentData.filter(project => {
        return project.title.toLowerCase().includes(lowercaseQuery);
      });
    }
  });

  // Reset currentPage when searchQuery changes
  watch(searchQuery, () => {
    currentPage.value = 1;
  });

  const currentData = computed(() => {
    const startIndex = (currentPage.value - 1) * rowPerPage;
    const endIndex = startIndex + rowPerPage;
    return filteredData.value.slice(startIndex, endIndex);
  });

  const paginationData = computed(() => {
    const totalEntries = filteredData.value.length;
    if (totalEntries === 0) {
      return 'No entries available';
    }

    const firstIndex = (currentPage.value - 1) * rowPerPage + 1;
    const lastIndex = Math.min(firstIndex + rowPerPage - 1, totalEntries);
    
    return `Showing ${firstIndex} to ${lastIndex} of ${totalEntries} entries`;
  });
 

  const toggleEdit = (project) => {
    project.isEditing = true;
  editedTitle.value = project.title;
  originalTitle.value = project.title;
};
const clearEditError = (projectId) => {
  if (editedTitle.value.length >= 10) {
    editError.value[projectId] = ''; 
  }
};
 const editTitle = async (project) => {
  try {
    if (editedTitle.value.length < 10) {
      editError.value[project.id] = 'Title must be at least 10 characters long';
      return;
    }
    const studentDocRef = doc(dummyFirebase, 'Students Data', project.id);
    await updateDoc(studentDocRef, { title: editedTitle.value });


    const foundStudent = projectStore.studentData.find(item => item.id === project.id);
    if (foundStudent) {
      foundStudent.title = editedTitle.value;
      project.isEditing = false;
    }
  } catch (error) {
    console.error('Error updating title:', error);
  }
};

const remove = async (project) => {
  loading.value = true;
  try {
    if (!project.id) {
      console.error("Cannot delete an unsaved row.");
      return;
    }
    await projectStore.deleteRow(project.id);
  } catch (error) {
    console.error('Error deleting row:', error);
  }
  loading.value = false;
};

    const isModalOpen = ref(false);
    
    const openModal = () => {
     isModalOpen.value = true;
    };
    
    const closeModal = () => {
     isModalOpen.value = false;
    };
const handleRowAdded = async (newRow) => {
  try {

    const StudentCollection = collection(dummyFirebase, 'Students Data');
    const docRef = await addDoc(StudentCollection, newRow);

    newRow.id = docRef.id;
    projectStore.studentData.push(newRow);
  } catch (error) {
    console.error('Error adding row:', error);
  }
};

  </script>

  <template>
    <VCard v-if="projectStore.studentData">
      <VCardItem class="project-header d-flex flex-wrap justify-space-between py-4 gap-4">
        <VCardTitle>Students Data</VCardTitle>
       
        <template #append>
          <div class="d-flex align-center gap-2" style="width: 272px;">
            <VLabel>Search:</VLabel>
            <VTextField v-model="searchQuery" placeholder="Search" />
          </div>
        </template>
      </VCardItem>

      <VDivider />

      <!-- SECTION Table -->
      <VTable class="text-no-wrap">
        <!-- 👉 Table head -->
        <thead>
          <tr>
   
    <v-btn color="primary" class="mtq-2 mx-2 mt-2" elevated @click="openModal"> NEW
      <VIcon
        size="18"
        icon="tabler-user-plus"
        color="default"
        class="mx-2 text-bold"
      />
    </v-btn>
    <modalFormData :isModalOpen="isModalOpen" @close="closeModal" @rowAdded="handleRowAdded"/>
          </tr>
          <tr>

            <th scope="col" class="font-weight-semibold w-0"></th>
            <th scope="col" class="font-weight-semibold text-center">ALBUM ID</th>
            <th scope="col" class="font-weight-semibold text-center">TITLE</th>
            <th scope="col" class="font-weight-semibold">
              <span class="ms-2">ACTIONS</span>
            </th>
          </tr>
        </thead>

        <!-- 👉 Table Body -->
        <tbody>
          <tr v-for="(project, index) in currentData" :key="index" style="height: 3.5rem;">

            <!-- 👉 Avatar -->
            <td>
              <div class="d-flex align-center ml-10">
                <VAvatar variant="tonal" color="primary" size="38">
                  <VImg :src="project.thumbnailUrl" />
                </VAvatar>
              </div>
            </td>

            <!-- 👉 Album ID -->
            <td class="text-medium-emphasis text-center">{{ project.albumId }}</td>
            
            <!-- 👉 Title -->
            <td>
             <div v-if="project.isEditing">
                <VTextField v-model="editedTitle"  @input="clearEditError(project.id)"
    @keyup.enter="editTitle(project)" />
                 <p v-if="editError[project.id]" class="p">{{ editError[project.id] }}</p>
              </div>
              <div v-else class="text-left">
                {{ project.title }}
              </div>
            </td>
            
            <!-- 👉 Actions -->
            <td class="text-center" style="width: 7.5rem;">
              <VBtn icon variant="plain" color="default" size="x-small">
                <VIcon :size="22" icon="tabler-dots-vertical" />

                <VMenu activator="parent">
                  <div>
                    <v-btn :loading="loading"
        class="ma-1"
        color="error"

        @click="remove(project)">DELETE</v-btn>
                  </div>
                  <v-btn :loading="loading"
        class="ma-1"
        color="none"
        @click="toggleEdit(project)">EDIT</v-btn>
                </VMenu>
              </VBtn>
            </td>
          </tr>
        </tbody>

        <!-- 👉 table footer  -->
        <tfoot v-show="!projectStore.studentData.length">
          <tr>
            <td colspan="8" class="text-center text-body-1">
              No data available
            </td>
          </tr>
        </tfoot>
      </VTable>
      <!-- !SECTION -->


      <VDivider />

      <!-- SECTION Pagination -->
      <VCardText class="d-flex align-center flex-wrap justify-space-between gap-4 py-3">
        <!-- 👉 Pagination meta -->
        <span class="text-sm text-disabled">{{ paginationData }}</span>

        <!-- 👉 Pagination -->
        <VPagination
          v-model="currentPage"
          size="small"
          :total-visible="1"
          :length="totalPage"
          :total="totalPage"
        />
      </VCardText>
      <!-- !SECTION -->
    </VCard>
  </template>

  <style lang="scss">
  .project-header .v-card-item__append {
    padding-inline-start: 0;
  }
  </style>
