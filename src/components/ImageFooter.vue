<script setup>
import {encodeURI} from '@/utils'
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

// Define required properties passed to the component
defineProps({
  url: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  created_at: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: true
  }
});

// Initialize Vue Router
const router = useRouter();

// Function to navigate to a new route based on the clicked tag
const searchByTag = (tag) => {
  const encode = encodeURI(tag); // Encode URI to avoid route syntax errors
  router.push({ path: `/tag/${encode}` });
};

/* Function to truncate long text,
adding '...' at the end if text is longer than 10 characters */
const truncateText = (text) => {
  if (text.length > 10) {
    return text.slice(0, 10) + '...';
  }
  return text;
};
</script>

<template>
  <div class="img-details d-flex justify-space-between align-center pa-2">
    <div class="d-flex flex-column justify-start text-left">
      <!-- Displays image author and creation date -->
      <div class="text-caption">
        By <b>{{ author.fullName }}</b>
      </div>
      <div class="text-caption">Taken on {{ created_at }}</div>
    </div>

    <div class="d-flex justify-end text-right">
      <!-- Iterates through tags and renders them as clickable chips -->
      <v-chip
        v-for="(tag, index) in tags"
        :key="index"
        @click="searchByTag(tag)"
        class="ma-1"
        label
        size="small"
        color="white"
        variant="outlined"
      >
        <!-- Truncates long tags and shows the full tag on hover with a tooltip -->
        <div class="text-smaller">
          {{ truncateText(tag) }}
        </div>
        <v-tooltip v-if="tag.length > 10" activator="parent" location="top">
          {{ tag }}  <!-- Tooltip displays the full tag -->
        </v-tooltip>
      </v-chip>
    </div>
  </div>
</template>

<style scoped>
.img-details {
  height: 50px;
  width: 100%;
  background: #000000d6;
  z-index: 100;
  bottom: 0px;
  position: absolute;
}
</style>
