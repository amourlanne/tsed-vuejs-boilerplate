<template>
    <div class="app-login">
        <div class="container">
            <div class="row">
                <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div class="my-5">
                        <locale-switcher></locale-switcher>
                        <h4 class="card-title text-center mb-4 mt-1">Log in</h4>
                    </div>
                    <div class="card  my-5">
                        <div class="card-body">
                            <p class="text-success text-center" v-if="submitStatus === requestStatusEnum.SUCCESS">
                                Thanks for your submission!
                            </p>
                            <!--    <p v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>-->
                            <p class="text-danger text-center" v-if="submitStatus === requestStatusEnum.ERROR">
                                {{ errorMessage }}
                            </p>
                            <p class="text-primary text-center" v-if="submitStatus === requestStatusEnum.PENDING">
                                Sending...
                            </p>
                            <form @submit.prevent="submit">
                                <div :class="['form-group', { 'form-group-error': $v.username.$error }]">
                                    <label>Username or Email</label>
                                    <div class="input-group">
                                        <input
                                            :class="['form-control', { 'is-invalid': $v.username.$error }]"
                                            name=""
                                            placeholder="Username or email"
                                            type="text"
                                            v-model.trim="$v.username.$model"
                                        />
                                    </div>
                                    <small class="form-error form-text text-danger" v-if="!$v.username.required">
                                        {{ $t('form.validation.required') }}
                                    </small>
                                    <small class="form-error form-text text-danger" v-if="!$v.username.minLength">
                                        username must have at least
                                        {{ $v.username.$params.minLength.min }} letters.
                                    </small>
                                </div>
                                <div :class="['form-group', { 'form-group-error': $v.password.$error }]">
                                    <label>Password</label>
                                    <div class="input-group">
                                        <input
                                            :class="['form-control', { 'is-invalid': $v.password.$error }]"
                                            placeholder="Password"
                                            type="password"
                                            v-model.trim="$v.password.$model"
                                        />
                                    </div>
                                    <small class="form-error form-text text-danger" v-if="!$v.password.required"
                                        >{{ $t('form.validation.required') }}
                                    </small>
                                </div>
                                <div class="form-check mb-3">
                                    <input type="checkbox" class="form-check-input" v-model="rememberMe" />
                                    <label class="form-check-label">Remember me</label>
                                </div>
                                <div class="form-group mt-5">
                                    <button
                                        type="submit"
                                        class="btn btn-primary btn-block"
                                        :disabled="submitStatus === requestStatusEnum.PENDING"
                                    >
                                        Log in
                                        <span
                                            v-if="submitStatus === requestStatusEnum.PENDING"
                                            class="spinner-border spinner-border-sm"
                                            role="status"
                                            aria-hidden="true"
                                        >
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators';
import LocaleSwitcher from '../components/LocaleSwitcher';
import { mapMutations } from 'vuex';

export default {
    name: 'login',
    components: {
        'locale-switcher': LocaleSwitcher,
    },
    inject: ['$authAPIService', 'requestStatusEnum'],
    data() {
        return {
            username: '',
            password: '',
            rememberMe: false,
            submitStatus: null,
            errorMessage: null,
        };
    },
    validations: {
        username: {
            required,
            minLength: minLength(4),
        },
        password: {
            required,
        },
    },
    methods: {
        ...mapMutations(['setCurrentUser']),
        async submit() {
            this.$v.$touch();
            this.errorMessage = null;
            if (!this.$v.$invalid) {
                try {
                    this.submitStatus = this.requestStatusEnum.PENDING;

                    const user = await this.$authAPIService.login(this.username, this.password, this.rememberMe);

                    this.submitStatus = this.requestStatusEnum.SUCCESS;
                    this.setCurrentUser(user);
                    await this.$router.push(
                        this.$store.state.redirectUrl || {
                            name: 'home',
                        },
                    );
                } catch (error) {
                    this.submitStatus = this.requestStatusEnum.ERROR;
                    if (error) {
                        this.errorMessage = error.message;
                    }
                }
            }
        },
    },
};
</script>

<style scoped></style>
