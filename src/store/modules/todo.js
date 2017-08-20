import apiTodo from '../../api/todo'

const state = {
  all: {},
  todo: {}
};

const getters = {
  getTodos: state => {
    return _.size(state.all) ? state.all : null
  },
  getTodo: state => (id) => {
    return state.all[id]
  }
};

const actions = {
  getTodos({commit}, payload) {
    if (!_.size(state.all)) {
      apiTodo.getTodos(todos => {
        if (_.size(todos)) {
          commit('mutateTodos', {todos});
          payload.cb(null);
        } else {
          payload.cb(new Error('Todos not found.'))
        }
      })
    } else {
      payload.cb(null)
    }
  },
  getTodo({commit}, payload) {
    let id = Number(payload.id);
    let todo = state.all[id];
    if (!todo) {
      apiTodo.getTodos(todos => {
        commit('mutateTodos', {todos});
        if (todos[id]) {
          payload.cb(null, todos[id])
        } else {
          payload.cb(new Error('Todo not found.'), todos[id])
        }
      });
    } else {
      payload.cb(null, todo)
    }
  },
  updateTodo({commit}, payload) {
    apiTodo.updateTodo((err, todo) => {
      if (err) {
      } else {
        commit('updateTodo', {todo})
      }
    }, payload)
  },
};

const mutations = {
  mutateTodos(state, {todos}) {
    state.all = todos
  },
  updateTodo(state, {todo}) {
    let _todo = state.all[todo.id];
    if (_todo) {
      _todo = Object.assign(_todo, todo);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}