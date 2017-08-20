<template>
  <div>
    <h2>リストトランジション transition-group</h2>
    <table>
      <tr>
        <td>1</td>
        <td>
          <button v-on:click="shuffle">Shuffle</button>
          <button v-on:click="add">Add</button>
          <button v-on:click="remove">Remove</button>
          <transition-group name="list" tag="p">
    <span v-for="item in items" v-bind:key="item" class="list-item">
      {{ item }}
    </span>
          </transition-group>
        </td>
      </tr>
      <tr>
        <td>2</td>
        <td>
          <button v-on:click="shuffleGrid">Shuffle</button>
          <transition-group name="grid" tag="p" class="grid">
    <span v-for="item in gridItems" v-bind:key="item" class="grid-item">
      {{ item }}
    </span>
          </transition-group>
        </td>
      </tr>
      <tr>
        <td>3</td>
        <td>
          <p class="small">data 属性とJavaScriptのやりとりによりリスト内の遷移をずらす:</p>
          <input v-model="query" class="input-query">
          <div>
            <transition-group
                name="staggered-fade"
                tag="ul"
                v-bind:css="false"
                v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:leave="leave"
                class="list-data"
            >
              <li
                  v-for="(item, index) in computedList"
                  v-bind:key="item.msg"
                  v-bind:data-index="index"
              >{{ item.msg }}
              </li>
            </transition-group>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import Velocity from 'velocity-animate'

  export default {
    data() {
      return {
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        gridItems: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        query: '',
        list: [
          {msg: 'Bruce Lee'},
          {msg: 'Jackie Chan'},
          {msg: 'Chuck Norris'},
          {msg: 'Jet Li'},
          {msg: 'Kung Fury'}
        ]
      }
    },
    methods: {
      randomIndex: function () {
        return Math.floor(Math.random() * this.items.length)
      },
      add: function () {
        this.items.splice(this.randomIndex(), 0, this.items.length ? Math.max.apply({}, this.items) + 1 : 1)
      },
      remove: function () {
        this.items.splice(this.randomIndex(), 1)
      },
      shuffle: function () {
        this.items = _.shuffle(this.items)
      },
      shuffleGrid: function () {
        this.gridItems = _.shuffle(this.gridItems)
      },
      beforeEnter: function (el) {
        el.style.opacity = 0;
        el.style.height = 0;
      },
      enter: function (el, done) {
        let delay = el.dataset.index * 150;
        setTimeout(function () {
          Velocity(
            el,
            {opacity: 1, height: '1.6em'},
            {complete: done}
          )
        }, delay)
      },
      leave: function (el, done) {
        let delay = el.dataset.index * 150;
        setTimeout(function () {
          Velocity(
            el,
            {opacity: 0, height: 0},
            {complete: done}
          )
        }, delay)
      }
    },
    computed: {
      computedList: function () {
        let vm = this;
        return this.list.filter(function (item) {
          return item.msg.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
        })
      }
    },
    components: {}
  }
</script>

<style>

  table {
    width: 100%;
    border-collapse: collapse;
  }

  table tr th,
  table tr td {
    padding: 10px;
    vertical-align: middle;
    border: 1px dashed #ccc;
    text-align: center;
  }

  table tr th {
    width: 80px;
    vertical-align: top;
  }

  table tr td:nth-of-type(1) {
    width: 80px;
  }

  button {
    margin-bottom: 10px;
  }

  p.small {
    font-size: 12px;
    text-align: left;
  }

  /* 1 */

  .list-item {
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
  }

  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .list-leave-active {
    position: absolute;
  }

  /* 2 */

  .grid {
    display: flex;
    flex-wrap: wrap;
    width: 90px;
    margin: 0 auto;
  }

  .grid-item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 30px;
    height: 30px;
    transition: all 1s;
    border: 1px solid #ccc;
    margin-right: -1px;
    margin-bottom: -1px;
  }

  .grid-leave-active {
    position: absolute;
  }

  /* 3 */

  .input-query {
    margin-top: 5px;
  }

  .list-data {
    margin: 10px auto 0;
    width: 100px;
  }

  .list-data li {
    text-align: left;
    height: 1.6em;
  }

</style>