import { createApp } from 'vue'
import './style.css'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'
const pinia = createPinia()

// Import the newly created store
import { useKeyStore } from './store';

const app = createApp(App);

// Register Pinia, ArcoVue, and Router
app.use(pinia)
    .use(ArcoVue)
    .use(router)
    .mount('#app');

// Optionally, you can access and modify the store here if needed
const keyStore = useKeyStore();
if(keyStore.key === '' || keyStore.key === undefined|| keyStore.key === null || keyStore.key === 'null'){
    keyStore.setKey(null);
}
console.log(keyStore.key); // Accessing the stored key