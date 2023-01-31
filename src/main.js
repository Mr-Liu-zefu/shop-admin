import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import 'lib-flexible'




Vue.prototype.$http = axios;

Vue.use(ElementUI);
Vue.use(echarts);

Vue.config.productionTip = false
window.echarts = require('echarts')



new Vue({
  router,
  store,
  ElementUI,
  echarts,
  render: h => h(App)
}).$mount('#app')
