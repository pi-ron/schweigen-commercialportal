import { createRouter, createWebHashHistory } from 'vue-router';
import Downloads from '../views/Downloads.vue';

const routes = [
  {
    path: '/',
    name: 'Downloads',
    component: Downloads,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
