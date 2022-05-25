import { createRouter, createWebHistory } from 'vue-router';
import Product from '../views/Product.vue';
import Products from '../views/Products.vue';

const routes = [
  {
    path: '/products',
    name: 'Products',
    component: Products,
  },
  {
    path: '/products#/product/:record_id', // <-- notice the colon
    name: 'Product',
    component: Product,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
