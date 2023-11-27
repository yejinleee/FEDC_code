<template>
  <div v-if="!isEdit">
    {{ msg }}
    <button @click="onEdit">Edit !</button>
  </div>
  <div v-if="isEdit">
    <input ref="editor" v-model="msg" @keyup.enter="onEdit" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEdit: false,
      msg: "hello",
    };
  },
  methods: {
    onEdit() {
      this.isEdit = !this.isEdit;

      this.$nextTick(() => {
        //// setTimeout(() => { 와 같은 역할이다
        this.$refs.editor.focus();
      }); // 기본값은 0이라 생략가능. 0초후 발생이기 보단 콜스택 이후
    },
  },
};
</script>
