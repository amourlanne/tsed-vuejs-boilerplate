import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import i18n from '@/packages/vue-i18n';
import '@/packages/vuelidate';
import '@/packages/vue-cookies';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
}).$mount('#app');
