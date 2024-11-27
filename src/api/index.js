import { callAPI } from './connector';
import paths from './paths';
//import { ImageModel } from "../models/ImageModel"


export default {

  /* Fetches image data from API
    using provided ID and returns image data (with Tags) */
  async getImage(id) {
    const response = await callAPI(paths.GET_IMAGE.replace('{id}', id))
    return response.data;
  },


  /* Fetches 10 random images from API and
  enriches them with tags using ImageModel factory */
  async getRandomImages() {
    const response = await callAPI(paths.RANDOM_IMAGES, { count: 10 })
    // Random images
    const images = response.data;
    // Get tags for each image found
    // const imagesWithTags = await Promise.all(
    //   images.map(async (image) => {
    //     return await ImageModel.create(image)// Factory
    //   })
    // );

    // return imagesWithTags;

    return new Promise((resolve)=> {
      resolve(images)
    })
  },

  /* Searches for images based on a query and
  enriches them with tags using the ImageModel factory */
async searchImages(query,page) {
  const response = await callAPI(paths.SEARCH_IMAGES, { query,page });
  const images = response.data.results;

  // const imagesWithTags = await Promise.all(
  //   images.map(async (image) => {
  //     return await ImageModel.create(image); // Factory
  //   })
  // );

  // return imagesWithTags;
  return new Promise((resolve)=> {
    resolve(images)
  })
}

};
