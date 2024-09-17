<template>
  <div class="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>


export default {
  name: 'app',
  data() {
    return {
      isRouterAlive: true
    }
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  methods: {
    reload() {
      console.log("调用了 reload")
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
.app {
  /* padding: 10px;
  box-sizing: border-box; */
}
</style>
