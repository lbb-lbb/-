<!-- 博客首页 -->
<template>
<div class="main">
    <Header class="header"></Header>
    <Menu class="aside"></Menu>
    <router-view class="contain"></router-view>
</div>
</template>
<script>
    import Header from '../components/header'
    import Menu from '../components/menu'
export default {
        components: {
            Header,
            Menu,
        },
        data() {
            return {};
          },
        computed: {},
        methods: {},
        mounted() {}
};
</script>
<style lang="scss" scoped>
    body{
        margin:0;
        padding:0;
        background-color: #2C3E50 ;
    }
  *{
      margin:0;
      padding:0
  }
    .main{
        display: flex;
        flex-wrap: wrap;
        width: 1200px;
        margin: 0 auto;
        background-color: #2C3E50 ;
    }
    .header{
        width: 1200px;
    }
    .aside{
        height: 600px;
        width: 200px;
    }
    .contain{
        width: 1000px;
        height: 600px;
        flex:1 1 auto;
    }
</style>