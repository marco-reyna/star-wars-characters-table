<script setup>
import { ref } from "vue";

const emit = defineEmits(["search"]);
const name = ref("");

function searchName(name) {
  emit("search", name);
}
</script>

<template>
  <form @submit.prevent="searchName(name)" class="search-box">
    <input
      type="text"
      v-model="name"
      placeholder="Type character's name..."
      class="search-box-input"
    />
    <button type="submit" class="search-box-button">Search</button>
  </form>
</template>

<style scoped lang="scss">
@import "../styles/variables.scss";

.search-box {
  align-items: center;
  font-family: "Segoe UI", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;

  &-input {
    width: 300px;
    padding: 1rem;
    border-radius: 10px 0% 0% 10px;
    border: solid 0.5px $white-sw;
    background-color: $black-sw;
    font-weight: bold;
    &::placeholder {
      font-weight: bold;
      color: $white-sw;
      opacity: 0.7;
    }

    &:focus {
      border: none;
      background-color: $green-sw;
      box-shadow: -3px 0px 41px -3px $green-sw;
      outline: none;
      &::placeholder {
        font-weight: bold;
        color: $black-sw;
        opacity: 0.8;
      }
    }
  }

  &-button {
    width: 100px;
    padding: 1.1rem;
    border-radius: 1px 5px 5px 1px;
    border: none;
    background-color: $white-sw;
    font-weight: bold;
  }
}
</style>
