<script lang="ts">
import { defineComponent } from 'vue'; // TS 설정 위함

export default defineComponent({
  data() {
    return {
      count: 0,
    };
  },
  computed: {
    double: {
      get() {
        return this.count * 2;
      },
      set(newValue: number) {
        this.count = newValue / 2;
      },
    },
  },
  watch: {
    count(newValue, oldValue) {
      console.log(newValue, oldValue);
    },
  },
  methods: {
    increase() {
      this.count += 1;
    },
    assign() {
      this.double = 8;
    },
  },
});
</script>

<template>
  <button @click="increase">INCREASE</button>
  <button @click="assign">assign 8</button>
  <h1>{{ count }}</h1>
  <h1>{{ double }}</h1>
</template>
