<template>
  <div>
    <h2>TODOS</h2>
    <div>
      <transition :name="transitionName" mode="out-in">
        <router-view class="child-view"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    data() {
      return {
        transitionName: 'slide-left'
      }
    },
    beforeRouteUpdate(to, from, next) {
      this.transitionName = to.name === 'todos' ? 'slide-right' : 'slide-left';
      next()
    },
  }
</script>

<style lang="scss">
  @import '../../main.scss';

  .child-view {
    transition: all .1s cubic-bezier(.55, 0, .1, 1);
  }

  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(30px, 0);
    transform: translate(30px, 0);
  }

  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-30px, 0);
    transform: translate(-30px, 0);
  }

  table {
    border-collapse: collapse;
  }

  table tr th {
    color: $accentColorDark;
  }

  table tr th,
  table tr td {
    padding: .2em 1em;
    vertical-align: middle;
    border: 1px dashed #ccc;
    text-align: center;
  }

  .todo td.title {
    padding: 0;
    text-align: left;
    width: 200px;
  }

  .todo .view label {
    padding: 4px;
    display: block;
  }

  .todo.editing .view,
  .todo .edit {
    display: none;
  }

  .todo.editing .edit {
    display: block;
    width: 100%;
    padding: 4px;
  }

  .todo .toggle {
    cursor: pointer;
    background: #f0f0f0;
    text-align: center;
  }
</style>