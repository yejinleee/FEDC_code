<template>
  <nav>
    <div class="header">
      <div class="user-profile"></div>
      Leon's Notion
    </div>
    <ul>
      <li v-for="workspace in workspaces" :key="workspace.id">
        {{ workspace.title }}
      </li>
    </ul>
    <div class="actions"></div>
  </nav>
</template>

<script>
export default {
  computed: {
    workspaces() {
      return this.$store.state.workspace.workspaces;
    },
  },
  created() {
    this.$store.dispatch("workspace/readWorkspaces");
  },
};
</script>

<style lang="scss" scoped>
// @import "~/scss/_variables";
// @use "sass:color";
nav {
  width: 240px;
  height: 100%;
  background-color: $color-background;
  .header {
    padding: 14px;
    font-weight: 700;
    display: flex;
    align-items: center;
    .user-profile {
      width: 20px;
      height: 20px;
      border-radius: 4px;
      margin-right: 10px;
      background-image: url("https://avatars.githubusercontent.com/u/81412212?v=4");
      background-size: cover;
    }
  }
}
</style>
