import Vue from 'vue';

import './style.scss';

import Vuex from 'vuex';
Vue.use(Vuex);
import App from './components/App.vue';

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', {
  get() {
    return this.$root.moment;
  },
});

new Vue({
  el: '#app',
  data: {
    moment,
  },
  components: {
    App,
  },
  store: {
    state: {
      currentYear: 2020,
      currentMonth: 5,
    },
  },
});
