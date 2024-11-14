<script setup>
import {  defineProps } from "vue";
import ImageFooter from './ImageFooter.vue';

defineProps({
  url: {
    type: String,
    required: true,
  },
  image:{
    type:Object,
    required: true,
  },

});
</script>

<template>
  <div class="img-block my-4">

    <!-- Image -->
    <v-img
      width="500"
      height="300"
      aspect-ratio="16/9"
      cover
      :src="url"
    ></v-img>
    <!-- Image Footer -->
    <ImageFooter
      :author="image.author"
      :created_at="image.hzCreated"
      :tags="image.tags"
    />

  </div>
</template>

<style scoped>
.img-block {
  position: relative;
}
</style>
