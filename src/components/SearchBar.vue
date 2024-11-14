<script setup>
import { ref, watch, defineEmits } from 'vue';
import { useImageStore } from '../store/imageStore';

// Define the 'search' event when the search is submitted
const emit = defineEmits(['search']);

// Access the image store to manage search query state
const imageStore = useImageStore();

// Initialize the local state for search query with the value
const searchQuery = ref(imageStore.query);

// Function to emit the search event with the current search query
const submitSearch = () => {
  emit('search', searchQuery.value);
};

// Watch for changes in the global image store's query
watch(
  () => imageStore.query,
  async (newTag) => {
    searchQuery.value = newTag;  // Update the local search query
  }
);
</script>

<template>
  <label class="text-body-2 font-weight-bold">
    Search by tag:

    <div class="d-flex justify-space-between align-center">
      <!-- Text input for entering search query with an option to search when Enter is pressed -->
      <v-text-field
        v-model="searchQuery"
        :loading="loading"
        dark
        class="w-full my-4"
        density="compact"
        label="Tags"
        variant="outlined"
        hide-details
        single-line
        @keyup.enter="submitSearch"
      />

      <!-- Button to trigger search manually -->
      <v-btn @click.prevent="submitSearch" class="ml-2">
        Search
      </v-btn>
    </div>
  </label>
</template>
