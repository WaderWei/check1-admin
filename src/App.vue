<template>
  <div id="app">
      <router-view/>
  </div>
</template>
<script>
let hrt = document.documentElement.clientHeight
// 获取当前可视区域的高度存到hrt变量
window.onload = function () { // 在页面整体加载完毕时
  document.getElementById('app').style.height = hrt + 'px'// 把获取到的高度赋值给根div
}
</script>
<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  touch-action: none;
}

#nav {
  padding: 30px;
  font-size: 32px;
  line-height: 1.2;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #fc9153;
}
</style>
