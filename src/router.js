import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import PropertyView from './views/PropertyView.vue';
import { properties } from './data/properties.js';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'home', component: HomeView },
        {
            path: '/properties/:slug',
            name: 'property',
            component: PropertyView,
            props: (route) => ({ slug: route.params.slug }),
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition;
        if (to.hash) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ el: to.hash, behavior: 'smooth' });
                }, 50);
            });
        }
        return { top: 0 };
    },
});

router.beforeEach((to) => {
    if (to.name === 'property') {
        const exists = properties.some((p) => p.slug === to.params.slug);
        if (!exists) return { name: 'home' };
    }
});

export default router;
