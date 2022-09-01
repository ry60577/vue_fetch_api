<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div>IP： {{ ip }}</div>
  <div>INFO： {{ info }}</div>  
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import { onBeforeMount, reactive, toRefs } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import { apiGetIP, apiGetPersonInfo } from './api/api'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  setup() {
    const state = reactive({
      ip: '',
      info: '',
    })
    onBeforeMount(async () => {
      const res = await apiGetIP()
      state.ip = res.ip
      const person_res = await apiGetPersonInfo(state.ip)
      state.info = person_res
    })

    return {
      ...toRefs(state)
    }
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
