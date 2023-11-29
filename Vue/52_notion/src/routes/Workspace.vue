<template>
  <section>
    <div class="inner">
      <div
        class="title"
        ref="title"
        placeholder="제목 없음"
        contenteditable
        @input="onInput"
      >
        {{ title }}
      </div>
      <div
        class="content"
        ref="content"
        placeholder="내용을 입력하세요!"
        contenteditable
        @input="onInput"
        v-html="content"
      ></div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    title() {
      return this.$store.state.workspace.currentWorkspace.title;
    },
    content() {
      return this.$store.state.workspace.currentWorkspace.content;
    },
  },
  created() {
    this.$store.dispatch("workspace/readWorkspace", {
      id: this.$route.params.id,
    });
  },
  methods: {
    onInput() {
      if (!this.$refs.content.textContent.trim()) {
        // dispatch 전에 다 비었는지확인. 다비었을때 <br>이 남아있는 이슈 확인. textContent로 해야 <br>대신 ' '로 인식
        this.$refs.content.innerHTML = "";
      }
      this.$store.dispatch("workspace/updateWorkspace", {
        id: this.$route.params.id,
        title: this.$refs.title.textContent,
        content: this.$refs.content.innerHTML,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  padding: 100px 0 200px;
  .inner {
    max-width: 700px;
    margin: 0 auto; // 가운데 정렬
    padding: 0 20px;
    [contenteditable] {
      outline: none;
      cursor: text;
      &.title {
        font-size: 44px;
        font-weight: 700;
        margin-bottom: 20px;
      }
      &.content {
        font-size: 16px;
        line-height: 1.8;
      }
      &:empty::before {
        content: attr(
          placeholder
        ); // 속성값에 접근하는 attr(). class 등 속성을 넣을 수 있다.
        color: rgba($color-font, 0.3);
      }
    }
  }
}
</style>
