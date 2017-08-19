<template>
  <div>
    <h2>ディレクティブ</h2>

    <h3>カスタムディレクティブ</h3>
    <table>
      <tr>
        <th>1</th>
        <td>
          <p class="title">ページ表示時に自動でフォーカス</p>
          <input v-focus>
        </td>
      </tr>
      <tr>
        <th>2</th>
        <td>
          <p class="title">bindのデモ</p>
          <div id="hook-arguments-example" v-demoBind:foo.a.b="message"></div>
        </td>
      </tr>
      <tr>
        <th>3</th>
        <td>
          <p class="title">関数による省略記法</p>
          <div v-demo="{ color: 'white', text: 'hello!' }"></div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import Vue from 'vue'

  // v-focus というグローバルカスタムディレクティブを登録します
  Vue.directive('focus', {
    // ひも付いている要素が親 Node に挿入された時に呼ばれます
    inserted: function (el) {
      // 要素にフォーカスを当てる
      el.focus()
    }
  });

  // 関数による省略記法
  Vue.directive('demo', function (el, binding) {
    console.log(binding.value.color); // => "white"
    console.log(binding.value.text);  // => "hello!"
  })

  export default {
    data() {
      return {
        message: 'hello!',
      }
    },
    directives: {
      demoBind: {
        bind: function (el, binding, vnode) {
          let s = JSON.stringify;
          el.innerHTML =
            'name: ' + s(binding.name) + '<br>' +
            'value: ' + s(binding.value) + '<br>' +
            'expression: ' + s(binding.expression) + '<br>' +
            'argument: ' + s(binding.arg) + '<br>' +
            'modifiers: ' + s(binding.modifiers) + '<br>' +
            'vnode keys: ' + Object.keys(vnode).join(', ')
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../main.scss";

  table {
    width: 100%;
    border-collapse: collapse;
  }

  table tr th,
  table tr td {
    padding: 10px;
    vertical-align: middle;
    border: 1px dashed #ccc;
  }

  table tr th {
    width: 20px;
    vertical-align: top;
  }

  table tr td:nth-of-type(1) {
    width: 80px;
  }

  p.title {
    font-weight: bold;
    font-size: 13px;
    text-align: left;
    margin-bottom: 10px;
    color: $accentColorDark;
  }
</style>