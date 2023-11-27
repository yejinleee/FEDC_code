<template>
  <h1>Hello</h1>
  <div>{{ msg }}</div>
  <div>{{ count }}</div>
</template>
<script>
export default {
  computed: {
    msg() {
      return this.$store.state.msg; // main.js에서 store를 plugin으로 등록(app.use(store))했기 때문에 $를 사용할 수 있는 것이다.!
    },
    count() {
      return this.$store.state.count;
    },
  },
};
</script>
<style scoped lang="scss">
h1 {
  color: yellow;
}
</style>
