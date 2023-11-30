<script setup lang="ts">
import { ref, onMounted } from 'vue';

const inputEl = ref<HTMLInputElement | null>(null); // HTML 검색시 못찾으면 null임

onMounted(() => {
  if (inputEl.value) {
    // 'inputEl.value' is possibly 'null'.ts(18047)방어
    // 하지만, null로 초기화해놓고 null이 아닌 조건이니까 'never' 가 됨
    // Property 'focus' does not exist on type 'never'.ts(2339)
    // 그래서  const inputEl = ref<HTMLInputElement | null>(null); 로 해줘야함
    inputEl.value.focus();
  }
});
</script>

<template>
  <input ref="inputEl" />
</template>
