import axios from "axios";

const dogApi = {
  listAllBreeds() {
    return axios.get("https://dog.ceo/api/breeds/list/all");
  },

  searchByBreed(breed) {
    return axios.get(`https://dog.ceo/api/breed/${breed}/images`);
  }
};

export default dogApi;
