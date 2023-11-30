<script setup lang="ts">
import { useCountStore } from './store/count';

const countStore = useCountStore();
</script>

<template>
  <h1>{{ countStore.count }}</h1>
  <h2>{{ countStore.double }}</h2>
  <button @click="countStore.increase">Increase</button>
  <button @click="countStore.decrease">Decrease</button>
</template>
