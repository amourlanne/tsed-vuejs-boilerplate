<template>
    <div class="container-fluid mt-4">
        <form @submit.prevent="submitForm">
            <div class="alert alert-danger" role="alert" v-if="submitStatus === requestStatusEnum.ERROR">
                {{ formErrorMessage }}
            </div>
            <div class="alert alert-success" role="alert" v-if="submitStatus === requestStatusEnum.SUCCESS">
                Profile successfully updated !
            </div>
            <h4>Account</h4>
            <hr />
            <div class="form-row">
                <div :class="['col-md-3 mb-3', { 'form-group-error': $v.form.username.$error }]">
                    <label for="username">Username</label>
                    <input
                        name="username"
                        id="username"
                        :class="{ 'form-control': true, 'is-invalid': $v.form.username.$error }"
                        placeholder="Username"
                        type="text"
                        v-model.lazy="$v.form.username.$model"
                    />
                    <small class="form-error form-text text-danger" v-if="!$v.form.username.required">
                        {{ $t('form.validation.required') }}
                    </small>
                    <small class="form-error form-text text-danger" v-if="!$v.form.username.uniqueUsername">
                        {{ $t('form.validation.unique') }}
                    </small>
                </div>
            </div>
            <div class="form-row">
                <div :class="{ 'col-md-3 mb-3': true, 'form-group-error': $v.form.email.$error }">
                    <label for="email">Email Address</label>
                    <input
                        name="email"
                        id="email"
                        :class="{ 'form-control': true, 'is-invalid': $v.form.email.$error }"
                        placeholder="Your email address"
                        type="email"
                        v-model.trim="$v.form.email.$model"
                    />
                    <small class="form-error form-text text-danger" v-if="!$v.form.email.required">
                        {{ $t('form.validation.required') }}
                    </small>
                    <small class="form-error form-text text-danger" v-if="!$v.form.email.email">
                        {{ $t('form.validation.email') }}
                    </small>
                </div>
            </div>
            <h4>Password</h4>
            <hr />
            <div class="form-row">
                <div :class="{ 'col-md-3 mb-3': true, 'form-group-error': $v.form.password.$error }">
                    <label for="password">Password</label>
                    <input
                        name="password"
                        id="password"
                        :class="{ 'form-control': true, 'is-invalid': $v.form.password.$error }"
                        placeholder="Password"
                        type="password"
                        v-model.trim="$v.form.password.$model"
                    />
                    <small class="form-error form-text text-danger" v-if="!$v.form.password.required">
                        {{ $t('form.validation.required') }}
                    </small>
                </div>
            </div>
            <h4>Access</h4>
            <hr />
            <div class="form-row">
                <div :class="['col-md-3 mb-3', { 'form-group-error': $v.form.role.$error }]">
                    <label for="role">Role</label>
                    <select class="form-control" id="role" v-model="$v.form.role.$model">
                        <option v-for="role in roleEnum" :key="role">{{ role }}</option>
                    </select>
                    <small class="form-error form-text text-danger" v-if="!$v.form.role.required">
                        {{ $t('form.validation.required') }}
                    </small>
                </div>
            </div>
            <h4>Profile</h4>
            <hr />
            <div class="form-row mb-5">
                <div class="col-3 text-center">
                    <img
                        :src="avatarUrl || defaultAvatarUrl"
                        style="width: 180px; height: 180px;"
                        class="rounded-circle img-fluid"
                    />
                </div>
                <div class="col-5">
                    <label>Avatar</label>
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
                    <button
                        type="button"
                        class="btn btn-outline-danger"
                        :disabled="avatarFile === null"
                        v-on:click="onClickRemoveAvatar"
                    >
                        Remove avatar
                    </button>
                </div>
            </div>
            <div class="form-row">
                <div :class="['col-md-3 mb-3', { 'form-group-error': $v.form.firstName.$error }]">
                    <label for="firstName">First name</label>
                    <input
                        name="firstName"
                        id="firstName"
                        :class="{ 'form-control': true, 'is-invalid': $v.form.firstName.$error }"
                        placeholder="Firstname"
                        type="text"
                        v-model.trim="$v.form.firstName.$model"
                    />
                    <small class="form-error form-text text-danger" v-if="!$v.form.firstName.required">
                        {{ $t('form.validation.required') }}
                    </small>
                </div>
                <div
                    :class="{
                        'col-md-3 mb-3': true,
                        'form-group-error': $v.form.lastName.$error,
                    }"
                >
                    <label for="lastName">Last name</label>
                    <input
                        name="lastName"
                        id="lastName"
                        :class="{ 'form-control': true, 'is-invalid': $v.form.lastName.$error }"
                        placeholder="Last Name"
                        type="text"
                        v-model.trim="$v.form.lastName.$model"
                    />
                    <small class="form-error form-text text-danger" v-if="!$v.form.lastName.required">
                        {{ $t('form.validation.required') }}
                    </small>
                </div>
            </div>
            <div class="form-row">
                <div :class="['col-md-3 mb-3', { 'form-group-error': $v.form.gender.$error }]">
                    <label for="gender">Gender</label>
                    <select class="form-control" id="gender" v-model="$v.form.gender.$model">
                        <option v-for="gender in genderEnum" :key="gender">{{ gender }}</option>
                    </select>
                    <small class="form-error form-text text-danger" v-if="!$v.form.gender.required">
                        {{ $t('form.validation.required') }}
                    </small>
                </div>
            </div>

            <button type="submit" class="btn btn-primary" :disabled="submitStatus === requestStatusEnum.PENDING">
                Create user
                <span
                    v-if="submitStatus === requestStatusEnum.PENDING"
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                />
            </button>
        </form>
    </div>
</template>

<script lang="ts">
import { required, email } from 'vuelidate/lib/validators';
import uniqueUsername from '@/packages/vuelidate/validators/uniqueUsername';

export default {
    name: 'new-user',
    inject: ['$adminUserService', 'requestStatusEnum', 'roleEnum', 'genderEnum'],
    data() {
        return {
            form: {
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                role: '',
                gender: '',
                password: '',
            },
            defaultAvatarUrl: 'https://secure.gravatar.com/avatar/2615a3a7473379de6863858e0ec7b32a?s=800&d=identicon',
            avatarFile: null,
            avatarUrl: null,
            submitStatus: null,
            formErrorMessage: null,
        };
    },
    validations: {
        form: {
            username: {
                required,
                uniqueUsername,
            },
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
            password: {
                required,
            },
            role: {
                required,
                // isEnum(RoleEnum),
            },
            gender: {
                required,
            },
        },
    },
    methods: {
        async submitForm() {
            this.$v.form.$touch();
            this.formErrorMessage = null;
            if (!this.$v.form.$invalid) {
                try {
                    this.submitStatus = this.requestStatusEnum.PENDING;
                    await this.$adminUserService.createUser(this.form, this.avatarFile);
                    this.$router.push({ name: 'admin-users' });
                } catch (error) {
                    this.submitStatus = this.requestStatusEnum.ERROR;
                    if (error) {
                        this.formErrorMessage = error.message;
                    }
                }
            }
        },
        async handleFileUpload() {
            this.avatarFile = this.$refs.avatar.files[0];
            this.avatarUrl = URL.createObjectURL(this.avatarFile);
        },
        async onClickRemoveAvatar() {
            this.avatarFile = null;
            this.avatarUrl = null;
        },
    },
};
</script>

<style scoped lang="scss"></style>
