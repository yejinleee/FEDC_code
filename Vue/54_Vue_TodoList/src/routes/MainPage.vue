<script setup lang="ts">
import { useTodosStore } from '~/store/todos';
import TodoCreator from '~/components/TodoCreator.vue';
import TodoList from '~/components/TodoList.vue';

const todosStore = useTodosStore();
</script>

<template>
  <main>
    <TodoCreator />
    <TodoList />
  </main>
  <RouterView v-if="todosStore.todos.length" />
</template>
