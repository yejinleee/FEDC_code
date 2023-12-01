<script setup lang="ts">
import dayjs from 'dayjs';
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTodosStore } from '~/store/todos';
import TheIcon from '~/components/TheIcon.vue';
import TheBtn from '~/components/TheBtn.vue';

const todosStore = useTodosStore();
const route = useRoute();
const router = useRouter();

const editorEl = ref<HTMLDivElement | null>(null);

const foundTodo = todosStore.todos.find((todo) => todo.id === route.params.id);
foundTodo ? (todosStore.currentTodo = { ...foundTodo }) : router.push('/');

onMounted(() => {
  editorEl.value?.focus(); // 선택적속성 `?` 붙임. null이 아닐때만 실행하도록함(일종의 타입가드)
  window.addEventListener('keydown', escKeyHandler);
});
onUnmounted(() => {
  // 현재 컴포넌트가 연결 해제시, 이벤트리스너도 제거
  window.removeEventListener('keydown', escKeyHandler);
});

function escKeyHandler(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    offModal();
  }
}
function toggleDone() {
  todosStore.currentTodo.done = !todosStore.currentTodo.done;
}
function onChange() {
  const title = editorEl.value?.textContent;
  if (title && title.trim()) {
    todosStore.currentTodo.title = title;
  }
}
function offModal() {
  router.push('/');
}
async function deleteTodo() {
  await todosStore.deleteTodo({
    id: todosStore.currentTodo.id,
  });
  offModal();
}
async function updateTodo() {
  await todosStore.updateTodo({
    ...todosStore.currentTodo,
  });
  offModal();
}

function formatDate(date: string) {
  return dayjs(date).format('YYYY년 M월 D일 H시 m분');
}
</script>

<template>
  <div class="modal">
    <div
      class="background"
      @click="offModal"></div>
    <div class="contents">
      <div class="todo-head">
        <TheIcon
          :active="todosStore.currentTodo.done"
          @click="toggleDone">
          check
        </TheIcon>
        <div class="btn-group">
          <TheBtn @click="offModal">취소</TheBtn>
          <TheBtn @click="deleteTodo">삭제</TheBtn>
          <TheBtn @click="updateTodo">저장</TheBtn>
        </div>
      </div>
      <div class="date-group">
        <div class="date">
          생성일: {{ formatDate(todosStore.currentTodo.createdAt) }}
        </div>
        <div
          class="date"
          v-if="
            todosStore.currentTodo.createdAt !==
            todosStore.currentTodo.updatedAt
          ">
          수정일: {{ formatDate(todosStore.currentTodo.updatedAt) }}
        </div>
      </div>
      <div
        ref="editorEl"
        class="editor"
        contenteditable
        @blur="onChange"
        @keydown.enter.prevent="onChange(), updateTodo()"
        v-text="todosStore.currentTodo.title"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(#000, 0.7);
  }
  .contents {
    position: relative;
    width: 100%;
    max-width: 700px;
    height: 300px;
    max-height: calc(100vh - 40px);
    overflow: auto;
    border-radius: 6px;
    background-color: white;
    margin: 0 20px;
    .date-group {
      padding: 30px 30px 0 30px;
      .date {
        color: #ddd;
        font-size: 14px;
        line-height: 1.4;
      }
    }
    .editor {
      padding: 30px;
      line-height: 1.5;
      outline: none;
    }
  }
}
</style>
