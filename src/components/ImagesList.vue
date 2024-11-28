<script setup>
import { ref, computed, defineProps, watch } from 'vue';
import { useImageStore } from '../store/imageStore';
import ImageCard from './ImageCard.vue';

const props = defineProps({
  // Force reload
  onReload: {
    type: Function,
    required: true
  },

  onScrollingEnds: {
    type: Function,
    required: false
  }
});

// Instance of Image store
const imageStore = useImageStore();

// Computed property to access the images
const images = computed(() => imageStore.images);
const errors = computed(() => imageStore.error);
// Oberver
const sentinelRef = ref(null);


const observerCallback = async (entries) => {
  const entry = entries[0];
  if (entry.isIntersecting) {
    await props.onScrollingEnds();
    console.log('Load more conntent');
  }
};

watch(
  () => sentinelRef.value,
  (newValue) => {
    if (newValue) {
      const observer = new IntersectionObserver(observerCallback, {
        root: null,
        threshold: 1.0
      });
      observer.observe(newValue);
    }
  }
);
</script>

<template>
  <div v-if="images.length > 0">
    <div v-for="(image, index) in images" :key="index">
      <ImageCard :url="image.urls.small" :image="image" />
    </div>
    <div id="sentinel" ref="sentinelRef" class="mx-auto">loading ...</div>
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
