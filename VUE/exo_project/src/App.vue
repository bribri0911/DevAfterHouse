<template>
  <div id="app">
    <nav>
      <router-link to="/">Accueil</router-link>
      <router-link to="/a-propos">À propos</router-link>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style>
nav {
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: end;
}
nav > *{
  margin: 0 10px;
}

router-link {
  margin-right: 15px;
  text-decoration: none;
  color: #42b983;
}

router-link:hover {
  text-decoration: underline;
}
</style>
