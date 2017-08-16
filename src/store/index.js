import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'

import todo from './modules/todo'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations,
  modules: {
    todo,
  },
  strict: process.env.NODE_ENV !== 'production'
});

export default store
