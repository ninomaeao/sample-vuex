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

  .error {
    color: red;
  }

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
    th {
      color: $accentColorDark;
    }
    th,
    td {
      text-align: center;
      vertical-align: middle;
      padding: .3em .5em;
      border: 1px dashed #ccc;
      height: 1px;
    }
  }

  .todo {
    td.title {
      text-align: left;
      padding: 0;
      width: 200px;
    }

    &.editing .view,
    .edit {
      display: none;
    }

    &.editing .edit {
      display: block;
      width: 100%;
      padding: .3em .5em;
      height: 100%;
    }

    .view label {
      padding: .3em .5em;
      display: block;
    }

    .toggle {
      display: inline-block;
      cursor: pointer;
      text-align: center;
      background: #f0f0f0;
      border: 1px solid #d0d0d0;
      border-radius: 5px;
      padding: 2px .5em;
      font-size: 12px;
      &:hover {
        background: #f8f8f8;
      }
    }
    &.completed .toggle {
      background: #ade9af;
      border: 1px solid #8ebf8f;
    }
  }

</style>