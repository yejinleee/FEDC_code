<script setup lang="ts">
import { useTodosStore } from '~/store/todos';
import TodoCreator from '~/components/TodoCreator.vue';
import TodoList from '~/components/TodoList.vue';
import TheMessage from '~/components/TheMessage.vue';

const todosStore = useTodosStore();
</script>

<template>
  <main>
    <TodoCreator />
    <TodoList />
    <TheMessage />
  </main>
  <RouterView v-if="todosStore.todos.length" />
</template>

<style lang="scss" scoped>
main {
  max-width: 700px;
  margin: 0 auto;
}
</style>
