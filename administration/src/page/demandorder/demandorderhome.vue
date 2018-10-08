<template>
    <div class="demandorderhome">
        <div id="search">
            <el-form ref="search" :model="search" class="clearfix">
                <el-form-item label="订单状态：" prop="roStatus" label-width="96px">
                    <el-select v-model="search.roStatus" placeholder="请选择订单状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in roStatusList" v-bind:label="item.name" v-bind:value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="需求类型：" prop="rtId" label-width="96px">
                    <el-select v-model="search.rtId" placeholder="请选择需求类型">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in ptIdList" v-bind:label="item.rtName" v-bind:value="item.rtId" :key="item.rtId"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="需求标题：" label-width="87px">
                    <el-input v-model="search.urTitle"></el-input>
                </el-form-item>
                <el-form-item label="发布人：" label-width="90px">
                    <el-input v-model="search.urTrueName"></el-input>
                </el-form-item>
                <el-form-item label="联系人电话：" label-width="105px">
                    <el-input v-model="search.urTel"></el-input>
                </el-form-item>
                <el-form-item style="width:70px">
                    <el-button type="primary" @click="onSubmit(search)">查找</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="content">
            <template>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="rtName" label="需求类型" width="150"></el-table-column>
                    <el-table-column prop="urTitle" label="需求标题"></el-table-column>
                    <el-table-column prop="urTrueName" label="发布人"></el-table-column>
                    <el-table-column prop="roConfirmTime" label="接单时间"></el-table-column>
                    <el-table-column prop="roStatus" label="订单状态"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="80">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleClick(dialogFormVisible, scope.row)">查看</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </template>

            <!-- 分页 -->
            <div class="pageSizes">
                <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper" :total="totalCount"></el-pagination>
                </div>
            </div>

        </div>
        <!-- 查看弹框 -->
        <el-dialog class="bomb" title="订单详情" :visible.sync="dialogFormVisible" :close-on-click-modal='false'>
            <el-form :model="form"  ref="form" class="demo-ruleForm clearfix"  label-position="left">
                <p style="font-size:15px;font-weight:700;margin-top:-13px">订单状态：<span>{{form.roStatus}}</span> </p>
                <el-form-item label="需求标题：" prop="urTitle">
                    <span>{{form.urTitle}}</span>
                </el-form-item>
                <el-form-item label="需求类型：" prop="rtName">
                    <span>{{form.rtName}}</span>
                </el-form-item>
                <el-form-item label="需求报价：" prop="roTotalPrice">
                    <span>{{form.roTotalPrice}} 元</span>
                </el-form-item>
                <el-form-item label="需求发布时间：" prop="urCreateTime">
                    <span>{{form.urCreateTime}}</span>
                </el-form-item>
                <el-form-item label="需求描述：" prop="urContent" label-width="87px" style="width:660px;">
                    <el-input type="textarea" :autosize="{minRows: 4}" readonly placeholder="暂无" v-model="form.urContent" resize="none"></el-input>
                </el-form-item>
                <el-form-item label="发布人：" prop="urTrueName">
                    <span>{{form.urTrueName}}</span>
                </el-form-item>
                <el-form-item label="联系电话：" prop="urTel">
                    <span>{{form.urTel}}</span>
                </el-form-item>
                <el-form-item label="联系地址：" prop="urAddress" label-width="87px" style="width:660px;">
                    <el-input type="textarea" :autosize="{minRows: 4}" readonly placeholder="暂无" v-model="form.urAddress" resize="none"></el-input>
                </el-form-item>
                <el-form-item label="订单号：" prop="roOrderId">
                    <span>{{form.roOrderId}}</span>
                </el-form-item>
                <el-form-item label="创建时间：" prop="roCreateTime">
                    <span>{{form.roCreateTime}}</span>
                </el-form-item>
                <el-form-item label="订单完成时间：" prop="roOverTime">
                    <span>{{form.roOverTime}}</span>
                </el-form-item>
                <el-form-item label="用户确认时间：" prop="roConfirmTime">
                    <span>{{form.roConfirmTime}}</span>
                </el-form-item>
                <div v-if="FormBlock">
                    <el-form-item label="取货时间：" prop="roGetTime">
                        <span>{{form.roGetTime}}</span>
                    </el-form-item>
                    <el-form-item label="验货图片：">
                        <span>{{PicLength}} 张</span> <el-button type="text" :disabled="dsabledClick" @click="QinnerVisible1 = true">查看</el-button>
                    </el-form-item>
                    <el-form-item label="取货地址：" prop="urGetAddress" label-width="87px" style="width:660px">
                        <el-input type="textarea" :autosize="{minRows: 4}" readonly placeholder="暂无" v-model="form.urGetAddress" resize="none"></el-input>
                    </el-form-item>
                </div>
                <!-- 查看图片 -->
                <el-dialog width="600px" title="图片展示" :visible.sync="QinnerVisible1" append-to-body>
                    <div class="block">
                        <el-carousel trigger="click" height="300px">
                            <el-carousel-item v-for="item in form.pics" :key="item.pNo">
                                <img :src="item.url" alt="" style="width:100%;height:100%">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </el-dialog>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
  import qs from 'qs';
  import axios from 'axios';
  import api from '../../api/api.js'
  export default {
      inject:['reload'],
    data() {
      return {
        userInfo:JSON.parse(sessionStorage.getItem('value')),
        //   搜索
        search: {
          roStatus: '',
          rtId: '',
          urTitle: '',
          urTrueName: '',
          urTel: '',
        },
        // 数据
        tableData: [],
        // 分页
        currentPage: 1, //  默认显示第几页
        pageSize: 12, //  每页显示多少条数据
        totalCount: 1, //  数据的总条数
        // 弹框
        dialogFormVisible:false,
        // 弹框
        QinnerVisible1:false,

        form:{},
        // 图片张数
        PicLength:'',
        // 禁用
        dsabledClick:false,
        FormBlock:false,

        roStatusList:[],
        ptIdList:[],
        // 分页
        a1:'',
        a2:'',
        a3:'',       
        a4:'',   
        a5:'',   

      }
    },
    methods: {

        // 获取某商户的需求订单列表接口
        getDataList:function(n1,n2,n3,n4,n5,n6,n7){
            // console.log(this.userInfo)
            axios.post(api.api.url+n1,qs.stringify({
                uId:this.userInfo.uId,
                sId:this.userInfo.sId,
                roStatus:n2,
                rtId:n3,
                urTitle:n4,
                urTrueName:n5,
                urTel:n6,
                start:n7,
                end:this.pageSize,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse.data)
                // 订单状态
                for(var i=0;i<reponse.data.data.orders.length;i++){
                    // console.log(reponse.data.data.orders[i].roStatus)
                    if(reponse.data.data.orders[i].roStatus==0){
                        reponse.data.data.orders[i].roStatus='待确认'
                    }
                    if(reponse.data.data.orders[i].roStatus==1){
                        reponse.data.data.orders[i].roStatus='进行中'
                    }
                    if(reponse.data.data.orders[i].roStatus==2){
                        reponse.data.data.orders[i].roStatus='已完成'
                    }
                    if(reponse.data.data.orders[i].roStatus==3){
                        reponse.data.data.orders[i].roStatus='取货中'
                    }
                    if(reponse.data.data.orders[i].roStatus==4){
                        reponse.data.data.orders[i].roStatus='待验货'
                    }
                    if(reponse.data.data.orders[i].roStatus==5){
                        reponse.data.data.orders[i].roStatus='送货中'
                    }
                    if(reponse.data.data.orders[i].roStatus==6){
                        reponse.data.data.orders[i].roStatus='已评价'
                    }
                    if(reponse.data.data.orders[i].roStatus==7){
                        reponse.data.data.orders[i].roStatus='待接单'
                    }
                }

                this.tableData=reponse.data.data.orders
                this.totalCount=reponse.data.data.totalCount;
            }) 
        },
        getData:function(){

            // 获取需求类型列表接口
            axios.post(api.api.url+'msGetRequirementTypeList',qs.stringify({
                uId:this.userInfo.uId,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse.data.data)
                this.ptIdList=reponse.data.data
            }) 
            
            // 获取需求订单状态列表接口
            axios.post(api.api.url+'msGetRequirementOrderStatusList',qs.stringify({
                uId:this.userInfo.uId,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse.data.data)
                this.roStatusList=reponse.data.data
            }) 

            this.getDataList('msGetRequirementOrderListWithCondition','','','','','','0')
        },

        // 分页
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.getDataList('msGetRequirementOrderListWithCondition',this.a1,this.a2,this.a3,this.a4,this.a5,(val-1)*(this.pageSize))
        },

        // 搜索
        onSubmit() {
            // console.log(this.search);
            this.a1=this.search.roStatus
            this.a2=this.search.rtId
            this.a3=this.search.urTitle
            this.a4=this.search.urTrueName
            this.a5=this.search.urTel
            this.getDataList('msGetRequirementOrderListWithCondition',this.a1,this.a2,this.a3,this.a4,this.a5,'0')
            this.currentPage=1
        },
        // 数据查看
        handleClick(dialogFormVisible,row) {
            // console.log(row);
            if(row.pics!=null){
                this.PicLength=row.pics.length;
                if(row.pics.length==0){
                    this.dsabledClick=true
                }else{
                    this.dsabledClick=false
                }
            }
            this.form=row
            this.dialogFormVisible=true
            if(row.rtName=='取货送货'){
                this.FormBlock=true
            }else{
                this.FormBlock=false
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
    #search{
        width: 100%;
        .el-form-item{
            margin: 5px;
            float: left;
            width: 220px;
            .el-form-item__label{
                padding: 0;
                width: 90px;
            }
        }
    }
    .demandorderhome{
        min-height: 800px;
        height:100%;
        .content{
            position: relative;
            margin: 10px auto;
            width: 99%;
            height: 87%;
            border:1px solid #EBEEF5;
            // 分页
            .pageSizes{
                position: absolute;
                left: 0;
                bottom: 30px;
                text-align: center;
                width: 100%;
                height: 60px;
                overflow: hidden;
                .block{
                    margin: 10px auto;
                    width: 70%;
                }
            }
        }
    }
    // 弹框
    .bomb{
        min-width: 1000px;
        .el-dialog{
            .demo-ruleForm{
                .el-form-item{
                    float: left;
                    width: 50%;
                }
            }
        }
    }
    .el-dialog__header{
        background-color: #358DEE;
    }
    // 按钮
    .el-form-item__content{
        width: 100%;
        float: right;
    }
    .el-dialog__body{
        margin-bottom: 0;
    }
</style>

