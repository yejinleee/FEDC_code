import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';

const pinia = createPinia();
// pinia.use() // pinia 전용 플러그인 사용도 가능

createApp(App).use(pinia).mount('#app');
