<script setup>
import { onMounted, ref, watch } from "vue";
import NumberUtil from "../utils/NumberUtil.utils";

// components:
import SearchBox from "./SearchBox.vue";

// props and emits:
const props = defineProps(["items", "categories", "allPlanets"]);
const emit = defineEmits(["showPlanetDetails"]);

// data:
const currentItems = ref([...props.items]);
const currentItemsUnsorted = ref(props.items);
const sortingOrder = ref(false);

onMounted(() => {
  currentItems.value = [...props.items];
  currentItemsUnsorted.value = props.items;
});

watch(props.items, (newValue, oldValue) => {
  currentItems.value = [...newValue];
  currentItemsUnsorted.value = newValue;
});

function getPlanetName(url) {
  const p = props.allPlanets.find((planet) => planet.url === url);
  return p?.name;
}

function handlePlanetDetails(url) {
  const planetDetails = props.allPlanets.find((planet) => planet.url === url);
  emit("showPlanetDetails", planetDetails);
}

function search(name) {
  toggleSort();
  if (name) {
    currentItems.value = props.items.filter((item) => {
      let searchRegex = new RegExp(name, "i");
      return item.name.match(searchRegex) !== null;
    });
    currentItemsUnsorted.value = [...currentItems.value];
  } else {
    currentItems.value = [...props.items];
    currentItemsUnsorted.value = props.items;
  }
}

function toggleSort(column = null, direction = null) {
  if (direction === null || column === null) {
    currentItems.value = [...currentItemsUnsorted.value];
  } else {
    sortByColumn(currentItems.value, column, direction);
  }
}

function sortByColumn(data, column, direction) {
  let sortedData = direction
    ? [...data].sort(function (a, b) {
        if (NumberUtil.isNumber(a[column]) && NumberUtil.isNumber(b[column])) {
          const numA = +a[column];
          const numB = +b[column];
          return numA - numB;
        }
        if (a[column] < b[column]) {
          return -1;
        }
        if (a[column] > b[column]) {
          return 1;
        }
        return 0;
      })
    : [...data].sort(function (a, b) {
        if (NumberUtil.isNumber(a[column]) && NumberUtil.isNumber(b[column])) {
          const numA = +a[column];
          const numB = +b[column];
          return numB - numA;
        }
        if (b[column] < a[column]) {
          return -1;
        }
        if (b[column] > a[column]) {
          return 1;
        }
        return 0;
      });

  return (currentItems.value = sortedData);
}
</script>

<template>
  <div class="characters-table">
    <div class="characters-table-search">
      <SearchBox @search="search" />
      <div class="characters-table-title">
        <p>Star Wars Characters</p>
      </div>
    </div>
    <table class="characters-table-body">
      <thead>
        <tr>
          <th
            v-for="(key, i) in categories"
            :key="i"
            class="characters-table-column"
            @click="toggleSort(i, (sortingOrder = !sortingOrder))"
          >
            <span>
              {{ key }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in currentItems"
          :key="i"
          class="characters-table-row"
        >
          <td>
            {{ item.name }}
          </td>
          <td>
            {{ item.height }}
          </td>
          <td>
            {{ item.mass }}
          </td>
          <td>
            {{ item.created }}
          </td>
          <td>
            {{ item.edited }}
          </td>
          <td
            @click="handlePlanetDetails(item.homeworld)"
            class="characters-table-planet"
          >
            {{ getPlanetName(item.homeworld) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped lang="scss">
@import "../styles/variables.scss";
.characters-table {
  display: flex;
  flex-direction: column;

  &-search {
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 2rem;
    padding: 2rem 0px;
  }

  &-title {
    font-family: "Star Wars", sans-serif;
    font-size: clamp(1.8rem, 2vw, 2rem);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-toggleButton {
    display: inline-block;
    position: absolute;
    right: 1.5rem / 3;
  }

  &-column {
    width: max-content;
    padding: 0.3rem 1rem;
    text-transform: uppercase;
    font-size: 1.2rem;
    text-align: left;
    font-family: "Segoe UI", sans-serif;
    color: $yellow-sw;
    &:hover {
      background-color: $yellow-sw;
      color: $black-sw;
    }
  }

  &-planet {
    cursor: pointer;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
      text-transform: uppercase;
    }
  }

  &-row {
    &:hover {
      color: $yellow-sw;
    }
  }
}

td {
  width: max-content;
  padding: 0.5rem 1rem;
  text-align: left;
  font-family: "Segoe UI", sans-serif;
  letter-spacing: 0.8px;
}

@media (max-width: $breakpoint-lg) {
  .characters-table {
    &-search {
      display: block;
      justify-content: center;
    }
  }
}
</style>
