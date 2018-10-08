<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
    <!-- 底部 -->
    <!-- <div class="footer clearfix">    
        <div class="footer-left">
            <div>
                <div style="float:left;margin-left:10px;min-width: 180px;">客服热线：<span>11111111111</span></div>
                <div style="float:left;margin-left:10px;min-width: 180px;">QQ：<span>11111111111</span></div>
            </div>
        </div>
        <div class="footer-right clearfix">
            <div style="float:right;margin-right:10px">2018-05-21 17:30:00</div>
        </div>
    </div> -->

  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
      return {
          reload: this.reload
      }
  },
  data() {
      return {
          isRouterAlive:true
      }
  },
  methods:{
      reload() {
          this.isRouterAlive = false
          this.$nextTick(function(){
              this.isRouterAlive = true
          })
      }
  }
}
</script>

<style lang="less">
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,button,textarea,p,blockquote,th,td { margin:0; padding:0; }
body { background:#fff; color:#555; font-size:14px; font-family: Verdana, Arial, Helvetica, sans-serif; }
td,th,caption { font-size:14px; }

address, caption, cite, code, dfn, em, strong, th, var { font-style:normal; font-weight:normal;}
a { color:#555; text-decoration:none; }
a:hover { text-decoration:underline; }
img { border:none; }
ol,ul,li { list-style:none; }
input, textarea, select, button { font:14px Verdana,Helvetica,Arial,sans-serif; }
table { border-collapse:collapse; }
html {overflow-y: scroll;} 

.clearfix:after {content: "."; display: block; height:0; clear:both; visibility: hidden;}
.clearfix { *zoom:1; }

html,body,#app{
  width: 100%;
  min-width:1000px;
  height: 100%;
  overflow-y: hidden;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.el-form-item{
    font-weight: 700;
    span{
        font-weight:500
    }
}
// 底部
// .footer{
//     width:100%;
//     height: 30px;
//     line-height: 30px;
//     // border-top: 1px solid #cccccc;
//     .footer-left{
//         float: left;
//         width: 50%;
//     }
//     .footer-right{
//         float: left;
//         width: 50%;
//     }
// }
</style>
