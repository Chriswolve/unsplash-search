import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/tag/:tag', name: 'Tag', component: HomeView, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
