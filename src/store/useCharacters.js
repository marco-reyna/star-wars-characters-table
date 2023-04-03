import { defineStore } from "pinia";
import axios from "axios";

export const useCharactersStore = defineStore("useCharacters", {
  state: () => ({
    characters: [],
  }),
  getters: {
    getCharacters: (state) => state.characters,
  },
  actions: {
    async fetchAllCharacters() {
      const api = "https://swapi.dev/api";
      const endpoint = "people";
      let hasNext = true;
      let page = 1;
      while (hasNext) {
        try {
          const response = await axios.get(`${api}/${endpoint}/?page=${page}`);
          if (response) {
            const arrOfPeople = response.data.results;
            arrOfPeople.forEach((item) => {
              this.characters.push(item);
            });
            hasNext = !!response.data.next;
            page++;
          } else {
            hasNext = false;
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    },
  },
});
