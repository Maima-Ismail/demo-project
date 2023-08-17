<template>
  <div v-if="isModalOpen" class="custom-modal-background">
    <div class="custom-modal-content">
        <p class="heading">Add New Student</p>
        <div class="form">
            <form @submit.prevent="handleSubmit">
              <div class="mb-4">
                <label class="custom-modal-label">Title:</label>
                <div>
                    <input
                      type="text"
                      placeholder="Enter Title"
                      v-model="title"
                      class="custom-modal-input"
                      required
                    />
                </div>
                 <p v-if="isTitleInvalid" class=" p">Title must be at least 10 characters long.</p>
              </div>
              <div class="mb-4">
                <label class="custom-modal-label">Thumbnail:</label>
                <div>
                    <input
                      type="file"
                      accept="image/*"
                      @change="handleThumbnailChange"
                      class="custom-modal-input"
                      required
                    />
                </div>
                  <p v-if="isThumbnailValid" class=" p">Image size is too large. Maximum size allowed is 100 KB.</p>
              </div>
              <div class="mb-4">
                <label class="custom-modal-label">Album-ID:</label>
                <div>
                    <input
                      type="number"
                      placeholder="Enter Album ID"
                      v-model="albumId"
                      required
                      class="custom-modal-input"
                      :min="1"
                      :max="20"
                    />
                </div>
              </div>
              <div class="custom-modal-buttons">
                <button
                  type="button"
                  @click="closeModal"
                  class="custom-modal-cancel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="custom-modal-submit"
                >
                  Submit
                </button>
              </div>
            </form>
        </div>
    </div>
  </div>
</template>

<script setup>
import { useProjectStore } from '@/views/dashboards/analytics/useProjectStore'
import { serverTimestamp } from 'firebase/firestore/lite'
import { ref, defineProps, getCurrentInstance } from 'vue';

const props = defineProps({
  isModalOpen: {
    type: Boolean,
    required: true,
  },
});

const instance = getCurrentInstance(); // Get the current instance

const title = ref(null);
const selectedThumbnail = ref(null);
const albumId = ref(null);
const isTitleInvalid = ref(false);
const isThumbnailValid = ref(false);

const store = useProjectStore();

const handleThumbnailChange = () => {
  const file = event.target.files[0]; // Import the 'event' object
  if (file) {
    if(file.size > 100*1024){
      isThumbnailValid.value = true
      return;
    }
    isThumbnailValid.value = false
    const reader = new FileReader();
    reader.onload = () => {
      selectedThumbnail.value = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

const handleSubmit = () => {
  if (title.value.length < 10) {
    isTitleInvalid.value = true;
    return;
  }
  const newRow = {
    title: title.value,
    thumbnailUrl: selectedThumbnail.value,
    albumId: albumId.value,
    createdAt: serverTimestamp(),
  };
  
  store.addRow(newRow);
  instance.emit('rowAdded', newRow); // Emit the event using the instance
  closeModal();
};

const closeModal = () => {
  instance.emit('close'); // Emit the 'close' event using the instance
  title.value = null;
  selectedThumbnail.value = null;
  albumId.value = null;
  isTitleInvalid.value = false;
};
</script>

<style>
body{
    font-family:Arial, Helvetica, sans-serif
}
.custom-modal-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.custom-modal-content {
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0rem;
  width: 34rem;
}
.heading{
    background-color: #faf9f9;
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
    padding: 1rem;
}
.form{
    color: #9c9ca0;
    padding: 0rem 1rem 1rem 1rem;
}
.custom-modal-label {
  font-size: 1rem;
  margin-bottom: 0.2rem;
}

.custom-modal-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #dddee0;
  font-size: small;
  border-radius: 0.375rem;
  outline: none;
  transition: border-color 0.2s ease-in-out;
}

.custom-modal-input:focus {
  border-color: #7933eb;
}

.custom-modal-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.custom-modal-cancel {
  color:#9c9ca0;
  padding: 0.1rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  border: 1px solid #a1a1a1;
  background-color: transparent;
  outline: none;
  margin-right: 1rem;
  transition: background-color 0.3s, color 0.3s;
}

.custom-modal-cancel:hover {
  background-color: #ececec;
  
}


.custom-modal-submit {
  background-color: #3d885a;
  color: #ffffff;
  padding: 0.3rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  outline: none;
  border: none;
}
.custom-modal-submit:hover{
    box-shadow: 2px 2.5px 4px rgba(0, 0, 0, 0.3);
}
.p{
  color: red;
  font-size: x-small;
  margin-top: 1px;
}
</style>
