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
  };
  
  // store.addRow(newRow);
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
body {
  font-family: Arial, Helvetica, sans-serif;
}

.custom-modal-background {
  position: fixed;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 50%);
  inset: 0;
}

.custom-modal-content {
  padding: 0;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 10%);
  inline-size: 34rem;
}

.heading {
  padding: 1rem;
  background-color: #faf9f9;
  border-start-end-radius: 0.5rem;
  border-start-start-radius: 0.5rem;
}

.form {
  color: #9c9ca0;
  padding-block: 0 1rem;
  padding-inline: 1rem;
}

.custom-modal-label {
  font-size: 1rem;
  margin-block-end: 0.2rem;
}

.custom-modal-input {
  padding: 0.5rem;
  border: 1px solid #dddee0;
  border-radius: 0.375rem;
  font-size: small;
  inline-size: 100%;
  outline: none;
  transition: border-color 0.2s ease-in-out;
}

.custom-modal-input:focus {
  border-color: #7933eb;
}

.custom-modal-buttons {
  display: flex;
  justify-content: flex-end;
  margin-block-start: 1rem;
}

.custom-modal-cancel {
  border: 1px solid #a1a1a1;
  border-radius: 0.375rem;
  background-color: transparent;
  color: #9c9ca0;
  cursor: pointer;
  margin-inline-end: 1rem;
  outline: none;
  padding-block: 0.1rem;
  padding-inline: 1rem;
  transition: background-color 0.3s, color 0.3s;
}

.custom-modal-cancel:hover {
  background-color: #ececec;
}

.custom-modal-submit {
  border: none;
  border-radius: 0.375rem;
  background-color: #3d885a;
  color: #fff;
  cursor: pointer;
  outline: none;
  padding-block: 0.3rem;
  padding-inline: 1rem;
}

.custom-modal-submit:hover {
  box-shadow: 2px 2.5px 4px rgba(0, 0, 0, 30%);
}

.p {
  color: red;
  font-size: x-small;
  margin-block-start: 1px;
}
</style>
