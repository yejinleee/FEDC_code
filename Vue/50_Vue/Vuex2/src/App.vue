<template>
  <h1>{{ msg }}</h1>
  <h2>{{ storeMsg }} / {{ storeMessage }}</h2>
  <!-- hi from index state msg / hi from message.js -->
  <Hello />
</template>

<script>
import Hello from "~/components/Hello";

export default {
  components: {
    Hello,
  },
  data() {
    return {};
  },
  computed: {
    storeMsg() {
      return this.$store.state.msg; // 전역이었던 state.msg는 바로 접근 가능
    },
    storeMessage() {
      return this.$store.state.message.msg; // 모듈의 경우 state.모듈명.data명
    },
  },
};
</script>
