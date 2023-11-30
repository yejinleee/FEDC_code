<script setup lang="ts">
(async () => {
  // 즉시실행함수
  const res = await fetch('/api/hello', {
    method: 'POST', //서버리스 함수에 접근할 땐 꼭 POST
  });
  const json = await res.json();
  console.log(json);
})();
</script>

<template>
  <h1>d여긴 Main Page!</h1>
</template>
