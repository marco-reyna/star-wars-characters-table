<script setup>
import { ref, onMounted, computed } from "vue";
import categories from "../constants/categories";
// components:
import CharactersTable from "../components/CharactersTable.vue";
import PlanetPopUp from "../components/PlanetPopUp.vue";
// store:
import { useCharactersStore } from "../store/useCharacters";
import { usePlanetsStore } from "../store/usePlanets";
const cStore = useCharactersStore();
const pStore = usePlanetsStore();
const allCharacters = computed(() => {
  return cStore.characters;
});
const allPlanets = computed(() => {
  return pStore.planets;
});
// data:
const showPopUp = ref(false);
const planetDetails = ref({});

onMounted(() => {
  cStore.fetchAllCharacters();
  pStore.fetchAllPlanets();
});

function showPlanetDetails(details) {
  planetDetails.value = details;
  showPopUp.value = true;
}

function closePopUp() {
  showPopUp.value = false;
}
</script>

<template>
  <div class="home-container">
    <PlanetPopUp
      :planetDetails="planetDetails"
      :showPopUp="showPopUp"
      @closePopUp="closePopUp"
    />
    <CharactersTable
      @showPlanetDetails="showPlanetDetails"
      :items="allCharacters"
      :categories="categories.categories"
      :allPlanets="allPlanets"
    />
  </div>
</template>

<style scoped lang="scss">
.home-container {
  max-width: max-content;
  padding: 30px;
  margin: 0 auto;
}
</style>
