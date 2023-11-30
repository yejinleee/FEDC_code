<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  mounted() {
    if (this.$refs.inputEl) {
      // Object is of type 'unknown'.ts(2571)방어
      (this.$refs.inputEl as HTMLInputElement).focus();
    }
  },
});
</script>

<template>
  <input ref="inputEl" />
</template>
