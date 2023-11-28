<template>
  <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/about">About</RouterLink>
  <RouterLink
    :to="{
      name: 'docsId',
      params: { id: '12' },
      query: { name: 'leon', age: 83 },
    }"
    >DocsId</RouterLink
  >
  <button @click="$router.push('/')">Home</button>
  <button @click="$router.push('/about')">About</button>
  <RouterView />
  <div>이건 App.vue</div>
</template>

<script>
export default {};
</script>
