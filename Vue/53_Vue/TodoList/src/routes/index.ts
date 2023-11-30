import { createRouter, createWebHistory } from 'vue-router';
import MainPage from './MainPage.vue';

export default createRouter({
  history: createWebHistory(), // history 모드 명시
  routes: [
    {
      path: '/',
      component: MainPage,
    },
  ],
});
