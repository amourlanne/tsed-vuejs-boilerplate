<template>
    <div class="welcome">
        <h1 v-if="currentUser">Welcome {{ currentUser.firstName }} {{ currentUser.lastName }}</h1>
    </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
export default {
    name: 'welcome',
    computed: mapGetters(['currentUser']),
};
</script>

<style scoped lang="scss">
h1 {
    margin: 40px 0 0;
    text-align: center;
}
</style>
