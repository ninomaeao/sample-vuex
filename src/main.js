import './main.scss'

import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

// 関数型コンポーネントによるトランジションの再利用
import './components/functional-components'

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
