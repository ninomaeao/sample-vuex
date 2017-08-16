import todo from '../../api/todo'

const state = {
  all: [],
  todo: {}
};

const getters = {
  allTodos: state => {
    return state.all
  },
  todoById: state => (id) => {
    return state.todo
  }
};

const actions = {
  getAllTodos({commit}) {
    todo.getTodos(todos => {
      commit('mutateAllTodos', {todos})
    })
  },
  getTodoById({commit}, payload) {
    if (state.todo.id !== payload.id) {
      commit('mutateTodo', {});
      todo.getTodoById(todo => {
        commit('mutateTodo', {todo})
      }, payload)
    }
  }
};

const mutations = {
  mutateAllTodos(state, {todos}) {
    state.all = todos
  },
  mutateTodo(state, {todo}) {
    state.todo = todo
  },
  mutateTodoDone(state, done) {
    state.todo.done = done
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}