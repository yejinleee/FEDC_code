<script setup lang="ts">
import { useTodosStore } from '~/store/todos';
import TodoItem from '~/components/TodoItem.vue';

const todosStore = useTodosStore();

todosStore.fetchTodos();
</script>

<template>
  <div class="todo-list">
    <TodoItem
      v-for="todo in todosStore.todos"
      :key="todo.id"
      :todo="todo" />
  </div>
</template>

<style lang="scss" scoped></style>
