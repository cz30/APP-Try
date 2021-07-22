import Vue from 'vue'
import App from './App'
import router from './router'
import { Button,Popup,Cell,Toast } from 'vant'
import 'lib-flexible/flexible'
import 'amfe-flexible/index.min.js'
import 'vant/lib/index.css';
import './assets/css/global.css'

Vue.use(Button)
Vue.use(Cell)
Vue.use(Popup)
Vue.use(Toast)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
