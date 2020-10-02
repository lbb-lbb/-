<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import {setSessionStorage,getSessionStorage} from "./common"
import {mapMutations} from 'vuex'
export default {
  components: {},
  methods:{
    ...mapMutations(['setState'])
  },
  mounted() {
    window.addEventListener('beforeunload',()=>{   //监听刷新前保存好vuex数据
      if(!this.$store.state.user.name) return
      setSessionStorage('user',this.$store.state)
    })
    window.addEventListener('load',()=>{          //监听刷新后获取之前保存的vuex数据
      if(!getSessionStorage('user')) return
      this.setState(getSessionStorage('user'));
      sessionStorage.removeItem('user')                           //及时清除保存的数据
    })
  }

}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
</style>
