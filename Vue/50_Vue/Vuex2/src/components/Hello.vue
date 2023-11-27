<template>
  <h1>Hello.vue</h1>
  <div>{{ count }}</div>
  <button @click="increaseCount">+</button>
  <button @click="decreaseCount">-</button>
  <div>{{ msg }} // {{ reversedMsg }}</div>
  <!-- hi from message.js // sj.egassem morf ih -->
  <button @click="fetchTodo">Fetch Todo</button>
  <div>전역데이터인 msg : {{ msg }}</div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  computed: {
    // mapState()가 실행되고 난 결과를 전개한다는 뜻 mapState(모듈명, [사용할상태들이름들])
    ...mapState(["msg"]), // 모듈아니고 전역일때는 이렇게!

    ...mapState("count", ["count"]),
    // count() {
    //   return this.$store.state.count.count;
    // },
    ...mapState("message", ["msg"]),
    // msg() {
    //   return this.$store.state.message.msg;
    // },
    ...mapState("message", ["reversedMsg"]),
    // reversedMsg() {
    //   return this.$store.getters["message/reversedMsg"]; // getters 값에 대해선 이렇게..!
    // },
  },
  methods: {
    ...mapMutations("count", ["increaseCount", "decreaseCount"]),
    // increaseCount() {
    //   this.$store.commit("count/increaseCount"); //   모듈명/변이메소드명
    // },
    // decreaseCount() {
    //   this.$store.commit("count/decreaseCount");
    // },
    ...mapActions("message", ["fetchTodo"]),
    // fetchTodo() {
    //   this.$store.dispatch("message/fetchTodo"); // action메소드 실행엔 dispatch!
    // },
  },
};
</script>
<style scoped lang="scss">
h1 {
  color: yellow;
}
</style>
