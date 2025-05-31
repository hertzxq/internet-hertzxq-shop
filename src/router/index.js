import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../components/MainPage.vue';
import Catalog from '../components/Catalog.vue';
import AboutUs from '../components/AboutUs.vue';
import Contacts from '../components/Contacts.vue';
import Cart from '../components/Cart.vue';

const routes = [
    { path: '/', component: MainPage },
    { path: '/catalog', component: Catalog },
    { path: '/aboutUs', component: AboutUs },
    { path: '/contacts', component: Contacts },
    { path: '/cart', component: Cart },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;