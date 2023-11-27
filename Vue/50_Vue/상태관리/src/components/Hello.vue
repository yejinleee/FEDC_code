<div @click="count += 1">{{ count }}</div>
<template>
  <h1>Hello.vue</h1>
  <div>{{ msg }}</div>
  <div @click="increaseCount">{{ count }}</div>
  <button @click="fetchTodo">Get Todo!</button>
</template>
<script>
import { state, mutations, actions } from "~/store"; //경로면, .js, index 생략가능

export default {
  data() {
    return state;
  },
  methods: {
    increaseCount: mutations.increaseCount,
    fetchTodo: actions.fetchTodo,
  },
};
</script>
<style scoped lang="scss">
h1 {
  color: yellow;
}
</style>
