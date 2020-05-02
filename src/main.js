import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

Vue.prototype.$axios = axios
// ES Modules syntax
import fetch from 'node-fetch';
global.fetch = fetch;

// require syntax
// const fetch = require('node-fetch');
// global.fetch = fetch;

Vue.config.productionTip = false

// Vue.prototype.$axios = axios

new Vue({
  render: h => h(App),
}).$mount('#app')
