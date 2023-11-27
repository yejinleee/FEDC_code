<template>
  <h1>Hello.vue</h1>
  <div>{{ count }}</div>
  <button @click="increaseCount">+</button>
  <button @click="decreaseCount">-</button>
  <div>{{ msg }} // {{ reversedMsg }}</div>
  <!-- hi from message.js // sj.egassem morf ih -->
  <button @click="fetchTodo">Fetch Todo</button>
</template>
<script>
export default {
  computed: {
    count() {
      return this.$store.state.count.count;
    },
    msg() {
      return this.$store.state.message.msg;
    },
    reversedMsg() {
      return this.$store.getters["message/reversedMsg"]; // getters 값에 대해선 이렇게..!
    },
  },
  methods: {
    increaseCount() {
      this.$store.commit("count/increaseCount"); //   모듈명/변이메소드명
    },
    decreaseCount() {
      this.$store.commit("count/decreaseCount");
    },
    fetchTodo() {
      this.$store.dispatch("message/fetchTodo"); // action메소드 실행엔 dispatch!
    },
  },
};
</script>
<style scoped lang="scss">
h1 {
  color: yellow;
}
</style>
