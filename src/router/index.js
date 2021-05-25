import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';

import Login from '../views/auth/Login.vue';
import GetStarted from '../views/auth/GetStarted.vue';

import IndexArticles from '../views/articles/IndexArticles.vue';
import CreateArticle from '../views/articles/CreateArticle.vue';
import SingleArticle from '../views/articles/SingleArticle.vue';
import QueryArticles from '../views/articles/QueryArticles.vue';

import IndexDashboard from '../views/dashboard/IndexDashboard.vue';

const routes = [
  // Articles routes
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/articles',
    name: 'IndexArticles',
    component: IndexArticles,
  },
  {
    path: '/articles/create',
    name: 'CreateArticle',
    component: CreateArticle,
  },
  {
    path: '/articles/:id',
    name: 'SingleArticle',
    component: SingleArticle,
    props: true,
  },
  {
    path: '/articles/categories/:catId',
    name: 'CategoryArticles',
    component: QueryArticles,
  },
  {
    path: '/articles/users/:userId',
    name: 'UserArticles',
    component: QueryArticles,
  },
  // About route
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  // Auth routes
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
  // Dashboard routes
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
