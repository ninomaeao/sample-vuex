<template>
  <div>
    <router-link to="/todos/">もどる</router-link>
    <div v-if="todo">
      {{ id }} : {{ todo.text }} {{ todo.done }}
      <div>
        <input type="checkbox" v-model="done">
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: ['id'],
    computed: {
      ...mapGetters('todo', [
        'todoById',
      ]),
      todo () {
        return this.todoById(Number(this.id));
      },
      done: {
        get () {
          return this.$store.state.todo.todo.done
        },
        set (value) {
          this.$store.commit('todo/mutateTodoDone', value)
        }
      }
    },
    created () {
      this.$store.dispatch('todo/getTodoById', {id: Number(this.id)});
    }
  }
</script>