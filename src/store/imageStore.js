import { defineStore } from 'pinia';
import API from '../api';
import HashTable from '../libs/HashTable';

/**
 * Error handler that processes API errors (403 especificaly)
 */
const handleErrors = (e) => {
  return e.response ? e.response.data : e.message;
};

/**
 * Pinia store definition for managing image-related state.
 */
export const useImageStore = defineStore('image', {
  state: () => ({
    // Array of images fetched from the API
    images: [],
    // Search query string
    query: '',
    // Error message string
    error: '',
    // Optimizers
    tags: new HashTable(50), // Tag storage using to reduce callings count
    trends: new Array(), // Temporary on savings trends
  }),

  actions: {
    /**
     * Fetches images based on the current search query and stores.
     */
    async fetchImages() {
      this.images = [];

      try {
        this.images = await API.searchImages(this.query);
      } catch (e) {
        this.error = handleErrors(e);
      }
    },

    /**
     * Fetches random images and stores them in `images`
     * it uses (saved data ) instead of making a new API call.
     */
    async fetchRandomImages() {
      this.images = [];
      try {
        if (this.trends.length > 0) {
          this.images = this.trends; // Use stored random images
        } else {
          this.images = await API.getRandomImages(); // Fetch new random images
          console.log('Saving random images...');
          this.trends = this.images; // Save fetched images in trends for future use
        }
      } catch (e) {
        this.error = handleErrors(e);
      }
    },
  },
});
