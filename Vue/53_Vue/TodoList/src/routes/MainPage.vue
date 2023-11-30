<script setup lang="ts">
import TodoCreator from '~/components/TodoCreator.vue';
(async () => {
  const res = await fetch('/api/hello', {
    method: 'POST',
  });
  const json = await res.json();
  console.log(json);
})();
</script>

<template>
  <main>
    <TodoCreator />
  </main>
</template>
