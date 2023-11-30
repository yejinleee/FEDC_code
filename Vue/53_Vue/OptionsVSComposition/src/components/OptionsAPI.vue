<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: '', // 선택속성이 됨
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  created() {
    console.log(this.$props.name, this.$props.active);
    // props의 경우 this에도 바인딩이 되기 떄문에 중간에 $props 생략해도됨!!ㅇㅁㅇ
  },
  methods: {
    inputHandler(event: Event) {
      this.$emit('update:modelValue', (event.target as HTMLInputElement).value);
    },
  },
});
</script>

<template>
  <label :class="{ active }">
    {{ name }}
    <input
      v-bind="$attrs"
      :value="modelValue"
      @input="inputHandler" />
  </label>
</template>

<style scoped>
.active {
  color: red;
}
</style>
