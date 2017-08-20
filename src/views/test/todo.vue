<template>
  <div>
    <router-link to="/todos/">もどる</router-link>
    <div class="loading" v-if="loading">Loading...</div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div v-if="todo" class="todo"
         :class="{ completed: todo.done, editing: todo == editedTodo }">
      <table>
        <tr>
          <th>ID</th>
          <td>
            {{ id }}
          </td>
        </tr>
        <tr>
          <th>タイトル</th>
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
        </tr>
        <tr>
          <th>状態</th>
          <td>
            <div class="toggle" v-on:click="updateTodo({id: todo.id, done: !todo.done})">
              {{ todo.done ? '完了' : '未完了'}}
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    props: ['id'],
    data() {
      return {
        loading: false,
        post: null,
        error: null,
        editedTodo: null,
      }
    },
    computed: {
      ...mapGetters('todo', [
        'getTodo',
      ]),
      todo() {
        return this.getTodo(Number(this.id));
      },
      done: {
        get () {
          return this.todo.done
        },
        set (value) {
          let todo = this.todo;
          let payload = {id: this.todo.id, done: value};
          this.$store.commit('todo/updateTodo', {todo, payload})
        }
      }
    },
    created() {
      this.fetchData();
    },
    methods : {
      ...mapActions('todo', [
        'updateTodo'
      ]),
      fetchData () {
        this.error = null;
        this.loading = true;
        const vm = this;
        this.$store.dispatch('todo/getTodo', {
          id: this.id,
          cb(err, todo) {
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
    directives: {
      'todo-focus': function (el, binding) {
        if (binding.value) {
          el.focus()
        }
      }
    },
  }
</script>

<style>
  table tr td {
    text-align: left;
  }

  .error {
    color: red;
  }
</style>