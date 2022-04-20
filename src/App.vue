<template>
  <TwitCreate />
  <SearchAll />
  
</template>

<script>
import SearchAll from './components/SearchAll.vue'
import TwitCreate from './components/TwitCreate.vue'

export default {
  name: 'App',
  components: {
    SearchAll,
    TwitCreate
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
