<script setup>
import { computed, defineProps } from 'vue';
import { useImageStore } from '../store/imageStore';
import ImageCard from './ImageCard.vue';

defineProps({
  // Force reload
  onReload: {
    type: Function,
    required: true
  }
});

// Instance of Image store
const imageStore = useImageStore();

// Computed property to access the images
const images = computed(() => imageStore.images);
const errors = computed(() => imageStore.error);
</script>

<template>

  <div v-if="images.length > 0">
    <div v-for="(image, index) in images" :key="index">
      <ImageCard :url="image.urls.small" :image="image" />
    </div>
  </div>

  <div v-else-if="error !== ''">
    <!-- Error Alert-->
    <v-alert title="Opps!" type="error" variant="tonal" color="red-lighten-1">
      <div class="d-flex justify-space-between align-center">
        <div>{{ errors }}</div>

        <!-- Reaload Button -->
        <v-btn
          @click="onReload"
          variant="outlined"
          color="red-lighten-1"
          size="small"
        >
          <v-icon class="mr-1" size="small">mdi-refresh</v-icon>
          Reload
        </v-btn>
      </div>
    </v-alert>
  </div>
</template>
