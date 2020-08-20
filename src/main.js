import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuex from 'vuex'
import axios from 'axios'
import Global from "./common/Global";

Vue.config.productionTip = false
// Vue.prototype.$baseUrl = 'http://tst.im.lineji.cn'
Vue.prototype.Global = Global
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.use(Vuex);
new Vue({
  router,
  store,
  axios,
  render: h => h(App),
  // beforeMount () {
  //   window.addEventListener('message',function(event) {
  //     if(event.origin !== 'http://localhost:63342/shipper_web/component/shipper/index.htmlm') return; //这个判断一下是不是我这个域名跳转过来的
  //     console.log('received response:  ',event.data);
  //   },false);
  //   // var storage=window.sessionStorage;
  //   // console.log(storage);
  // }

}).$mount('#app')


