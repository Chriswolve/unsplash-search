<script setup>
import { ref, computed, defineProps } from 'vue';
import { useImageStore } from '../store/imageStore';
import ImageCard from './ImageCard.vue';

const props = defineProps({
  // Force reload
  onReload: {
    type: Function,
    required: true,
  },

  onScrollingEnds: {
    type: Function,
    required: false,
  },
})

// Instance of Image store
const imageStore = useImageStore();

// Computed property to access the images
const images = computed(() => imageStore.images);
const errors = computed(() => imageStore.error);

const loading = ref(false)

const documentEle = document.documentElement;
let k = 0;


function debounce(func, delay) {

    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

async function checkScrollDown  () {
  const scrolled = window.innerHeight + window.scrollY;
  const maxHeight = documentEle.scrollHeight;

  if(scrolled >= (maxHeight + k)) {
    loading.value = true;
    k = 100;
    await debouncedFunc();
  }
}

const debouncedFunc = debounce( async ()=> {
  await props.onScrollingEnds()
  loading.value = false;
  k = 0;
},2000);

window.addEventListener('scroll', checkScrollDown)


</script>

<template>

  <div v-if="images.length > 0">
    <div v-for="(image, index) in images" :key="index">
      <ImageCard :url="image.urls.small" :image="image" />
    </div>

    <div v-if="loading" class="mx-auto"> loading ... </div>
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
