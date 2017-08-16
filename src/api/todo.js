const _todos = [
  { id: 1, text: 'todo 1', done: true },
  { id: 2, text: 'todo 2', done: false },
  { id: 3, text: 'todo 3', done: true },
];

export default {
  getTodos (cb) {
    setTimeout(() => cb(_todos), 300)
  },
  getTodoById (cb, payload) {
    const todo = _todos.find( todo => todo.id === payload.id);
    setTimeout(() => cb(todo), 300)
  },
}