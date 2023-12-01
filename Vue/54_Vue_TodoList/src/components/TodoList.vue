<script setup lang="ts">
import { computed } from 'vue';
import { debounce } from 'lodash';
import { useTodosStore } from '~/store/todos';
import TheIcon from '~/components/TheIcon.vue';
import TheBtn from '~/components/TheBtn.vue';
import TodoItem from '~/components/TodoItem.vue';

const todosStore = useTodosStore();

const debounced = debounce((newValue: boolean) => {
  todosStore.updateCheckboxes(newValue);
}, 1000);
const isAllChecked = computed({
  get() {
    return todosStore.todos.every((todo) => todo.done);
  },
  set(newValue: boolean) {
    todosStore.todos.forEach((todo) => {
      todo.done = newValue;
    });
    debounced(newValue);
  },
});
todosStore.fetchTodos();
function toggleAllCheckboxes() {
  isAllChecked.value = !isAllChecked.value;
}
</script>

<template>
  <div class="todo-head">
    <TheIcon
      :active="isAllChecked"
      @click="toggleAllCheckboxes">
      done_all
    </TheIcon>
    <div class="btn-group">
      <TheBtn
        v-for="filter in todosStore.filters"
        :key="filter.name"
        :active="todosStore.filterStatus === filter.name"
        @click="todosStore.filterStatus = filter.name">
        {{ filter.label }}
      </TheBtn>
      <TheBtn
        danger
        @click="todosStore.deleteDoneTodos">
        완료만 삭제</TheBtn
      >
    </div>
  </div>

  <div class="todo-list">
    <TodoItem
      v-for="todo in todosStore.filteredTodos"
      :key="todo.id"
      :todo="todo" />
  </div>
</template>

<style lang="scss" scoped>
.todo-head {
  height: 60px;
  border-bottom: 1px solid var(--border-color);
  background-color: rgba(#fff, 0.9);
  position: relative;
  :deep(.the-icon) {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 24px;
    margin: auto;
  }
  .btn-group {
    height: 100%;
    display: flex;
    position: absolute;
    right: 0;
  }
}
</style>
