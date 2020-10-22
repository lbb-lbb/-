<!-- 博客首页 -->
<template>
<div class="main">
    <Header class="header">
        <slot>
            <i @click="switchAside" class="el-icon-menu"></i>
        </slot>
    </Header>
    <transition name="line">
        <Menu v-show="state" class="aside"></Menu>
    </transition>
    <transition name="fade">
        <router-view class="contain"></router-view>
    </transition>
</div>
</template>
<script>
    import Header from '../components/serve/top/header'
    import Menu from '../components/serve/menu/menu'

    export default {
        components: {
            Header,
            Menu,
        },
        data() {
            return {
                state:true,
            };
          },
        computed: {},
        methods: {
            switchAside(){
                this.state=!this.state
            },
            getScreen(){
                let clientWidth = document.body.clientWidth
                if(clientWidth>700){
                    this.state=true
                }
                if(clientWidth<700){
                    this.state=false
                }
                if(clientWidth<600){
                    this.$store.state.search=false
                }
                else {
                    this.$store.state.search=true
                }
            }
        },
        mounted() {
            addEventListener('resize',()=>{
               this.getScreen()
            })
        },
        beforeDestroy() {
            window.removeEventListener('resize',()=>{
                this.getScreen()
            })
        }
    };
</script>
<style lang="scss" scoped>
    /* 超小设备（手机，小于 768px） */
  @media screen and (min-width:300px){
      *{
          margin:0;
          padding:0
      }
      .main{
          display: flex;
          flex-wrap: wrap;
          margin: 0 auto;
          position: relative;
      }
      .aside{
          width: 200px;
          top:50px;
          position: absolute;
          z-index: 10;
      }
      .header{
          flex: 0 0 100%;
      }
      i{
          margin-right: 10px;
      }
      .contain{
          flex: 1 1 auto;
      }
      .line-enter-active, .line-leave-active {
          transition: all .2s linear;
          transform: translate3d(0, 0, 0);
      }
      .line-enter, .line-leave-to /* .fade-leave-active below version 2.1.8 */ {
          transform: translate3d(-200px, 0, 0);
      }
      .fade-enter-active, .fade-leave-active {
          transition: opacity .3s;
          opacity: 0;
      }
      .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
          transition: opacity .3s;
          opacity: 0;
      }
  }
    /* 小型设备（平板电脑，768px 起） */
    @media screen and (min-width:768px) {
        *{
            margin:0;
            padding:0
        }
        .main{
            display: flex;
            flex-wrap: wrap;
            width: 768px;
            margin: 0 auto;
        }
        .header{
            flex: 0 0 768px;
        }
        .aside{
           position: static;
        }
        .contain{
            flex: 1 1 568px;
        }
        i{
            display: none;
        }
    }
    /* 中型设备（台式电脑，992px 起） */
    @media screen and (min-width:992px){
        .main{
            display: flex;
            flex-wrap: wrap;
            width: 992px;
            margin: 0 auto;
        }
        .header{
            flex: 0 0 992px;
        }

        .contain{
            flex: 1 1 792px;
        }
    }
    /* 大型设备（大台式电脑，1200px 起） */
    @media screen and (min-width:1200px){
        *{
            margin:10px 0 auto;
            padding:0
        }
        .main{
            display: flex;
            flex-wrap: wrap;
            width: 1200px;
            margin: 0 auto;
        }
        .header{
            flex: 0 0 1200px;
        }

        .contain{
            height: 600px;
            flex:1 1 1000px;
        }
    }
</style>