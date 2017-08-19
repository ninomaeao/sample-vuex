<template>
  <div>
    <h2>Top</h2>

    <ul>
      <li>
        <router-link to="/increment">インクリメント</router-link>
      </li>
      <li>
        <router-link to="/todos">TODOS</router-link>
      </li>
      <li>
        <router-link to="/transition">トランジション transition</router-link>
      </li>
      <li>
        <router-link to="/transition_group">リストトランジション transition-group</router-link>
      </li>
    </ul>

  </div>
</template>

<style scoped>
  ul li {
    margin: 10px;
  }
</style>