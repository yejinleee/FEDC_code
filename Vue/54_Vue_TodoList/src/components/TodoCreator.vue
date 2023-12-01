<script setup lang="ts">
import { ref } from 'vue';
import { useTodosStore } from '~/store/todos';
import TheIcon from '~/components/TheIcon.vue';

const todosStore = useTodosStore();
const title = ref('');

async function createTodo(event: MouseEvent | KeyboardEvent) {
  if (event instanceof KeyboardEvent && event.isComposing) return; // 키보드 입력된 한글을 구조화중일땐 동작 안하도록
  if (!title.value.trim()) return;
  try {
    await todosStore.createTodo({
      title: title.value,
    });
    title.value = '';
  } catch (err) {
    console.error('TodoCreator/createTodo', err);
  }
}
</script>

<template>
  <div class="todo-creator shadow">
    <TheIcon
      active
      @click="createTodo">
      add
    </TheIcon>
    <input
      :value="title"
      @input="title = ($event.target as HTMLInputElement).value"
      @keydown.enter="createTodo"
      placeholder="새로운 할일 입력!" />
  </div>
</template>

<style scoped lang="scss">
.todo-creator {
  height: var(--item-height);
  position: relative;
  margin-bottom: 30px;
  :deep(.the-icon) {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: 24px;
    z-index: 1;
  }
  input {
    padding: 0 10px 0 80px;
    border: 0;
    border-radius: 6px;
    outline: 0;
    background-color: white;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    &::placeholder {
      color: #ccc;
    }
  }
}
</style>
