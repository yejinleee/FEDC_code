<template>
  <nav ref="nav" :style="{ width: `${navWidth}px` }">
    <div class="header">
      <div class="user-profile"></div>
      Leon's Notion
    </div>
    <ul>
      <WorkspaceItem
        v-for="workspace in workspaces"
        :key="workspace.id"
        :workspace="workspace"
      />
    </ul>
    <div class="actions">
      <div class="action" @click="$store.dispatch('workspace/createWorkspace')">
        <span class="material-icons">add</span>새로운 페이지
      </div>
    </div>
    <div
      ref="resizeHandle"
      class="resize-handle"
      @dblclick="navWidth = 240"
    ></div>
  </nav>
</template>

<script>
import interact from "interactjs";
import WorkspaceItem from "~/components/WorkspaceItem";

export default {
  components: {
    WorkspaceItem,
    WorkspaceItem,
  },
  data() {
    return {
      navWidth: 240,
    };
  },
  computed: {
    workspaces() {
      return this.$store.state.workspace.workspaces;
    },
  },
  created() {
    // 라이프사이클에선 비동기처리 XX
    this.workspacesInit();
  },
  mounted() {
    // HTML과 연결 후에 실행해야하니까 mounted
    this.navInit();
  },
  methods: {
    async workspacesInit() {
      await this.$store.dispatch("workspace/readWorkspaces");
      if (this.$route.fullPath === "/") {
        this.$router.push({
          name: "Workspace",
          params: {
            id: this.$store.staet.workspace.workspaces[0].id,
          },
        });
      }
    },
    navInit() {
      interact(this.$refs.nav)
        .resizable({
          edges: {
            right: this.$refs.resizeHandle, // true로 줄수있는데, 그럼 꼭 경계선 아니어도 작동이되는 이슈! 그래서 확실히 명시
          },
        })
        .on("resizemove", (e) => {
          this.navWidth = e.rect.width;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
// @import "~/scss/_variables";
// @use "sass:color";
nav {
  max-width: 500px;
  min-width: 160px;
  height: 100%;
  background-color: $color-background;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  position: relative;
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
  ul {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .actions {
    .action {
      height: 45px;
      display: flex;
      align-items: center;
      padding: 0 14px;
      color: $color-icon;
      cursor: pointer;
      &:hover {
        background-color: $color-background--hover1;
      }
      .material-icons {
        margin-right: 4px;
        color: $color-icon;
      }
    }
  }
  .resize-handle {
    width: 4px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    cursor: col-resize;
    transition: 0.4s;
    &:hover {
      background-color: $color-border;
    }
  }
}
</style>
