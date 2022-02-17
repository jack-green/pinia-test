import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import formStorePlugin from './store/formStorePlugin';

const app = createApp(App);

const pinia = createPinia();
pinia.use(formStorePlugin);

app.use(pinia);

app.mount('#app');
