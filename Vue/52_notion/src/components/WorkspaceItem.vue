<template>
  <li>
    <div :style="{ paddingLeft: `${14 * depth}px` }" class="title">
      <span class="material-icons"> play_arrow </span>
      <span class="text">{{ workspace.title }}</span>
      <div class="actions">
        <span class="material-icons"> add </span>
        <span class="material-icons"> delete </span>
      </div>
    </div>
    <ul v-if="hasChildren">
      <WorkspaceItem
        v-for="ws in workspace.documents"
        :key="ws.id"
        :workspace="ws"
        :depth="depth + 1"
      />
    </ul>
  </li>
</template>

<script>
export default {
  props: {
    workspace: {
      type: Object,
      default: () => ({}),
    },
    depth: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    hasChildren() {
      return this.workspace.documents && this.workspace.documents.length;
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  .title {
    display: flex;
    align-items: center;
    height: 30px;
    padding: 0 14px;
    color: rgba($color-font, 0.7);
    &:hover {
      background-color: $color-background--hover1;
      padding-right: 4px;
      .actions {
        display: flex;
      }
    }
    .material-icons {
      font-size: 18px;
      color: $color-icon;
      margin-right: 4px;
      &hover {
        background-color: $color-background--hover2;
      }
    }
    .text {
      flex-grow: 1;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .actions {
      display: none;
      align-items: center;
    }
  }
}
</style>
