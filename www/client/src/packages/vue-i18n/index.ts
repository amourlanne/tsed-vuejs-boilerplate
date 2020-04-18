import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const requireMessages = require.context('@/translations', false, /messages\.[a-z]\w+\.json$/);

const messages = requireMessages.keys().reduce((messages, fileName) => {
    const locale = fileName.split('.')[2]; // ex: ./messages.en.json ["", "/messages", "en", "json"]
    return {
        ...messages,
        [locale]: requireMessages(fileName),
    };
}, {});

export default new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: messages,
});
