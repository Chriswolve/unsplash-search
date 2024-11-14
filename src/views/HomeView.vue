<script setup>
import { encodeURI, decodeURI } from '@/utils';
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// State Image Management
import { useImageStore } from '../store/imageStore';
// Components
import SearchBar from '../components/SearchBar.vue';
import ImageList from '../components/ImagesList.vue';
import CardHeader from '../components/CardHeader.vue';

const route = useRoute();
const router = useRouter();
const param = route.params.tag;
const defaultTitle = 'Trending Photos Right Now';
const resultsTitle = 'Results'

const tag = ref(param ? decodeURI(param) : param);
const imageStore = useImageStore();

let loading = ref(false);
let title = ref('');

// Force to search results
const reloadSearching = async () => {
  await searchByTag(tag.value);
};


/* Executes an async quote operation
for managing the loading state and updating title */
const execAsyncQuote = async (quote,text, query = '',) =>{
  loading.value = true;
  imageStore.query = query;
  await quote(); // Callback
  title.value = text
  loading.value = false;
}


/* Fetches and updates images based
on user search query */
const searchImagesByQuery = async (query) => {
  await execAsyncQuote(
    imageStore.fetchImages,
    resultsTitle,
    query
  )
};

/* Fetches and updates images based
on trends (randomized searching) */

const searchImagesRandomized = async () => {
  await execAsyncQuote(
    imageStore.fetchRandomImages,
    defaultTitle
  )
};

/* Handles image search based on tag value
or returns random images if no tag provided (Random) */

const searchByTag = async (value) => {
  if (value !== undefined) {
    //Seach by tag
    await searchImagesByQuery(value);
  } else {
    // Search by trends
    await searchImagesRandomized();
  }
};

/* Handles search navigation by redirecting to tag page
or home based on query state */

const onSearch = (query) => {
  if (query.length > 0) {
    router.push({ path: `/tag/${encodeURI(query)}` }); // Tag filter
  } else {
    router.push({ path: '/' }); // Home
  }
};
/* Watches for URL tag param changes
and triggers a new search when it updates */

watch(
  () => route.params.tag,
  async (newTag, oldTag) => {
    if (newTag !== oldTag) {
      tag.value = decodeURI(newTag);
      await searchByTag(tag.value);
    }
  }
);

/* Performs param-based search
when the Main View is mounted */

onMounted(async () => {
  await searchByTag(tag.value);
});
</script>

<template>
  <v-card
    color="#292b30"
    class="border-thin border-surface-light"
    :loading="loading"
    width="500"
  >
    <v-card-item class="my-2">
      <!-- Renders the header section of the main card -->
      <CardHeader />
    </v-card-item>

    <v-card-text>
      <!-- SearchBar component that emits search events by tags -->
      <SearchBar @search="onSearch" />

      <div class="text-body-2 font-weight-bold pb-2">{{ title }}</div>
      <!-- Renders the ImageList when loading is complete-->
      <ImageList v-if="!loading" :onReload="reloadSearching" />
    </v-card-text>
  </v-card>
</template>
