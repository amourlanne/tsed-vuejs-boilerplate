import Vue from 'vue';
import VueRouter from 'vue-router';

import i18n from '@/packages/vue-i18n';

import PageNotFound from '@/views/PageNotFound.vue';

import store from '@/store';
import authAPIService from '@/services/api/AuthAPIService';
import RoleEnum from '@/enums/RoleEnum';

Vue.use(VueRouter);

function hasAuthCookie() {
    return !!window.$cookies.get('bearer_jwt');
}

const routes = [
    {
        path: '/',
        component: () => import('@/views/app/AppContent.vue'),
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('@/views/app/Welcome.vue'),
            },
            {
                path: 'users',
                component: {
                    render: c => c('router-view'),
                },
                children: [
                    {
                        path: "",
                        name: "users",
                        component: () => import("@/views/app/users/Users.vue"),
                    },
                    {
                        path: ":username",
                        name: "user",
                        component: () => import("@/views/app/users/User.vue"),
                        meta: {
                            breadcrumb: [
                                { name: 'users', to: { name: "users" } },
                                { name: 'user', active: true }
                            ],
                        }
                    },
                ]
            },
            {
                path: 'account',
                name: 'account',
                component: () => import('@/views/app/account/Account.vue'),
            },
            {
                path: 'admin',
                component: () => import('@/views/app/admin/Admin.vue'),
                meta: {
                    rolesAllowed: [RoleEnum.Admin],
                },
                children: [
                    {
                        path: '',
                        redirect: {
                            name: 'admin-users',
                        },
                        name: 'admin',
                    },
                    {
                        path: 'users',
                        component: {
                            render: c => c('router-view'),
                        },
                        children: [
                            {
                                path: '',
                                name: 'admin-users',
                                component: () => import('@/views/app/admin/users/Users.vue'),
                            },
                            {
                                path: 'new',
                                name: 'admin-users-new',
                                component: () => import('@/views/app/admin/users/NewUser.vue'),
                            },
                            {
                                path: ':username/edit',
                                name: 'admin-users-edit',
                                component: () => import('@/views/app/admin/users/EditUser.vue'),
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: 'login',
        name: 'login',
        component: () => import('../views/Login.vue'),
        meta: {
            offlineMode: true,
        },
    },
    {
        name: 'page-not-found',
        path: 'page-not-found',
        alias: '*',
        component: PageNotFound,
    },
    {
        path: '*',
        redirect: { name: 'page-not-found' },
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/:locale(' + i18n.availableLocales.join('|') + ')?',
            component: {
                render: c => c('router-view'),
            },
            children: routes,
        },
    ],
});

router.beforeEach(async (to, from, next) => {
    if (from.name && !to.params.locale && i18n.locale !== i18n.fallbackLocale) {
        to.params.locale = from.params.locale;
        return next(to);
    }

    if (to.params.locale === i18n.fallbackLocale) {
        delete to.params.locale;
        return next({ ...to, replace: true });
    }

    if (to.params.locale && i18n.locale !== to.params.locale) {
        i18n.locale = to.params.locale;
    }

    return next();
});

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!hasAuthCookie()) {
            return next({ name: 'login', params: to.params });
        }
    }

    // TODO: move in home component
    if (hasAuthCookie() && !store.getters.currentUser) {
        try {
            const user = await authAPIService.account();
            store.commit('setCurrentUser', user);
        } catch (e) {
            window.$cookies.remove('bearer_jwt');
            return next({
                name: 'login',
                params: to.params,
            });
        }
    }

    if (
        to.matched.find(record => {
            if (record.meta.rolesAllowed && record.meta.rolesAllowed.length) {
                if (!record.meta.rolesAllowed.includes(store.state.currentUser.role)) {
                    return true;
                }
            }
            return false;
        })
    ) {
        return next({
            name: 'page-not-found',
            params: to.params,
            replace: true,
        });
    }

    return next();
});

export default router;
