<script setup>
const props = defineProps(["planetDetails", "showPopUp"]);
const emit = defineEmits(["closePopUp"]);

function close() {
  emit("closePopUp");
}
</script>

<template>
  <div class="planet-pop-up" v-show="props.showPopUp">
    <div class="planet-pop-up-overlay" @click="close"></div>
    <div class="planet-pop-up-frame">
      <button class="planet-pop-up-button" @click="close">X</button>
      <div class="planet-pop-up-name">{{ props.planetDetails.name }}</div>
      <div class="planet-pop-up-info">
        <div>
          Diameter: <span>{{ props.planetDetails.diameter }}</span>
        </div>
        <div>
          Climate: <span>{{ props.planetDetails.climate }}</span>
        </div>
        <div>
          Population: <span>{{ props.planetDetails.population }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../styles/variables.scss";

.planet-pop-up {
  display: flex;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 10;

  &-overlay {
    background-color: rgba(0, 0, 0, 0.486);
    box-shadow: inset 0 0 10vw black;
    height: 100vh;
    left: 0;
    opacity: 0.95;
    position: absolute;
    top: 0;
    width: 100vw;
    cursor: pointer;
  }

  &-frame {
    background: $black-sw;
    height: auto;
    margin: auto;
    padding: 2.5rem 2.5rem 3rem 2.5rem;
    position: relative;
    width: 30vw;
    border: solid 3px $yellow-sw;
    border-radius: 10px;
    box-shadow: 0px 0px 50px -24px $yellow-sw;
  }

  &-button {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    background: none;
    border: solid 1px $black-sw;
    border-radius: 10%;
    font-size: 14px;
    font-weight: bold;
    color: $yellow-sw;
    padding: 0.5rem;
    cursor: pointer;
    &:hover {
      border: solid 1px $yellow-sw;
    }
  }

  &-name {
    padding: 2rem 0;
    font-family: "Star Wars", sans-serif;
    font-size: clamp(1.8rem, 2vw, 2rem);
  }

  &-info {
    div {
      font-family: "Segoe UI", sans-serif;
      font-size: 1.1rem;
      text-transform: uppercase;
      padding: 0.5rem 0;
    }
    span {
      color: $yellow-sw;
      text-transform: capitalize;
      font-weight: bold;
    }
  }
}
</style>
