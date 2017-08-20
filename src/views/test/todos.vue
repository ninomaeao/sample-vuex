<template>
  <div>
    <div v-for="todo in todos">
      {{ todo.id }} : {{ todo.text }}
      <router-link :to="/todos/ + todo.id">詳細</router-link>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapGetters('todo', {
        todos: 'allTodos'
      }),
    },
    methods: mapActions([]),
    created() {
      this.$store.dispatch('todo/getAllTodos')
    },
  }
</script>
