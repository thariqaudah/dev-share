import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Login from '../views/auth/Login.vue';
import GetStarted from '../views/auth/GetStarted.vue';
import CreateArticle from '../views/articles/CreateArticle.vue';
import SingleArticle from '../views/articles/SingleArticle.vue';
import IndexDashboard from '../views/dashboard/index.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/get-started',
    name: 'GetStarted',
    component: GetStarted,
  },
  {
    path: '/article/create',
    name: 'CreateArticle',
    component: CreateArticle,
  },
  {
    path: '/article/details/:id',
    name: 'SingleArticle',
    component: SingleArticle,
    props: true,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: IndexDashboard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
