import { createApp } from 'vue';
import axios from 'axios';
import mitt from 'mitt';
import App from './App.vue';
import productsRouter from './router/products';
import downloadsRouter from './router/downloads';
import store from './store';
import './assets/css/sch-commercialportal-font.css';
import './assets/css/schweigen-commercial-webflow.css';

const emitter = mitt();

const productsApp = createApp(App);
productsApp.use(productsRouter);
productsApp.config.globalProperties.table = 'Catalogue';
productsApp.config.globalProperties.recordsName = 'products';
productsApp.config.globalProperties.store = store;
productsApp.config.globalProperties.emitter = emitter;
productsApp.config.globalProperties.axios = axios;
productsApp.mount('#products');

const downloadsApp = createApp(App);
downloadsApp.use(downloadsRouter);
downloadsApp.config.globalProperties.table = 'Downloads';
downloadsApp.config.globalProperties.recordsName = 'downloads';
downloadsApp.config.globalProperties.store = store;
downloadsApp.config.globalProperties.emitter = emitter;
downloadsApp.config.globalProperties.axios = axios;
downloadsApp.mount('#downloads');
