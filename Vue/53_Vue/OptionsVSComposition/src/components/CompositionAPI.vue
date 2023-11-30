<script setup lang="ts">
import { ref, computed, watch } from 'vue'; // mounted는 vue에서 가져와야함

const count = ref(0);

const double = computed({
  get() {
    return count.value * 2;
  },
  set(newValue: number) {
    count.value = newValue / 2;
  },
});
watch(count, (newValue, oldValue) => {
  console.log(newValue, oldValue);
});
function increase() {
  count.value += 1;
}
function assign() {
  double.value = 8;
}
</script>

<template>
  <button @click="increase">INCREASE</button>
  <button @click="assign">assign 8</button>
  <h1>{{ count }}</h1>
  <h1>{{ double }}</h1>
</template>
