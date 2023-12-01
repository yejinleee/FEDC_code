<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import type { Todo } from '~/store/todos';
import { useTodosStore } from '~/store/todos';
import TheIcon from '~/components/TheIcon.vue';

const props = defineProps<{
  todo: Todo;
}>();

const todosStore = useTodosStore();
const router = useRouter();

const done = computed({
  get() {
    return props.todo.done;
  },
  set(newValue) {
    todosStore.updateTodo({
      ...props.todo,
      done: newValue,
    });
  },
});

function toggleDone() {
  done.value = !done.value;
}
function onTodoModal() {
  todosStore.currentTodo = {
    ...props.todo,
  }; // 참조형이기 때문에 객체 통째로 할당하면 안된다.
  router.push(`/${props.todo.id}`);
}
</script>
<template>
  <div class="todo-item">
    <TheIcon
      :active="done"
      @click="toggleDone">
      check
    </TheIcon>
    <div
      class="title"
      @click="onTodoModal">
      {{ todo.title }}
    </div>
    <div
      class="drag-handle"
      v-if="todosStore.filterStatus === 'all'">
      <span class="material-symbols-outlined"> drag_indicator </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.todo-item {
  height: var(--item-height);
  border-bottom: 1px solid var(--border-color);
  padding: 0 20px 0 80px;
  background-color: #fff;
  display: flex;
  gap: 8px;
  align-items: center;
  position: relative;
  :deep(.the-icon) {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 24px;
    margin: auto;
  }
  .title {
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .drag-handle {
    color: #ddd;
    cursor: move;
  }
}
</style>
