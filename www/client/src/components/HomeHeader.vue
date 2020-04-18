<template>
    <header class="home-header">
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link :to="{ name: 'home' }" class="nav-link">
                            {{ $t('nav.headers.home') }}
                        </router-link>
                    </li>
                </ul>

                <ul class="navbar-nav ml-3">
                    <li class="nav-item">
                        <locale-switcher></locale-switcher>
                    </li>

                    <li class="nav-item" v-if="currentUser.role === roleEnum.Admin">
                        <router-link :to="{ name: 'admin' }" class="nav-link">
                            Admin
                        </router-link>
                    </li>
                    <li class="nav-item dropdown" v-if="currentUser">
                        <a
                            class="nav-link"
                            href="#"
                            id="userDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            {{ currentUser.firstName }} {{ currentUser.lastName }}
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <router-link :to="{ name: 'account' }" class="dropdown-item dropdown-item-action">
                                Account settings
                            </router-link>
                            <a class="dropdown-item dropdown-item-action" v-on:click="logout">Logout</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import LocaleSwitcher from '@/components/LocaleSwitcher.vue';

export default Vue.extend({
    name: 'home-header',
    components: {
        'locale-switcher': LocaleSwitcher,
    },
    computed: mapGetters(['currentUser']),
    inject: ['roleEnum'],
    methods: {
        async logout() {
            this.$cookies.remove('bearer_jwt');
            await this.$router.push({
                name: 'login',
            });
        },
    },
});
</script>

<style lang="scss"></style>
