<script setup lang="ts">
import { ref, onMounted } from 'vue'; // mounted는 vue에서 가져와야함

const count = ref(0);

console.log('created'); // script 영역에 적어주는 것만으로도 라이프사이클의 created()순서와 거의 비슷!
onMounted(() => {
  console.log('Mounted');
});

function increase() {
  count.value += 1;
}
</script>

<template>
  <h1 @click="increase">{{ count }}</h1>
</template>
