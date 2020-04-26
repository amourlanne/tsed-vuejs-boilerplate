<template>
    <div class="users">
        <div class="container mt-5">
            <div class="row">
                <div class="col">
                    <table class="table table-hover">
                        <tbody>
                            <tr v-for="user in users" :key="user.username">
                                <router-link :to="{ name: 'user', params: { username: user.username } }" tag="td">
                                    <div class="d-flex align-items-center">
                                        <img
                                            :src="
                                                (user.avatar && user.avatar.path) ||
                                                    'https://secure.gravatar.com/avatar/2615a3a7473379de6863858e0ec7b32a?s=800&d=identicon'
                                            "
                                            :alt="user.username"
                                            style="width: 42px; height: 42px;"
                                            class="rounded-circle img-fluid"
                                        />
                                        <div class="ml-2">
                                            <div>
                                                {{ user.firstName }} {{ user.lastName }}
                                                <span v-if="currentUser.id === user.id">It's you!</span>
                                            </div>
                                            <div>{{ user.email }}</div>
                                        </div>
                                    </div>
                                </router-link>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';

export default {
    name: 'users',
    inject: ['$userService'],
    computed: mapGetters(['currentUser']),
    data() {
        return {
            users: [],
        };
    },
    async beforeMount() {
        try {
            this.users = await this.$userService.getUsers();
        } catch (e) {
            // console.log(e);
        }
    },
    methods: {},
};
</script>

<style scoped lang="scss"></style>
