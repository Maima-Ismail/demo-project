  <script setup>
  import { useProjectStore } from '@/views/dashboards/analytics/useProjectStore'
  import { avatarText } from '@core/utils/formatters'
  import { onMounted } from 'vue'
  import modalFormData from './modalFormData.vue'

  
  const projectStore = useProjectStore()
  const searchQuery = ref('')
  const rowPerPage = 5;
  const currentPage = ref(1)
  const selectedRows = ref([])
  const selectAllProject = ref(false)
  const loading = ref(false)
  const editedTitle = ref('')
  const originalTitle= ref('')

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
  const selectUnselectAll = () => {
  if (selectAllProject.value) {
    selectedRows.value = currentData.value.map(project => `check${project.id}`);
  } else {
    selectedRows.value = [];
  }
}

// Watch for changes in selectedRows and update selectAllProject accordingly
watch(selectedRows, () => {
  if (selectedRows.value.length === currentData.value.length) {
    selectAllProject.value = true;
  } else {
    selectAllProject.value = false;
  }
}, { deep: true });
  const addRemoveIndividualCheckbox = checkID => {
    if (selectedRows.value.includes(checkID)) {
      const index = selectedRows.value.indexOf(checkID)

      selectedRows.value.splice(index, 1)
    } else {
      selectedRows.value.push(checkID)
      selectAllProject.value = true
    }
  }
  const remove = (id) => {
    loading.value = true
    projectStore.deleteRow(id)
    loading.value = false
  }
  const toggleEdit =(project)=> {
    project.isEditing = true
    console.log(project.isEditing)
    editedTitle.value = project.title
    originalTitle.value = project.title
    }
   const saveEdit = (project) => {
      projectStore.editTitle({
        student: project,
        title: editedTitle.value,
      })
      project.isEditing = false
    }
    const isModalOpen = ref(false);
    
    const openModal = () => {
     isModalOpen.value = true;
    };
    
    const closeModal = () => {
     isModalOpen.value = false;
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
   
    <v-btn color="primary" class="mtq-2 mx-2" elevated @click="openModal"> NEW
      <VIcon
        size="18"
        icon="tabler-user-plus"
        color="default"
        class="mx-2 text-bold"
      />
    </v-btn>
    <modalFormData :isModalOpen="isModalOpen" @close="closeModal" />
          </tr>
          <tr>
            <!-- 👉 Check/Uncheck all checkbox -->
             <th scope="col" class="text-center">
        <div style="width: 1rem;">
          <VCheckbox
            :model-value="selectAllProject"
            @click="selectUnselectAll"
          />
        </div>
      </th>

            <th scope="col" class="font-weight-semibold"></th>
            <th scope="col" class="font-weight-semibold text-center">ALBUM ID</th>
            <th scope="col" class="font-weight-semibold text-center">TITLE</th>
            <th scope="col" class="font-weight-semibold">
              <span class="ms-2">ACTIONS</span>
            </th>
          </tr>
        </thead>

        <!-- 👉 Table Body -->
        <tbody>
          <tr v-for="project in currentData" :key="project.id" style="height: 3.5rem;">
            <!-- 👉 Individual checkbox -->
            <td>
          <div style="width: 1rem;">
            <VCheckbox
              :id="`check${project.id}`"
              :model-value="selectedRows.includes(`check${project.id}`)"
              @click="addRemoveIndividualCheckbox(`check${project.id}`)"
            />
          </div>
        </td>

            <!-- 👉 Avatar -->
            <td>
              <div class="d-flex align-center">
                <VAvatar variant="tonal" color="primary" size="38">
                  <VImg v-if="project.thumbnailUrl.length" :src="project.thumbnailUrl" />
                  <span v-else class="font-weight-semibold">{{ avatarText(project.title) }}</span>
                </VAvatar>
              </div>
            </td>

            <!-- 👉 Album ID -->
            <td class="text-medium-emphasis text-center">{{ project.albumId }}</td>
            
            <!-- 👉 Title -->
            <td>
             <div v-if="project.isEditing">
                <VTextField v-model="editedTitle" @keyup.enter="saveEdit(project)" />
              </div>
              <div v-else>
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

        @click="remove(project.id)">DELETE</v-btn>
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
