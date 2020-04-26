<template>
    <div class="app-user" v-if="user">
        <Helmet>
            <title>{{ user.firstName }} {{ user.lastName }}</title>
        </Helmet>
        <div class="container mt-5">
            <div class="row">
                <div class="col">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <template v-for="(route, index) in $route.meta.breadcrumb">
                                <li v-if="route.to" class="breadcrumb-item" :key="index">
                                    <router-link :to="route.to">{{ route.name }}</router-link>
                                </li>
                                <li v-else :class="['breadcrumb-item', { active: route.active }]" :key="index">
                                    {{ route.name }}
                                </li>
                            </template>
                        </ol>
                    </nav>
                    <div>
                        <div>{{ user.firstName }} {{ user.lastName }}</div>
                        <div>{{ user.email }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Helmet } from '@jnields/vue-helmet';

export default {
    name: 'user',
    inject: ['$userService'],
    components: { Helmet },
    data() {
        return {
            user: null,
        };
    },
    async beforeMount() {
        const username = this.$route.params.username;
        console.log(this.$route);
        try {
            this.user = await this.$userService.getOneByUsername(username);
        } catch (e) {
            console.log(e);
        }
    },
};
</script>

<style scoped lang="scss"></style>
