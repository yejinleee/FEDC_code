<template>
  <h1>{{ msg }}</h1>
  <Hello />
  <button @click="increaseCount">INCREASE!</button>
</template>

<script>
import Hello from "~/components/Hello";

export default {
  components: {
    Hello,
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
  },
};
</script>
