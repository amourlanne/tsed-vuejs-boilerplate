<template>
    <div class="container-fluid mt-4">
        <router-link :to="{ name: 'admin-users-new' }" class="btn btn-primary float-right">
            New User
        </router-link>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.username">
                    <td>
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
                                    <span :class="['badge', getBadgeColor(user.role)]">{{ user.role }}</span>
                                    <span v-if="currentUser.id === user.id">It's you!</span>
                                </div>
                                <div>{{ user.email }}</div>
                            </div>
                        </div>
                    </td>
                    <td class="text-right">
                        <router-link
                            :to="{ name: 'admin-users-edit', params: { username: user.username } }"
                            class="btn btn-primary"
                        >
                            Edit
                        </router-link>
                        <div class="dropdown d-inline-block" v-if="currentUser.id !== user.id">
                            <button
                                class="btn btn-secondary dropdown-toggle ml-2"
                                type="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Actions
                            </button>
                            <div class="dropdown-menu dropdown-menu-right">
                                <a class="dropdown-item" @click="onClickDeleteUser(user.username)" href="#">Delete</a>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';

export default {
    name: 'users',
    inject: ['$adminUserService'],
    data() {
        return {
            users: [],
        };
    },
    computed: mapGetters(['currentUser']),
    beforeMount() {
        this.$adminUserService.getAll().then(users => {
            this.users = users;
        });
    },
    methods: {
        onClickDeleteUser(username) {
            this.$adminUserService.delete(username).then(deletedUser => {
                this.users = this.users.filter(user => user.username !== deletedUser.username);
            });
        },
        getBadgeColor(role) {
            switch (role) {
                case 'admin':
                    return 'badge-success';
            }
            return 'badge-secondary';
        },
    },
};
</script>

<style scoped lang="scss"></style>
