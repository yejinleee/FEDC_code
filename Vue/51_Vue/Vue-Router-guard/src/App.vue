<template>
  <RouterLink to="/">Home..</RouterLink>
  <RouterLink to="/about">About..</RouterLink>
  <button v-if="!isLoggedIn" @click="logIn">LOG IN!</button>
  <button v-else @click="logOut">LOG OUT!</button>
  <RouterView />
</template>

<script>
export default {
  created() {
    // 페이지 처음 시작할떄 동작하게 하기 위해 created 생명주기에서 실행
    this.$store.dispatch("user/initialize");
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.user.isLoggedIn;
    },
  },
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
