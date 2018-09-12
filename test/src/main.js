import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router';
import iView from 'iview';
import '../my-theme/index.less';//自定义主题


Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(iView);

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
  components: { App },
  template: '<App/>'
})
