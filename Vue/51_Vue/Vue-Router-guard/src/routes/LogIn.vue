<template>
  <form @submit.prevent>
    <input v-model="userID" type="text" />
    <input v-model="userPW" type="password" />
    <button @click="logIn">LOG IN!</button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      userID: "",
      userPW: "",
    };
  },
  methods: {
    logIn() {
      this.$store.dispatch("user/logIn", {
        id: this.userID,
        pw: this.userPW,
      });
    },
  },
};
</script>
