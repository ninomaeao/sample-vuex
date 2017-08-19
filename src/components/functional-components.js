import Vue from 'vue'
import Velocity from 'velocity-animate'
import TWEEN from '@tweenjs/tween.js'

Vue.component('my-transition', {
  functional: true,
  render: function (createElement, context) {
    let data = {
      props: {
        name: 'my-transition',
        mode: 'out-in',
        "v-bind:css": false
      },
      on: {
        beforeEnter: function (el) {
          el.style.opacity = 0;
        },
        enter: function (el, done) {
          Velocity(el, {opacity: 1, fontSize: '1.5em'}, {duration: 300});
          Velocity(el, {fontSize: '1em'}, {complete: done});
        },
        leave: function (el, done) {
          Velocity(el, {translateX: '50px', rotateZ: '-50deg'}, {duration: 600});
          Velocity(el, {rotateZ: '100deg'}, {loop: 2});
          Velocity(el, {
            rotateZ: '-45deg',
            translateY: '30px',
            translateX: '30px',
            opacity: 0
          }, {complete: done});
        },
      }
    };
    return createElement('transition', data, context.children)
  }
});

Vue.component('animated-integer', {
  template: '<span>{{ tweeningValue }}</span>',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      tweeningValue: 0
    }
  },
  watch: {
    value: function (newValue, oldValue) {
      this.tween(oldValue, newValue)
    }
  },
  mounted: function () {
    this.tween(0, this.value)
  },
  methods: {
    tween: function (startValue, endValue) {
      let vm = this;

      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }

      new TWEEN.Tween({tweeningValue: startValue})
        .to({tweeningValue: endValue}, 500)
        .onUpdate(function (obj) {
          vm.tweeningValue = obj.tweeningValue.toFixed(0)
        })
        .start();

      animate()
    }
  }
});