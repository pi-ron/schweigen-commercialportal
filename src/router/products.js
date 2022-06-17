import { createRouter, createWebHashHistory } from 'vue-router';
import Product from '../views/Product.vue';
// import Productv2 from '../views/Productv2.vue';
import Products from '../views/Products.vue';

const routes = [
  {
    path: '/',
    name: 'Products',
    component: Products,
  },
  {
    path: '/product/:model', // <-- notice the colon
    name: 'Product',
    component: Product,
    props: true,
  },
  // {
  //   path: '/productv2/:model', // <-- notice the colon
  //   name: 'Productv2',
  //   component: Productv2,
  //   props: true,
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
