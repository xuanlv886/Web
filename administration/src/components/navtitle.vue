<template>
    <div class="navtitle clearfix">
        <div class="navtitle-left">
            <div>
                <img src="../assets/logo.png" alt="">
            </div>
            <span>家居管理平台</span>
        </div>
        <div class="navtitle-right  clearfix">
            <div class="userinfoa clearfix">
                <div class="userinfo-right clearfix">
                    <div @click="cancellation">[注销]</div>
                    <div @click="Signout">[退出]</div>
                </div>

                <div class="userinfo-left clearfix">
                    <div style="border-radius:30px;margin-top:30px" v-if="userInfo.checked==0">
                        <span style="color:#ffffff">(您的账户未通过审核)</span>
                    </div>
                    <div style="margin-right:20px;heihgt:60px;color:#fff;margin-top:10px">
                        <p style="height:20px;text-align:center"> <span>欢迎您：</span> <span>{{uTrueName}}</span> </p>
                        <p style="height:20px;text-align:center"> <span>身份：</span> <span>{{urName}}</span> </p>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    
</script>
<script>

  export default {
    data() {
        return {
            userInfo:JSON.parse(sessionStorage.getItem('value')),
            uTrueName:JSON.parse(sessionStorage.getItem('value')).uTrueName,
            urName:JSON.parse(sessionStorage.getItem('value')).urName,
        }
    },
    methods:{
        cancellation(){
            this.$router.replace({path: '/'})
            sessionStorage.clear();
        },
        Signout(){
            this.$router.replace({path: '/'})
            sessionStorage.clear();
        }
    },
    //   钩子函数
    created:function(){
        // console.log(this.userInfo)
    }

}
</script>
<style lang="less">
    .navtitle{
        height: 60px;
        background:url("../assets/navimg.png") no-repeat;
        background-size: 100% 100%;
        width:100%;
        .navtitle-left{
            float: left;
            height: 60px;
            line-height: 60px;
            width:40%;
            div{
                margin-left: 40px;
                margin-top: 5px;
                float: left;
                width:50px;
                height:50px;
                // background-color: #fff;
                img{
                    width:100%;
                    height:100%;
                }
            }
            span{
                float: left;
                display: block;
                margin-left: 2%;
                color:#fff;
                font-size:20px;
            }
        }
        .navtitle-right{
            float: right;
            height: 60px;
            width:60%;
            .userinfoa{
                float: right;
                height: 60px;
                width:100%;
                .userinfo-left{
                    float: right;
                    width:50%;
                    overflow: hidden;
                    margin-right: 30px;
                    div{
                        float: right;
                        img{
                            border-radius: 60px;
                            width:100%;
                            height: 100%;
                        }
                    }
                }
                .userinfo-right{
                    float: right;
                    width:200px;
                    div{
                        color:#fff;
                        float: left;
                        width: 70px;
                        height: 60px;
                        line-height: 60px;
                        text-align: center;
                    }
                }
            }
        }
    }
</style>
