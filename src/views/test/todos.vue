<template>
  <div>
    <div class="loading" v-if="loading">Loading...</div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <table v-if="todos">
      <tr>
        <th>ID</th>
        <th>タイトル</th>
        <th>状態</th>
      </tr>
      <tr v-for="todo in todos"
          class="todo"
          :key="todo.id"
          :class="{ completed: todo.done, editing: todo == editedTodo }">
        <td>
          <router-link :to="/todos/ + todo.id">{{ todo.id }}</router-link>
        </td>
        <td class="title">
          <div class="view">
            <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
          </div>
          <input class="edit" type="text"
                 :value="todo.title"
                 v-todo-focus="todo == editedTodo"
                 @blur="doneEdit(todo, $event)"
                 @keyup.enter="doneEdit(todo)"
                 @keyup.esc="cancelEdit(todo)">
        </td>
        <td>
          <div class="toggle" v-on:click="updateTodo({id: todo.id, done: !todo.done})">{{ todo.done ? '完了' : '未完了'}}</div>
        </td>
      </tr>
      <!-- 存在しないTODO -->
      <tr class="todo">
        <td>
          <router-link to="/todos/10">---</router-link>
        </td>
        <td class="title">
        </td>
        <td>---</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapGetters('todo', {
        todos: 'getTodos'
      }),
    },
    data() {
      return {
        loading: false,
        error: null,
        editedTodo: null,
      }
    },
    directives: {
      'todo-focus': function (el, binding) {
        if (binding.value) {
          el.focus()
        }
      }
    },
    methods: {
      ...mapActions('todo', [
        'updateTodo'
      ]),
      fetchData () {
        this.error = null;
        this.loading = true;
        const vm = this;
        this.$store.dispatch('todo/getTodos', {
          cb(err) {
            vm.loading = false;
            if (err) {
              vm.error = err.toString();
            }
          }
        })
      },
      editTodo: function (todo) {
        this.beforeEditCache = todo.title;
        this.editedTodo = todo
      },
      removeTodo: function (todo) {
        this.todos.splice(this.todos.indexOf(todo), 1)
      },
      cancelEdit: function (todo) {
        this.editedTodo = null;
        todo.title = this.beforeEditCache
      },
      doneEdit: function (todo, event) {
        if (!this.editedTodo) {
          return
        }
        this.editedTodo = null;
        let value = event.target.value;
        value = value.trim();
        if (!value) {
          this.removeTodo(todo)
        }
        this.updateTodo({id: todo.id, title: value});
      },
    },
    created() {
      this.fetchData();
    },
  }
</script>