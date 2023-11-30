<script lang="ts">
import { defineComponent } from 'vue';
import CompositionAPI from './components/CompositionAPI.vue';

export default defineComponent({
  components: {
    CompositionAPI,
  },
  data() {
    return {
      title: '',
    };
  },
});
</script>

<template>
  <CompositionAPI
    v-model="title"
    name="happy"
    active />
  <h1>{{ title }}</h1>
</template>

<!--OptionsAPI-->

<!-- <script lang="ts">
import { defineComponent } from 'vue';
import OptionsAPI from './components/OptionsAPI.vue';

export default defineComponent({
  components: {
    OptionsAPI,
  },
  data() {
    return {
      title: '',
    };
  },
});
</script>

<template>
  <OptionsAPI
    v-model="title"
    name="happy"
    active />
  <h1>{{ title }}</h1>
</template> -->
