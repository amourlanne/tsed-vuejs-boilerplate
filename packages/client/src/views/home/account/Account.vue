<template>
    <div class="account">
        <helmet>
            <title>Account</title>
        </helmet>
        <div class="container pt-5">
            <div class="row mb-5">
                <div class="col-3">
                    <div>Profile</div>
                    <small>Your email address is your identity on vuejust and is used to log in.</small>
                </div>
                <div class="col">
                    <form @submit.prevent="submitProfile">
                        <div
                            class="alert alert-danger"
                            role="alert"
                            v-if="profileSubmitStatus === requestStatusEnum.ERROR"
                        >
                            {{ profileErrorMessage }}
                        </div>
                        <div
                            class="alert alert-success"
                            role="alert"
                            v-if="profileSubmitStatus === requestStatusEnum.SUCCESS"
                        >
                            Profile successfully updated !
                        </div>
                        <div class="form-row mb-5">
                            <div class="col-3 mr-5">
                                <img
                                    :src="avatarUrl || defaultAvatarUrl"
                                    style="width: 180px; height: 180px;"
                                    class="rounded-circle img-fluid"
                                />
                            </div>
                            <div class="col-5">
                                <label>Upload new avatar</label>
                                <div class="custom-file mb-2">
                                    <input
                                        type="file"
                                        class="custom-file-input"
                                        ref="avatar"
                                        id="avatar"
                                        name="avatar"
                                        v-on:change="handleFileUpload"
                                    />
                                    <label class="custom-file-label" for="avatar">Choose file</label>
                                </div>
                                <div>The maximum file size allowed is 200KB.</div>
                                <hr />
                                <button type="button" class="btn btn-outline-danger" :disabled="avatarUrl === null" v-on:click="onClickRemoveAvatar">
                                    Remove avatar
                                </button>
                            </div>
                        </div>
                        <hr />
                        <div class="form-row">
                            <div class="col-8">
                                <div class="form-row">
                                    <div
                                        :class="['col-md-6 mb-3', { 'form-group-error': $v.profile.firstName.$error }]"
                                    >
                                        <label for="firstName">First name</label>
                                        <input
                                            name="firstName"
                                            id="firstName"
                                            :class="{ 'form-control': true, 'is-invalid': $v.profile.firstName.$error }"
                                            placeholder="Firstname"
                                            type="text"
                                            v-model.trim="$v.profile.firstName.$model"
                                        />
                                        <small
                                            class="form-error form-text text-danger"
                                            v-if="!$v.profile.firstName.required"
                                        >
                                            {{ $t('form.validation.required') }}
                                        </small>
                                    </div>
                                    <div
                                        :class="{
                                            'col-md-6 mb-3': true,
                                            'form-group-error': $v.profile.lastName.$error,
                                        }"
                                    >
                                        <label for="lastName">Last name</label>
                                        <input
                                            name="lastName"
                                            id="lastName"
                                            :class="{ 'form-control': true, 'is-invalid': $v.profile.lastName.$error }"
                                            placeholder="Last Name"
                                            type="text"
                                            v-model.trim="$v.profile.lastName.$model"
                                        />
                                        <small
                                            class="form-error form-text text-danger"
                                            v-if="!$v.profile.lastName.required"
                                        >
                                            {{ $t('form.validation.required') }}
                                        </small>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div :class="{ 'col mb-3': true, 'form-group-error': $v.profile.email.$error }">
                                        <label for="email">Email Address</label>
                                        <input
                                            name="email"
                                            id="email"
                                            :class="{ 'form-control': true, 'is-invalid': $v.profile.email.$error }"
                                            placeholder="Your email address"
                                            type="email"
                                            v-model.trim="$v.profile.email.$model"
                                        />
                                        <small
                                            class="form-error form-text text-danger"
                                            v-if="!$v.profile.email.required"
                                        >
                                            {{ $t('form.validation.required') }}
                                        </small>
                                        <small class="form-error form-text text-danger" v-if="!$v.profile.email.email">
                                            {{ $t('form.validation.email') }}
                                        </small>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div :class="{ 'col mb-3': true, 'form-group-error': $v.profile.username.$error }">
                                        <label for="username">Username</label>
                                        <input
                                            name="username"
                                            id="username"
                                            :class="{ 'form-control': true, 'is-invalid': $v.profile.username.$error }"
                                            placeholder="Username"
                                            type="text"
                                            v-model.trim="$v.profile.username.$model"
                                        />
                                        <small
                                            class="form-error form-text text-danger"
                                            v-if="!$v.profile.username.required"
                                        >
                                            {{ $t('form.validation.required') }}
                                        </small>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div :class="['col-md-6 mb-3', { 'form-group-error': $v.profile.gender.$error }]">
                                        <label for="gender">Gender</label>
                                        <select class="form-control" id="gender" v-model="$v.profile.gender.$model">
                                            <option v-for="gender in genderEnum" :key="gender">{{ gender }}</option>
                                        </select>
                                        <small
                                            class="form-error form-text text-danger"
                                            v-if="!$v.profile.gender.required"
                                        >
                                            {{ $t('form.validation.required') }}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            class="btn btn-primary"
                            :disabled="profileSubmitStatus === requestStatusEnum.PENDING"
                        >
                            Update profile
                            <span
                                v-if="profileSubmitStatus === requestStatusEnum.PENDING"
                                class="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            />
                        </button>
                    </form>
                </div>
            </div>
            <hr />
            <div class="row">
                <div class="col-3">
                    <div>Password</div>
                </div>
                <div class="col">
                    <div
                        class="alert alert-danger"
                        role="alert"
                        v-if="passwordSubmitStatus === requestStatusEnum.ERROR"
                    >
                        {{ passwordErrorMessage }}
                    </div>
                    <div
                        class="alert alert-success"
                        role="alert"
                        v-if="passwordSubmitStatus === requestStatusEnum.SUCCESS"
                    >
                        Password successfully updated !
                    </div>
                    <form @submit.prevent="submitPassword">
                        <div class="form-row">
                            <div
                                :class="{
                                    'col-md-8 mb-3': true,
                                    'form-group-error': $v.password.currentPassword.$error,
                                }"
                            >
                                <label for="currentPassword">Current Password</label>
                                <input
                                    name="currentPassword"
                                    id="currentPassword"
                                    :class="{ 'form-control': true, 'is-invalid': $v.password.currentPassword.$error }"
                                    placeholder="enter your current password"
                                    type="text"
                                    v-model.trim="$v.password.currentPassword.$model"
                                />
                                <small
                                    class="form-error form-text text-danger"
                                    v-if="!$v.password.currentPassword.required"
                                >
                                    {{ $t('form.validation.required') }}
                                </small>
                            </div>
                        </div>
                        <hr />
                        <div class="form-row">
                            <div :class="{ 'col-md-8 mb-3': true, 'form-group-error': $v.password.newPassword.$error }">
                                <label for="newPassword">New Password</label>
                                <input
                                    name="newPassword"
                                    id="newPassword"
                                    :class="{ 'form-control': true, 'is-invalid': $v.password.newPassword.$error }"
                                    placeholder="enter a new password"
                                    type="text"
                                    v-model.trim="$v.password.newPassword.$model"
                                />
                                <small
                                    class="form-error form-text text-danger"
                                    v-if="!$v.password.newPassword.required"
                                >
                                    {{ $t('form.validation.required') }}
                                </small>
                                <small
                                    class="form-error form-text text-danger"
                                    v-if="!$v.password.newPassword.minLength"
                                >
                                    {{
                                        $t('form.validation.minLength', {
                                            length: $v.password.newPassword.$params.minLength.min,
                                        })
                                    }}
                                </small>
                            </div>
                        </div>
                        <div class="form-row">
                            <div
                                :class="{
                                    'col-md-8 mb-3': true,
                                    'form-group-error': $v.password.repeatNewPassword.$error,
                                }"
                            >
                                <label for="repeatNewPassword">Confirm New Password</label>
                                <input
                                    name="repeatNewPassword"
                                    id="repeatNewPassword"
                                    :class="{
                                        'form-control': true,
                                        'is-invalid': $v.password.repeatNewPassword.$error,
                                    }"
                                    placeholder="enter the password again"
                                    type="text"
                                    v-model.trim="$v.password.repeatNewPassword.$model"
                                />
                                <small
                                    class="form-error form-text text-danger"
                                    v-if="!$v.password.repeatNewPassword.sameAsPassword"
                                >
                                    {{ $t('form.validation.sameAsPassword') }}
                                </small>
                            </div>
                        </div>

                        <button
                            type="submit"
                            class="btn btn-primary"
                            :disabled="passwordSubmitStatus === requestStatusEnum.PENDING"
                        >
                            Update password
                            <span
                                v-if="passwordSubmitStatus === requestStatusEnum.PENDING"
                                class="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';
import { Helmet } from '@jnields/vue-helmet';
export default {
    name: 'account',
    components: {
        helmet: Helmet,
    },
    inject: ['$accountService', 'requestStatusEnum', 'genderEnum'],
    data: () => ({
        profile: {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            gender: '',
        },
        removeAvatar: false,
        avatarFile: null,
        avatarUrl: null,
        defaultAvatarUrl: 'https://secure.gravatar.com/avatar/2615a3a7473379de6863858e0ec7b32a?s=800&d=identicon',
        profileSubmitStatus: null,
        profileErrorMessage: null,
        password: {
            currentPassword: '',
            newPassword: '',
            repeatNewPassword: '',
        },
        passwordSubmitStatus: null,
        passwordErrorMessage: null,
    }),
    computed: mapGetters(['currentUser']),
    validations: {
        profile: {
            firstName: {
                required,
            },
            lastName: {
                required,
            },
            email: {
                required,
                email,
            },
            username: {
                required,
            },
            gender: {
                required,
            },
        },
        password: {
            currentPassword: {
                required,
            },
            newPassword: {
                required,
                minLength: minLength(8),
            },
            repeatNewPassword: {
                sameAsPassword: sameAs('newPassword'),
            },
        },
    },
    methods: {
        async submitProfile() {
            this.$v.profile.$touch();
            this.profileErrorMessage = null;
            if (!this.$v.profile.$invalid) {
                try {
                    this.profileSubmitStatus = this.requestStatusEnum.PENDING;
                    const user = await this.$accountService.updateAccount(
                        this.profile,
                        this.avatarFile,
                        this.removeAvatar,
                    );
                    this.profileSubmitStatus = this.requestStatusEnum.SUCCESS;
                    this.$store.commit('setCurrentUser', user);

                    this.avatarFile = null;

                    this.$v.profile.$reset();
                } catch (error) {
                    this.profileSubmitStatus = this.requestStatusEnum.ERROR;
                    if (error) {
                        this.profileErrorMessage = error.message;
                    }
                }
            }
        },
        async submitPassword() {
            this.$v.password.$touch();
            this.passwordErrorMessage = null;
            if (!this.$v.password.$invalid) {
                try {
                    this.passwordSubmitStatus = this.requestStatusEnum.PENDING;

                    await this.$accountService.updateAccount({
                        password: this.password.currentPassword,
                        newPassword: this.password.newPassword,
                    });

                    this.passwordSubmitStatus = this.requestStatusEnum.SUCCESS;

                    this.password.currentPassword = '';
                    this.password.newPassword = '';
                    this.password.repeatNewPassword = '';

                    this.$v.password.$reset();
                } catch (error) {
                    this.passwordSubmitStatus = this.requestStatusEnum.ERROR;
                    if (error) {
                        this.passwordErrorMessage = error.message;
                    }
                }
            }
        },
        async handleFileUpload() {
            this.avatarFile = this.$refs.avatar.files[0];
            this.avatarUrl = URL.createObjectURL(this.avatarFile);
            this.removeAvatar = false;
        },
        async onClickRemoveAvatar() {
            this.avatarFile = null;
            this.avatarUrl = null;
            this.removeAvatar = true;
        },
    },
    async beforeMount() {
        const { firstName, lastName, email, avatar, username, gender } = this.currentUser;

        this.profile.firstName = firstName;
        this.profile.lastName = lastName;
        this.profile.email = email;
        this.profile.username = username;
        this.profile.gender = gender;

        if (avatar) {
            this.avatarUrl = avatar.path;
        }
    },
};
</script>

<style scoped></style>
