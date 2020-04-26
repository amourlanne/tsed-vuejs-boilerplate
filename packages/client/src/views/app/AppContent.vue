<template>
    <div class="home">
        <helmet defaultTitle="Home" titleTemplate="Home | %s"> </helmet>
        <app-header></app-header>
        <router-view />
    </div>
</template>

<script>
import Vue from 'vue';
import AppHeader from '../../components/AppHeader';
import { Helmet } from '@jnields/vue-helmet';

export default Vue.extend({
    name: 'app-content',
    components: {
        'app-header': AppHeader,
        helmet: Helmet,
    },
});
</script>

<style scoped></style>
