<template>
  <div>
    <h2>トランジション transition</h2>

    <h3>enter/leaveのトランジション</h3>

    <table>
      <tr>
        <th rowspan="100">
          <button v-on:click="show = !show">
            Toggle
          </button>
        </th>
        <td>1</td>
        <td>
          <transition name="fade" appear>
            <div v-if="show">transition</div>
          </transition>
        </td>
      </tr>
      <tr>
        <td>2</td>
        <td>
          <transition name="slide-fade" appear>
            <div v-if="show">transition</div>
          </transition>
        </td>
      </tr>
      <tr>
        <td>3</td>
        <td>
          <transition name="bounce" appear>
            <p v-if="show">animation</p>
          </transition>
        </td>
      </tr>
      <tr>
        <td>4</td>
        <td>
          <transition appear
                      v-on:before-enter="beforeEnter"
                      v-on:enter="enter"
                      v-on:leave="leave"
                      v-bind:css="false"
          >
            <p v-if="show">JavaScript transition</p>
          </transition>
        </td>
      </tr>
      <tr>
        <td>5</td>
        <td>
          <transition>
            <div v-bind:key="show">
              {{ show ? 'show' : 'hide' }}
            </div>
          </transition>
        </td>
      </tr>
      <tr>
        <td>6</td>
        <td>
          <div class="out-in-wrapper">
            <transition name="slideLeft" mode="out-in">
              <button v-if="show" key="show">show</button>
              <button v-if="!show" key="hide">hide</button>
            </transition>
          </div>
        </td>
      </tr>
      <tr>
        <td>7</td>
        <td>
          <div class="out-in-wrapper">
            <transition name="slideLeft" mode="in-out">
              <button v-if="show" key="show">show</button>
              <button v-if="!show" key="hide">hide</button>
            </transition>
          </div>
        </td>
      </tr>
      <tr>
        <td>8</td>
        <td>
          <div class="out-in-wrapper">
            <transition name="component-fade" mode="out-in">
              <div v-bind:is="show ? 'v-a' : 'v-b'"></div>
            </transition>
          </div>
        </td>
      </tr>
      <tr>
        <td>9</td>
        <td>
          <p class="small">関数型コンポーネントによる再利用:</p>
          <my-transition>
            <div v-bind:is="show ? 'v-a' : 'v-b'"></div>
          </my-transition>
        </td>
      </tr>
    </table>

    <h3>状態のトランジション</h3>

    <table>
      <tr>
        <td>1</td>
        <td>
          <input v-model.number="number" type="number" step="20">
          <p>{{ animatedNumber }}</p>
        </td>
      </tr>
      <tr>
        <td>2</td>
        <td>
          <p class="small">関数型コンポーネントによる再利用:</p>
          <input v-model.number="firstNumber" type="number" step="20"> +
          <input v-model.number="secondNumber" type="number" step="20"> =
          {{ result }}
          <p>
            <animated-integer v-bind:value="firstNumber"></animated-integer>
            +
            <animated-integer v-bind:value="secondNumber"></animated-integer>
            =
            <animated-integer v-bind:value="result"></animated-integer>
          </p>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import Velocity from 'velocity-animate'
  import TWEEN from '@tweenjs/tween.js'

  export default {
    data() {
      return {
        show: true,
        firstNumber: 20,
        secondNumber: 40,

        number: 0,
        animatedNumber: 0,
      }
    },
    computed: {
      result: function () {
        return this.firstNumber + this.secondNumber
      },
    },
    watch: {
      number: function(newValue, oldValue) {
        let vm = this;
        function animate () {
          if (TWEEN.update()) {
            requestAnimationFrame(animate)
          }
        }
        new TWEEN.Tween({ tweeningNumber: oldValue })
          .easing(TWEEN.Easing.Quadratic.Out)
          .to({ tweeningNumber: newValue }, 500)
          .onUpdate(function (obj) {
            vm.animatedNumber = obj.tweeningNumber.toFixed(0)
          })
          .start();
        animate()
      },
    },
    methods: {
      // --------
      // ENTERING
      // --------
      beforeEnter: function (el) {
        el.style.opacity = 0;
      },
      // CSS と組み合わせて使う時、done コールバックはオプションです
      enter: function (el, done) {
        Velocity(el, {opacity: 1, fontSize: '1em'}, {duration: 300});
        Velocity(el, {fontSize: '0.5em'}, {complete: done});
      },
      afterEnter: function (el) {
      },
      enterCancelled: function (el) {
      },
      // --------
      // LEAVING
      // --------
      beforeLeave: function (el) {
      },
      // CSS と組み合わせて使う時、done コールバックはオプションです
      leave: function (el, done) {
        Velocity(el, {translateX: '15px', rotateZ: '50deg'}, {duration: 600});
        Velocity(el, {rotateZ: '100deg'}, {loop: 2});
        Velocity(el, {
          rotateZ: '45deg',
          translateY: '30px',
          translateX: '30px',
          opacity: 0
        }, {complete: done});
      },
      afterLeave: function (el) {
      },
      // v-show と共に使うときだけ leaveCancelled は有効です
      leaveCancelled: function (el) {
      },
    },
    components: {
      'v-a': {
        template: '<div>Component A</div>'
      },
      'v-b': {
        template: '<div>Component B</div>'
      }
    }
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

  p.small {
    font-size: 12px;
    text-align: left;
  }

  input {
    width: 4em;
  }

  /* 1 */

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }

  /* 2 トランジション */

  /* enter、 leave アニメーションで異なる間隔やタイミング関数を利用することができます */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }

  /* 3 アニメーション */

  .bounce-enter-active {
    animation: bounce-in 1s;
  }

  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(.5);
    }
  }

  /* 6 */

  .out-in-wrapper {
    position: relative;
    height: 18px;
  }

  .out-in-wrapper button {
    position: absolute;
    left: calc(50% - 20px);
    width: 40px;
  }

  .slideLeft-enter-active {
    transition: all .6s ease;
  }

  .slideLeft-leave-active {
    transition: all .6s ease;
  }

  .slideLeft-enter {
    transform: translateX(30px);
    opacity: 0;
  }

  .slideLeft-leave-to {
    transform: translateX(-30px);
    opacity: 0;
  }

  /* 8 */

  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }

  .component-fade-enter, .component-fade-leave-to {
    opacity: 0;
  }

</style>