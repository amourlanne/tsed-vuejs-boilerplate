<template>
    <helmet-provider>
        <div id="app">
            <helmet defaultTitle="Vue.js" titleTemplate="Vue.js - %s">
                <html :lang="$i18n.locale"></html>
            </helmet>
            <router-view />
        </div>
    </helmet-provider>
</template>

<script>
import 'bootstrap';

import { Helmet, HelmetProvider } from '@jnields/vue-helmet';
import authAPIService from './services/api/AuthAPIService';
import accountService from './services/api/AccountService';
import userService from './services/api/UserService';
import adminUserService from './services/api/AdminUserService';
import RequestStatusEnum from './enums/RequestStatusEnum';
import RoleEnum from './enums/RoleEnum';
import GenderEnum from './enums/GenderEnum';

export default {
    name: 'app',
    components: {
        'helmet-provider': HelmetProvider,
        helmet: Helmet,
    },
    provide() {
        return {
            $authAPIService: authAPIService,
            $accountService: accountService,
            $userService: userService,
            $adminUserService: adminUserService,
            requestStatusEnum: RequestStatusEnum,
            roleEnum: RoleEnum,
            genderEnum: GenderEnum,
        };
    },
};
</script>

<style lang="scss">
@import '~bootstrap/scss/bootstrap';

a.nav-link.dropdown-toggle {
    cursor: pointer;
}

form {
    .form-error {
        display: none;
    }

    .form-group-error {
        .form-error {
            display: block;
        }
    }

    .dropdown-item-action {
        cursor: pointer;
    }
}

.cursor-pointer {
    cursor: pointer;
}
</style>
