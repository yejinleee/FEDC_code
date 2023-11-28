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
