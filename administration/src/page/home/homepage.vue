<template>
    <div class="homepage">
        <!-- 时间地点 -->
        <!-- <div class="homepage-title">
            <div style="margin-left:10px">
                上次登陆地：<span>石家庄</span>
            </div>
            <div>
                上次登陆事件：<span>2018-05-21 14:30:00</span>
            </div>
        </div> -->

        <!-- 管理元 -->
        <!-- 系统公告列表 -->
        <div class="SystemBulletin">
            <div class="SystemBulletin-tit">
                <div style="margin-left:10px">公告列表</div>
            </div>
            <template>
                <el-table :data="tableData" style="width: 100%" max-height="227">
                    <el-table-column fixed prop="snCreateTime" label="创建时间"></el-table-column>
                    <el-table-column prop="snTitle" label="标题"></el-table-column>
                    <el-table-column prop="uTrueName" label="发布人"></el-table-column>
                    <el-table-column prop="snContent" label="内容"></el-table-column>
                    <el-table-column label="操作" width="80">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <!-- 查看弹框 -->
        <el-dialog class="bomb" title="公告内容" :visible.sync="dialogFormVisible" :close-on-click-modal='false'>
            <el-form :model="form"  ref="form" class="demo-ruleForm clearfix" label-position="left">
            <el-form-item label="标题：" prop="snTitle" label-width="60px">
                <el-input v-model="form.snTitle" readonly></el-input>
            </el-form-item>
            <el-form-item label="内容：" prop="snContent" label-width="60px">
                <el-input type="textarea" :autosize="{minRows: 6}" placeholder="请输入内容" v-model="form.snContent" readonly resize="none"></el-input>
            </el-form-item>
            <el-form-item label="发布人：" prop="uTrueName">
                <span>{{form.uTrueName}}</span>
            </el-form-item>
            <el-form-item label="发布时间：" prop="snCreateTime">
                <span>{{form.snCreateTime}}</span>
            </el-form-item>
            </el-form>
        </el-dialog>



        <div class="SystemBulletin-right clearfix" :data="IndexInfo" v-if="this.userInfo.urName=='系统管理员'||this.userInfo.urName=='系统子管理员'">
            <div class="SystemBulletin-right-first1">
                <p>{{IndexInfo.totalUser}}</p>
                <p>平台总用户</p>
            </div>
            <div class="SystemBulletin-right-first1">
                <p>{{IndexInfo.storeUser}}</p>
                <p>平台已入驻商户</p>
            </div>
            <div class="SystemBulletin-right-first1">
                <p>{{IndexInfo.normalUser}}</p>
                <p>平台用户</p>
            </div>
            <div class="SystemBulletin-right-first1">
                <p>{{IndexInfo.totalRequirement}}</p>
                <p>平台需求总数</p>
            </div>
            <div class="SystemBulletin-right-first1">
                <p>{{IndexInfo.todayRequirement}}</p>
                <p>今日发布需求数</p>
            </div>
            <div class="SystemBulletin-right-first1">
                <p>{{IndexInfo.yestodayRequirement}}</p>
                <p>昨日发布需求数</p>
            </div>
            <div class="SystemBulletin-right-first1">
                <p>{{IndexInfo.todayOverRequirement}}</p>
                <p>今日已完成需求数</p>
            </div>
            <div class="SystemBulletin-right-first1">
                <p>{{IndexInfo.totalProduct}}</p>
                <p>平台商品总数</p>
            </div>
            <div class="SystemBulletin-right-first1">
                <p>{{IndexInfo.todayProduct}}</p>
                <p>今日发布商品数</p>
            </div>
            <div class="SystemBulletin-right-first1">
                <p>{{IndexInfo.yestodayProduct}}</p>
                <p>昨日发布商品数</p>
            </div>
            <div class="SystemBulletin-right-first1">
                <p>{{IndexInfo.todayOverOrder}}</p>
                <p>今日已完成订单数</p>
            </div>
            <div class="SystemBulletin-right-first1">
                <p>{{IndexInfo.todayBackOrder}}</p>
                <p>今日退款订单数</p>
            </div>
            <div class="SystemBulletin-right-first1">
                <router-link :to="{name: 'merchantmanagehome', params: {sChecked: 0}}">
                    <p style="color:#358DEE;font-weight:700">{{IndexInfo.uncheckStore}}</p>
                    <p style="color:#358DEE;">待审核商户数</p>
                </router-link>
            </div>
            <div class="SystemBulletin-right-first1">
                <router-link :to="{name: 'goodsmangehome', params: {pChecked: 0}}">
                    <p style="color:#358DEE;font-weight:700">{{IndexInfo.uncheckProduct}}</p>
                    <p style="color:#358DEE;">待审核商品数</p>
                </router-link>
            </div>
            <div class="SystemBulletin-right-first1">
                <router-link :to="{name: 'systemuserdrawing', params: {utcrStatus: 0}}">
                    <p style="color:#358DEE;font-weight:700">{{IndexInfo.uncheckApplyToCash}}</p>
                    <p style="color:#358DEE;">待审核提现请求</p>
                </router-link>
            </div>
        </div>

        <!-- 个人评级 -->
        <div class="SystemBulletin-cont clearfix"  v-if="this.userInfo.urName=='个人商户'">
            <div class="SystemBulletin-cont-left clearfix">
                <div class="StBfirst">
                    <p>{{IndexInfo.completeOrderNum}}</p>
                    <p>已完成需求订单</p>
                </div>
                <div class="StBfirst">
                    <p>{{IndexInfo.unConfirmOrderNum}}</p>
                    <p>待确认需求订单</p>
                </div>
                <div class="StBfirst">
                    <p>{{IndexInfo.doingOrderNum}}</p>
                    <p>进行中需求订单</p>
                </div>
                <div class="StBfirst">
                    <p>{{IndexInfo.yestodayCompleteMoney}}</p>
                    <p>昨日成交额（元）</p>
                </div>
                <div class="StBfirst">
                    <p>{{IndexInfo.todayCompleteMoney}}</p>
                    <p>今日成交额（元）</p>
                </div>
                <div class="StBfirst">
                    <p>{{IndexInfo.totalCompleteMoney}}</p>
                    <p>总成交额（元）</p>
                </div>
            </div>
            <div class="SystemBulletin-cont-cont">
                <div class="content">
                    <div class="content-title">
                        <span style="margin-left:10px">我的安排</span>
                    </div>
                    <router-link :to="{name: 'myarrange'}">
                        <div style="color:#358DEE;text-align:center;height:170px;line-height:170px;font-size:80px">{{IndexInfo.myArrangeNum}} <span style="font-size:24px">项</span> </div>
                    </router-link>
                </div>
            </div>
            <div class="SystemBulletin-cont-right">
                <div class="content">
                    <div class="content-title">
                        <span style="margin-left:10px">我的评级</span>
                    </div>
                    <div style="text-align:center;">
                        <el-rate style="margin-top:70px;font-size:30px" v-model="IndexInfo.sLevel" disabled show-score disabled-void-color='#c0c4cc' text-color="#ff9900" score-template=""></el-rate>    
                    </div>
                </div>
            </div>
        </div>


        <!-- 企业评级 -->
        <div class="SystemBulletin-cont clearfix"  v-if="this.userInfo.urName=='企业商户'">
            <div class="SystemBulletin-cont-left clearfix">
                <div class="StBfirst">
                    <p>{{IndexInfo.completeOrderNum}}</p>
                    <p>已完成的需求订单</p>
                </div>
                <div class="StBfirst">
                    <p>{{IndexInfo.unConfirmOrderNum}}</p>
                    <p>待确认的需求订单</p>
                </div>
                <div class="StBfirst">
                    <p>{{IndexInfo.doingOrderNum}}</p>
                    <p>进行中的需求订单</p>
                </div>
                <div class="StBfirst">
                    <p>{{IndexInfo.yestodayCompleteMoney}}</p>
                    <p>昨日成交额（元）</p>
                </div>
                <div class="StBfirst">
                    <p>{{IndexInfo.todayCompleteMoney}}</p>
                    <p>今日成交额（元）</p>
                </div>
                <div class="StBfirst">
                    <p>{{IndexInfo.totalCompleteMoney}}</p>
                    <p>总成交额（元）</p>
                </div>
            </div>
            <div class="SystemBulletin-cont-cont">
                <div class="content">
                    <div class="content-title">
                        <span style="margin-left:10px">我的安排</span>
                    </div>
                    <router-link :to="{name: 'myarrange'}">
                        <div style="color:#358DEE;text-align:center;height:170px;line-height:170px;font-size:80px">{{IndexInfo.myArrangeNum}} <span style="font-size:24px">项</span> </div>
                    </router-link>
                </div>
            </div>
            <div class="SystemBulletin-cont-right">
                <div class="content">
                    <div class="content-title">
                        <span style="margin-left:10px">我的评级</span>
                    </div>
                    <div style="text-align:center;">
                        <el-rate style="margin-top:70px;font-size:30px" v-model="IndexInfo.sLevel" disabled show-score disabled-void-color='#c0c4cc' text-color="#ff9900" score-template=""></el-rate>    
                    </div>
                </div>
            </div>
            <div class="SystemBulletin-cont-left" style="width:99.9%;margin-top:10px;">
               <div class="StBfirst" style="width:16.66%">
                    <p>{{IndexInfo.todayProductOrderNum}}</p>
                    <p>今日商品订单数</p>
                </div>
                <div class="StBfirst" style="width:16.66%">
                    <p>{{IndexInfo.unReundProductOrderNum}}</p>
                    <p>退款中订单数</p>
                </div>
                <div class="StBfirst" style="width:16.66%">
                    <p>{{IndexInfo.unPayProductOrderNum}}</p>
                    <p>待付款订单数</p>
                </div>
                <div class="StBfirst" style="width:16.66%">
                    <p>{{IndexInfo.unDeliverProductOrderNum}}</p>
                    <p>待发货订单数</p>
                </div>
                <div class="StBfirst" style="width:16.66%">
                    <p>{{IndexInfo.completeProductOrderNum}}</p>
                    <p>已完成订单数</p>
                </div>
                <div class="StBfirst" style="width:16.66%">
                    <p>{{IndexInfo.yestodayProductOrderMoney}}</p>
                    <p>昨日成交额（元）</p>
                </div>
                <div class="StBfirst" style="width:16.66%">
                    <p>{{IndexInfo.todayProductOrderMoney}}</p>
                    <p>今日成交额（元）</p>
                </div>
                <div class="StBfirst" style="width:16.66%">
                    <p>{{IndexInfo.ProductOrderMoney}}</p>
                    <p>总成交额（元）</p>
                </div>

            </div>

        </div>


        <!-- NO1 -->
        <div class="ListNo1" v-if="this.userInfo.urName=='个人商户' || this.userInfo.urName=='企业商户'">
            <div class="listNo1-title">NO1列表</div>
            <div class="listNo1-cont">
                <table border="1">
                    <tbody>
                        <tr>
                            <td>成交额贡献No.1</td>
                            <td>{{IndexInfo.firstRtNameOfMoney}}</td>
                        </tr>
                        <tr>
                            <td>需求单价No.1</td>
                            <td>{{IndexInfo.firstOfRequirementPrice}}</td>
                        </tr>
                        <tr>
                            <td>接单数量No.1</td>
                            <td>{{IndexInfo.firstRoNum}}</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    </div>
</template>
<script>
  import qs from 'qs';
  import axios from 'axios';
  import api from '../../api/api.js'
  export default {
    data() {
        return {
            userInfo:JSON.parse(sessionStorage.getItem('value')),
            tableData: [],
            form:{},
            dialogFormVisible:false,
            IndexInfo:{},

            tableData1: [],
            
            // 评级
            value: 3.6
        }
    },

    methods: {
        handleClick(row) {
            // console.log(row);
            this.form=row
            this.dialogFormVisible=true;
        },

        getDataList:function(a1,a2){
            // 获取系统公告列表接口
            axios.post(api.api.url+a1,qs.stringify({
                uId:this.userInfo.uId
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse.data.data)
                this.tableData=reponse.data.data
            })

            // 获取管理员首页相关数据信息接口 
            axios.post(api.api.url+a2,qs.stringify({
                uId:this.userInfo.uId,
                sId:this.userInfo.sId
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse.data.data)
                if(this.userInfo.urName!='系统管理员'&&this.userInfo.urName!='系统子管理员'){
                    if(reponse.data.data.firstOfRequirementPrice!='暂无'){
                        reponse.data.data.firstOfRequirementPrice=reponse.data.data.firstOfRequirementPrice.substring(5)
                    }
                    if(reponse.data.data.firstRoNum!='暂无'){
                        reponse.data.data.firstRoNum=reponse.data.data.firstRoNum.substring(5)
                    }
                    if(reponse.data.data.firstRtNameOfMoney!='暂无'){
                        reponse.data.data.firstRtNameOfMoney=reponse.data.data.firstRtNameOfMoney.substring(5)
                    }
                }
                this.IndexInfo=reponse.data.data
            })
            
        },

        getData:function(){
            if(this.userInfo.urName=='系统管理员'||this.userInfo.urName=='系统子管理员'){
                this.getDataList('msGetSysNoticeList','msGetAdminIndexInfo')
            }else if(this.userInfo.urName=='个人商户'){
                this.getDataList('msGetSysNoticeList','msGetPersonalIndexInfo')
            }else if(this.userInfo.urName=='企业商户'){
                this.getDataList('msGetSysNoticeList','msGetCompanyIndexInfo')
            }
        },

    },
    //   钩子函数
    created:function(){
      this.getData()
    }
  }    
</script>
<style lang="less" scoped>

    a {
        text-decoration: none;
    }
    // a:hover{ color: #358dee}
    .homepage{
        min-height: 1000px;
        // height:100%;
        position: relative;
        width:99.4%;
        // height: 100%;
        margin: 0 auto;
        // background-color: #f8f8f8;
        background-color: #ffffff;
        // overflow: hidden;
        .homepage-title{
            margin-top: 5px;
            width: 100%;
            height: 30px;
            line-height: 30px;
            border: 1px solid #F1F1F1;
            border-radius: 5px 5px 0px 0px;
            div{
                float: left;
                min-width:200px;
            }
        }
        
        .SystemBulletin{
            margin-top: 10px;
            width: 100%;
            .SystemBulletin-tit{
                width: 100%;
                height: 33px;
                line-height: 33px;
                color:#ffffff;
                background-color: #35c2ed;
                border-radius: 5px 5px 0px 0px;          
                font-size: 16px;      
            }
        }
    }

    .SystemBulletin-cont{
        margin-top: 10px;
        width:100%;
        .SystemBulletin-cont-left{
            border: 1px solid #E5E5E5;
            border-radius: 5px;
            float: left;
            width:58%;
            height: 200px;
            .StBfirst{
                overflow: hidden;
                float: left;
                width: 33.33%;
                height: 100px;
                p{
                    margin-top: 20px;
                    text-align: center;
                }
            }
        }
        .SystemBulletin-cont-cont{
            float: left;
            width:19.6%;
            height: 200px;
            .content{
                border: 1px solid #E5E5E5;
                border-radius: 5px;
                margin: 0 auto;
                height: 200px;
                width: 90%;
                .content-title{
                    height: 30px;
                    line-height: 30px;
                    font-size: 16px;
                    color:#ffffff;
                    width: 100%;
                    background-color: #35c2ed;
                    border-radius: 5px 5px 0px 0px;  
                }
            }
        }
        .SystemBulletin-cont-right{
            float: left;
            width:22%;
            height: 200px;
            .content{
                border: 1px solid #E5E5E5;
                border-radius: 5px;
                margin: 0 auto;
                height: 200px;
                width: 100%;
                .content-title{
                    height: 30px;
                    line-height: 30px;
                    font-size: 16px;
                    color:#ffffff;
                    width: 100%;
                    background-color: #35c2ed;
                    border-radius: 5px 5px 0px 0px;  
                }
            }
        }
    }
    .SystemBulletin-right{
        margin-top: 10px;
        // height: 200px;
        width: 100%;
        border: 1px solid #E5E5E5;
        border-radius: 5px;
        .SystemBulletin-right-first1{
            float: left;
            width: 16.6%;
            height: 100px;
            p{
                text-align: center;
                margin-top: 20px;
            }
        }
    }


    // No1
    .ListNo1{
        margin-top: 10px;
        width:100%;
        // height: 300px;
        border: 1px solid #ccc;
        border-bottom: none;
        border-radius: 5px;
        overflow: hidden;
        .listNo1-title{
            padding-left: 10px;
            width:100%;
            height: 30px;
            line-height: 30px;
            font-size: 16px;
            color:#ffffff;
            width: 100%;
            background-color: #35c2ed;
            border-radius: 5px 5px 0px 0px;             
        }
        .listNo1-cont{
            width:100%;
            table{
                border:none;
                width:100%;
                height: 100%;
                thead{
                    width: 100%;
                    tr{
                        border-bottom: .5px solid #ccc;
                        text-align: left;
                        height: 40px;
                        th{
                            font-size:15px;
                            font-weight: 700;
                            width:50%;
                            padding-left: 10px;
                            overflow: hidden;                            
                            border-right: .5px solid #ccc;
                        }
                    }
                }
                tbody{
                    width:100%;
                    tr{
                        border-bottom: .5px solid #ccc;
                        text-align: left;
                        height: 46px;
                        td{
                            width:50%;
                            padding-left: 10px;
                            overflow: hidden;
                            border-right: .5px solid #ccc;
                        }
                    }                   
                }
            }
        }

    }

</style>

