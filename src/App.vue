<template>
  <div id="app">
    <!-- <svg-icon icon-class="home" /> -->
    <router-view />
    <!-- <img
      v-imgerror="defaultUrl"
      src="https://www.itheima.com/image/logo.png"
      alt=""
    /> -->
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      // defaultUrl:
      //   "http://yun.itheima.com/Upload/Images/20220722/62da600e97fcf.jpg",
    };
  },
};
</script>
