<script setup lang="ts">
import { ref } from 'vue';
import { useMovieStore } from './store/movie';

const movieStore = useMovieStore();
const title = ref('');

async function searchMovies() {
  await movieStore.fetchMovies(title.value);
}
function resetMovies() {
  title.value = '';
  // movieStore.movies = []; 처럼 직접 초기회보다 pinia 기능 $reset() 이용
  movieStore.$reset();
  console.log(movieStore);
}
</script>

<template>
  <input
    v-model="title"
    @keydown.enter="searchMovies" />
  <button @click="searchMovies">SEARCH</button>
  <button @click="resetMovies">Reset</button>
  <ul>
    <li
      v-for="movie in movieStore.filteredMovies"
      :key="movie.imdbID">
      {{ movie.Title }}
      {{ movie.Year }}
    </li>
  </ul>
</template>
