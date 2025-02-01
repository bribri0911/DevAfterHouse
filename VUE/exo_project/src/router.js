import { createRouter, createWebHistory } from 'vue-router';
import Accueil from './vieuws/PageAcceuil.vue';
import APropos from './vieuws/APropos.vue';

const routes = [
  {
    path: '/',
    name: 'PageAcceuil',
    component: Accueil,
  },
  {
    path: '/a-propos',
    name: 'APropos',
    component: APropos,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
