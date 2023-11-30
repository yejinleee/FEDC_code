<script setup lang="ts">
import { watch, reactive } from 'vue';

// const userName = ref('');
const user = reactive({
  name: 'happy',
  age: 20,
});

watch(
  // user.name 변경만 감지하고 싶을 때
  () => user.name,
  (newVal) => console.log(newVal),
);

console.log(user.name, user.age);
</script>

<template>
  <input v-model="user.name" />
  <h1>{{ user.name }}</h1>
</template>
