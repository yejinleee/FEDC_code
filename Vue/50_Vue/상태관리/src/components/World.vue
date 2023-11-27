<template>
  <h1>World.vue</h1>
  <div>{{ reversedMsg }}</div>
  <div @click="decreaseCount">{{ count }}</div>
</template>
<script>
import { state, mutations, getters } from "~/store";

export default {
  data() {
    return state;
  },
  methods: {
    decreaseCount: mutations.decreaseCount,
  },
  computed: {
    reversedMsg: getters.reversedMsg, // 여기서reversedMsg메소드 활용
  },
};
</script>
