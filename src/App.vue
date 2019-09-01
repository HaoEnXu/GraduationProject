<template>
 <div id="app">
   <router-view class="routerView"></router-view>
 </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

#app {
  width: 100%;
  height: 100%;
  background-color: #F7F9F9;
}
.routerView {
  width: 100%;
  height: 100%;
}
</style>
