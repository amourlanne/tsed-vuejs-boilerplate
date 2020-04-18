<template>
    <div class="locale-switcher">
        <div class="dropdown">
            <a
                class="nav-link dropdown-toggle"
                id="dropdownMenuLocale"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                {{ $t('locales.' + $i18n.locale) }}
            </a>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuLocale">
                <template v-for="locale in $i18n.availableLocales">
                    <button
                        v-if="locale !== $i18n.locale"
                        :key="locale"
                        @click="switchLocale(locale)"
                        class="dropdown-item"
                    >
                        {{ $t('locales.' + locale, locale) }}
                    </button>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'locale-switcher',
    methods: {
        switchLocale(locale) {
            this.$i18n.locale = locale;

            this.$route.params.locale = locale;
            this.$router.replace(this.$route);
        },
    },
};
</script>

<style lang="scss">
.locale-switcher {
    display: inline-block;
}
</style>
