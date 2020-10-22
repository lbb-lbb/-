<template>
    <div id="main">
        <h2 class="introduce">{{article.title}}</h2>
        <div class="introduce">{{article.oldTime}}</div>
        <div class="introduce">{{article.introduce}}</div>
        <div class="markdown-body"  v-html="main"></div>
        <comment v-if="this.article.main" :name="article.name" :_id="article._id" class="comment" />
    </div>
</template>
<script>
    import comment from "../comment"
    import marked from "marked";
    import { mapState } from "vuex";
    export default {
        components:{
            comment
        },
        data() {
            return {
                main: ""
            };
        },
        computed: {
            ...mapState(["article"]),
        },
        methods:{},
        //watch：如果bingo数据发生变化，那么watch里面的bingo函数就会运行，进而改变this.main
        watch: {
            article: function() {
                if(this.article.main){
                    this.main = marked(this.article.main)

                }
            }
        },
        //使用credted的原因是要在vue数据没渲染在dom上面时候就改变数据，这里与watch配合完成变化时候数据做到变化
        created() {
            if(this.article.main){
                this.main = marked(this.article.main)
            }
        }
    };
</script>
<style scoped>
    /************************************
    这里导入了外部css样式去排版从后台中传来的html数据*/
    @import "../../github-markdown.css";
    *{
        margin: 0;
        padding: 0;
    }
    #main{
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        padding-left: 15px;
    }
    h2{
        margin: 20px 0;
    }
    .markdown-body{
        box-sizing: border-box;
        flex: 1 1 375px;
        width: 350px !important;
    }
    .comment{
        margin-top: 30px;
        flex: 1 1 700px ;
        box-sizing: border-box;
        border-top: 1px dotted #000;
    }
    .introduce{
        flex: 1 1 700px ;
    }
</style>
