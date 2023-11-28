<template>
  <RouterLink to="/">Home..</RouterLink>
  <RouterLink to="/about">About..</RouterLink>
  <button @click="logIn">LOG IN!</button>
  <button @click="logOut">LOG OUT!</button>
  <RouterView />
</template>

<script>
export default {
  methods: {
    logIn() {
      this.$router.push("/login");
    },
    logOut() {
      this.$store.dispatch("user/logOut");
    },
  },
};
</script>
