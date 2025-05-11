import { createRouter, createWebHistory } from 'vue-router';
import login from '../components/KeyLogin.vue';
import viewer from '../components/Viewer.vue';
const routes = [
    {
        path: '/',
        name: 'Home',
        component: login
    },
    {
        path: '/view',
        name: 'viewer',
        component: viewer
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
