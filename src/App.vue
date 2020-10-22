<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import {setSessionStorage,getSessionStorage} from "./methods/common"
import {mapMutations} from 'vuex'
export default {
  components: {},
  methods:{
    ...mapMutations(['setState'])
  },
  mounted() {
    window.addEventListener('beforeunload',()=>{   //监听刷新前保存好vuex数据
      setSessionStorage('user',this.$store.state)
    })
    window.addEventListener('load',()=>{          //监听刷新后获取之前保存的vuex数据
      if(!getSessionStorage('user')) return
      this.setState(getSessionStorage('user'))
      sessionStorage.removeItem('user')                           //及时清除保存的数据
    })
  }

}
</script>

<style>
*{
  text-decoration: none;
}
</style>
