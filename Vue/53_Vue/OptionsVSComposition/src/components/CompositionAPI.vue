<script setup lang="ts">
import { useAttrs } from 'vue';
const attrs = useAttrs();

defineOptions({
  inheritAttrs: false,
});
const props = withDefaults(
  defineProps<{
    modelValue: string;
    name?: string;
    active?: boolean;
  }>(),
  {
    name: '',
    active: false,
  },
);
const emit = defineEmits(['update:modelValue']);

console.log(props.name, props.active);
console.log(attrs);
function inputHandler(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
} // this로 접근 XX defineEmits 반환 결과로 emit을 받아야함
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
