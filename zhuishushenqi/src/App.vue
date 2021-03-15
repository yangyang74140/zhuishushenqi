<template>
  <div id="app">
    <index/>
    <router-view/>
  </div>
</template>
<script>
import index from './components/index.vue'
export default {
 components:{
   index
 }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}


</style>
