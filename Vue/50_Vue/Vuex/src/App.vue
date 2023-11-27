<template>
  <h1>{{ msg }}</h1>
  <Hello />
  <button @click="increaseCount">INCREASE!</button>
  <World />
  <button @click="$store.dispatch('fetchTodo')">Update Msg!</button>
</template>

<script>
import Hello from "~/components/Hello";
import World from "~/components/World";

export default {
  components: {
    Hello,
    World,
  },
  data() {
    return {
      msg: "Hello webpack",
    };
  },
  methods: {
    increaseCount() {
      this.$store.commit("increaseCount"); /////!! 이전엔 mutations.increaseCount로 썼었음
    },
    fetchTodo() {
      //action을 실행할 땐 dispatch!
      this.$store.dispatch("fetchTodo");
    },
  },
};
</script>
