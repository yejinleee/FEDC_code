<script lang="ts">
import { defineComponent } from 'vue'; // TS 설정 위함

export default defineComponent({
  data() {
    return {
      count: 0,
    };
  },
  created() {
    console.log('Created!');
  },
  mounted() {
    console.log('mounted!');
  },
  methods: {
    increase() {
      this.count += 1;
    },
  },
});
</script>

<template>
  <h1 @click="increase">{{ count }}</h1>
</template>
