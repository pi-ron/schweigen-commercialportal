import { createRouter, createWebHashHistory } from 'vue-router';
import Product from '../views/Product.vue';
import Products from '../views/Products.vue';

const routes = [
  {
    path: '/',
    name: 'Products',
    component: Products,
  },
  {
    path: '/product/:record_id', // <-- notice the colon
    name: 'Product',
    component: Product,
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;