const _todos = {
  1: { id: 1, title: 'todo 1', done: true },
  2: { id: 2, title: 'todo 2', done: false },
  3: { id: 3, title: 'todo 3', done: true },
};

export default {
  getTodos (cb) {
    let todos = Object.assign({}, _todos);
    setTimeout(() => cb(todos), 0)
  },
  updateTodo (cb, payload) {
    setTimeout(() => {
      let todo = _todos[Number(payload.id)];
      if (todo){

        let updatedTodo = Object.assign({}, todo);
        if (payload.done !== undefined) updatedTodo.done = payload.done;
        if (payload.title !== undefined) updatedTodo.title = payload.title;

        cb(null, updatedTodo)
      } else {
        cb(new Error('Todo not found.'))
      }
    }, 0)
  },
}