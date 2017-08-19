import Vue from 'vue'
import VueRouter from 'vue-router'

import Error404 from '../views/error404.vue'
import Top from '../views/top.vue'
import TestIncrement from '../views/test/increment.vue'
import TestTodos from '../views/test/todos.vue'
import TestTodo from '../views/test/todo.vue'
import TestTransition from '../views/test/transition.vue'
import TestTransitionGroup from '../views/test/transition_group.vue'
import TestDirectives from '../views/test/directives.vue'

Vue.use(VueRouter);

const routes = [
  {path: '*', component: Error404},
  {path: '/', component: Top},
  {path: '/increment', component: TestIncrement},
  {path: '/todos', component: TestTodos},
  {path: '/todos/:id', component: TestTodo, props: true},
  {path: '/transition', component: TestTransition},
  {path: '/transition_group', component: TestTransitionGroup},
  {path: '/directives', component: TestDirectives},
  {path: '/todos/:id', component: TestTodo, props: true},
];

const router = new VueRouter({
  // mode: 'history',
  routes
});

export default router
