import { defineStore } from "pinia";
import axios from "axios";

export const usePlanetsStore = defineStore("usePlanets", {
  state: () => ({
    planets: [],
  }),
  getters: {
    getPlanets: (state) => state.planets,
  },
  actions: {
    async fetchAllPlanets() {
      const api = "https://swapi.dev/api";
      const endpoint = "planets";
      let hasNext = true;
      let page = 1;
      while (hasNext) {
        try {
          const response = await axios.get(`${api}/${endpoint}/?page=${page}`);
          if (response) {
            const arrOfPlanets = response.data.results;
            arrOfPlanets.forEach((item) => {
              this.planets.push(item);
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
