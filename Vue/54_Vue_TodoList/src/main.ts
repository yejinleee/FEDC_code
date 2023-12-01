import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './routes';

import App from './App.vue';
import './main.scss';

const pinia = createPinia();
createApp(App).use(pinia).use(router).mount('#app');
