<template>
    <div class="home">
        <helmet defaultTitle="Home" titleTemplate="Home | %s"> </helmet>
        <home-header></home-header>
        <router-view />
    </div>
</template>

<script>
import Vue from 'vue';
import HomeHeader from '../components/HomeHeader';
import { Helmet } from '@jnields/vue-helmet';

export default Vue.extend({
    name: 'home',
    components: {
        'home-header': HomeHeader,
        helmet: Helmet,
    },
});
</script>

<style scoped></style>
