import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router';
import axios from 'axios';
import iView from 'iview';
import '../my-theme/index.less';//自定义主题

import store from './store/store.js'

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(iView);

Vue.prototype.$axios = axios;

//加载进度条
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    next();
});
router.afterEach(route => {
    iView.LoadingBar.finish();
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
