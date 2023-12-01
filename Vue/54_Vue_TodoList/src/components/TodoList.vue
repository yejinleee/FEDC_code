<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { debounce } from 'lodash';
import Sortable from 'sortablejs';
import { useTodosStore } from '~/store/todos';
import TheIcon from '~/components/TheIcon.vue';
import TheBtn from '~/components/TheBtn.vue';
import TodoItem from '~/components/TodoItem.vue';

const todosStore = useTodosStore();
const todoListEl = ref<HTMLDivElement | null>(null); // HTML과 연결이후에 사용가능. 즉 onMounted에 사용

const debounced = debounce((newValue: boolean) => {
  todosStore.updateCheckboxes(newValue);
}, 1000);

const isAllChecked = computed({
  get() {
    // todosStore.filteredTodos.length가 0일떄 이를 T/F로 바꾸기 위해 !! 사용
    return (
      !!todosStore.filteredTodos.length &&
      todosStore.filteredTodos.every((todo) => todo.done)
    );
  },
  set(newValue: boolean) {
    todosStore.todos.forEach((todo) => {
      todo.done = newValue;
    });
    debounced(newValue);
  },
});

todosStore.fetchTodos();

onMounted(() => {
  initSortable();
});

function toggleAllCheckboxes() {
  isAllChecked.value = !isAllChecked.value;
}

function initSortable() {
  if (todoListEl.value) {
    new Sortable(todoListEl.value, {
      handle: '.drag-handle',
      animation: 0, //움직임 효과
      forceFallback: true, // 드래그엔드롭 기능이 다양한 브라우저에서 일관되도록. 크로스브라우징을 위해서.
      onEnd: (event) => {
        // 드래그앤드롭 직후에 발생. 인자로 발생한이벤트
        const { oldIndex, newIndex } = event;
        todosStore.reorderTodos({
          oldIndex: oldIndex as number,
          newIndex: newIndex as number,
        }); // if로 조건두어도 되지만, 숫자임이 확실하니까 단언해도 될듯
      },
    });
  }
}
</script>

<template>
  <div class="todos-wrap shadow">
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

    <div
      class="todo-list"
      ref="todoListEl">
      <TodoItem
        v-for="todo in todosStore.filteredTodos"
        :key="todo.id"
        :todo="todo" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.todos-wrap {
  border-radius: 6px;
  overflow: hidden;
}
</style>
