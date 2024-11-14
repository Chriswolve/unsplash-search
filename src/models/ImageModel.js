
import { Model } from "./Model"
import API from "../api"
import { useImageStore } from "../store/imageStore";

export class ImageModel extends Model{

  constructor( {id, ...data}){
    super(id,{
      created_at: data.created_at,
      urls: {
        small: data.urls ? data.urls.regular : 'https://via.placeholder.com/150',
        full: data.urls ? data.urls.full : 'https://via.placeholder.com/600',
      },
      author: {
        firstName: data.user ? data.user.first_name : 'Unknown',
        lastName: data.user ? data.user.last_name : '',
        fullName: data.user ? data.user.name : 'Unknown',
      },
    })
  }

  async initialize(){
    await this.setTags();
    return this;
  }

  static async create(data) {
    const instance = new ImageModel(data);
    return await instance.initialize();
  }

  // Lazy initialization
  async setTags(){
    const imageStore = useImageStore();

    const storage = imageStore.tags;
    const tags = storage.get(this.id);

    if(tags) {
      this.node.tags = tags;
    }
    else{
      const data = await API.getImage(this.id);
      this.node.tags = (data.tags || []).slice(0, 3).map(e=>e.title);
      storage.set(this.id,this.node.tags)
    }
  }


  // Getters

  get author(){
    return this.node.author
  }

  get tags(){
    return this.node.tags
  }

  get urls(){
    return this.node.urls
  }

}
