<template>
    <div class="goodsorderhome">
        <div id="search">
            <el-form ref="search" :model="search" class="clearfix">
            <el-form-item label="订单号：" label-width="86px">
                <el-input v-model="search.poOrderId"></el-input>
            </el-form-item>
            <el-form-item label="订单状态：" prop="poStatus" label-width="96px">
                <el-select v-model="search.poStatus" placeholder="请选择订单状态">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in ptIdList" v-bind:label="item.name" v-bind:value="item.id" :key="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="收货人：" label-width="80px">
                <el-input v-model="search.poDeliverName"></el-input>
            </el-form-item>
            <el-form-item label="收货人电话：" label-width="107px">
                <el-input v-model="search.poDeliverTel"></el-input>
            </el-form-item>
            <el-form-item style="width:70px">
                <el-button type="primary" @click="onSubmit(search)">查找</el-button>
            </el-form-item>
            </el-form>
        </div>
        <div class="content">
            <template>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column fixed prop="poOrderId" label="订单号" width="180"></el-table-column>
                    <el-table-column prop="uAccount" label="用户账号"></el-table-column>
                    <el-table-column prop="poDeliverName" label="收货人姓名"></el-table-column>
                    <el-table-column prop="poTotalPrice" label="总金额"></el-table-column>
                    <el-table-column prop="poStatus" label="订单状态"></el-table-column>
                    <el-table-column prop="psNmae" label="支付方式"></el-table-column>
                    <el-table-column prop="poPayTime" label="付款时间"></el-table-column>
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
        <el-dialog class="bomb" title="订单详情" :visible.sync="dialogFormVisible"  :close-on-click-modal='false'>
            <el-form :model="form"  ref="form" class="demo-ruleForm clearfix">
                <template>
                <el-table :data="form.orderDetails" style="width: 100%" max-height="250">
                    <el-table-column prop="pName" label="商品名称"></el-table-column>
                    <el-table-column prop="podProperty" label="商品属性"></el-table-column>
                    <el-table-column prop="podPrice" label="商品单价"></el-table-column>
                    <el-table-column prop="podNum" label="商品数量"></el-table-column>
                </el-table>
                </template>
                <div class="userInfo clearfix">
                    <div class="userInfo-right">
                        <div v-show="alreadyPayMoneyShow">实付款：<span style="font-size:20px;color:#589EEF;"> ￥{{form.poTotalPrice}}</span> </div>
                        <div v-show="unPayMoneyShow">待付款：<span style="font-size:20px;color:#589EEF;"> ￥{{form.poTotalPrice}}</span> </div>
                        <div >寄送至：<span style="color:#C2C2C2;">{{form.poDeliverAddress}}</span> </div>
                        <div >收货人：<span style="color:#C2C2C2;">{{form.poDeliverName}} {{form.poDeliverTel}}</span> </div>
                    </div>
                </div>
                <el-form-item style="float:right;margin-bottom:0px" class="clearfix" v-show="sendBtnShow">
                    <el-button type="primary" @click="submitForm('form')" style="float:right;">确认发货</el-button>
                </el-form-item>
                <el-form-item style="float:right;margin-bottom:0px" class="clearfix" v-show="refundBtnShow">
                    <el-button type="primary" @click="refundForm('form')" style="float:right;">确认退款</el-button>
                </el-form-item>
            </el-form>
            <el-dialog width="30%" title="填写快递信息" :visible.sync="innerVisible" append-to-body>
                <el-form :model="formInfo" ref="formInfo" :rules="rules" class="demo-ruleForm clearfix">
                    <el-form-item label="快递公司：" label-width="100px" prop="poDeliverCompany">
                        <el-input v-model="formInfo.poDeliverCompany" placeholder="请输入快递公司"></el-input>
                    </el-form-item>
                    <el-form-item label="快递单号：" label-width="100px" prop='poDeliverCode'>
                        <el-input v-model="formInfo.poDeliverCode" placeholder="请输入快递单号"></el-input>
                    </el-form-item>
                    <el-form-item style="float:right;margin-bottom:0px" class="clearfix">
                        <el-button @click="CancelDeliver('formInfo')" style="float:right;">取消</el-button>
                        <el-button type="primary" @click="Delivergoods('formInfo')" style="float:right;margin-right:30px">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
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
          poOrderId: '',
          poStatus: '',
          poDeliverName: '',
          poDeliverTel: '',
        },
        // 订单状态
        ptIdList:{},
        // 数据
        tableData: [],
        // 分页
        currentPage: 1, //  默认显示第几页
        pageSize: 12, //  每页显示多少条数据
        totalCount: 1, //  数据的总条数
        // 弹框
        dialogFormVisible:false,
        innerVisible:false,
        // 发货按钮隐藏
        sendBtnShow:false,
        // 确认退款按钮隐藏
        refundBtnShow:false,
        // 展示实付款
        alreadyPayMoneyShow:false,
        // 展示待付款
        unPayMoneyShow:false,
        form:{},
        formInfo:{
            poDeliverCompany:'',
            poDeliverCode:'',
        },

        rules: {
            poDeliverCompany: [
                { required: true, message: '请输入快递公司', trigger: 'blur' },
                { min: 2,  message: '长度至少 2 个字符', trigger: 'blur' }
            ],
            poDeliverCode: [
                { required: true, message: '请输入快递单号', trigger: 'blur' },
                { min: 2,  message: '长度至少 2 个字符', trigger: 'blur' }
            ],
        }

      }
    },
    methods: {
        getDataList:function(n1,n2,n3,n4,n5,n6){
            // console.log(this.userInfo)
            // 获取某商户的商品订单列表接口
            axios.post(api.api.url+n1,qs.stringify({
                uId:this.userInfo.uId,
                sId:this.userInfo.sId,
                poOrderId:n2,
                poStatus:n3,
                poDeliverName:n4,
                poDeliverTel:n5,
                start:n6,
                end:this.pageSize,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse.data.data.orders)
                for(var i=0;i<reponse.data.data.orders.length;i++){
                    if(reponse.data.data.orders[i].poStatus==0){
                        reponse.data.data.orders[i].poStatus="待付款"
                    }
                    if(reponse.data.data.orders[i].poStatus==1){
                        reponse.data.data.orders[i].poStatus="待发货"
                    }
                    if(reponse.data.data.orders[i].poStatus==2){
                        reponse.data.data.orders[i].poStatus="待收货"
                    }
                    if(reponse.data.data.orders[i].poStatus==3){
                        reponse.data.data.orders[i].poStatus="待评价"
                    }
                    if(reponse.data.data.orders[i].poStatus==4){
                        reponse.data.data.orders[i].poStatus="已完成"
                    }
                    if(reponse.data.data.orders[i].poStatus==5){
                        reponse.data.data.orders[i].poStatus="待退款"
                    }
                    if(reponse.data.data.orders[i].poStatus==6){
                        reponse.data.data.orders[i].poStatus="已退款"
                    }
                }
                this.tableData=reponse.data.data.orders
                this.totalCount=reponse.data.data.totalCount;
            }) 
        },
        getData:function(){

            // 获取商品订单状态列表接口
            axios.post(api.api.url+'msGetProductOrderStatusList',qs.stringify({
                uId:this.userInfo.uId,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse.data.data)
                this.ptIdList=reponse.data.data
            }) 
                this.getDataList('msGetProductOrderListBySId','','','','','0')
        },
        // 分页
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.getDataList('msGetProductOrderListBySId',this.a1,this.a2,this.a3,this.a4,(val-1)*(this.pageSize))
        },
        // 搜索
        onSubmit() {
            // console.log(this.search);
            this.a1=this.search.poOrderId
            this.a2=this.search.poStatus
            this.a3=this.search.poDeliverName
            this.a4=this.search.poDeliverTel
            // console.log(this.a2)
            this.getDataList('msGetProductOrderListBySId',this.a1,this.a2,this.a3,this.a4,'0')
            this.currentPage=1
        },
        // 数据查看
        handleClick(dialogFormVisible,row) {
            // console.log(row);
            this.form=row
            this.dialogFormVisible=true
            if(this.form.poStatus=='待付款'){
                this.alreadyPayMoneyShow=false;
                this.unPayMoneyShow=true;
            } else {
                this.alreadyPayMoneyShow=true;
                this.unPayMoneyShow=false;
            }
            if(this.form.poStatus=='待发货') {
                this.sendBtnShow=true;
            } else {
                this.sendBtnShow=false;
            }
            if(this.form.poStatus=='待退款') {
                this.refundBtnShow=true
            } else {
                this.refundBtnShow=false
            }
        },
        // 确认发货
        submitForm(form) {
            this.innerVisible=true
        },
        // 确认退款
        refundForm(form) {
            var port = '';
            if(this.form.psNmae=='微信支付') {
                port = 'wxTradeRefund'
            } else if (this.form.psNmae=='支付宝支付') {
                port = 'ailTradeRefund'
            }
            axios.post(api.api.url+port,qs.stringify({
                        uId:this.userInfo.uId,
                        poId:this.form.poId,
                        payCode:this.form.poPayCode,
                        totalMoney:this.form.poTotalPrice
                    }),{emulateJSON: true},
                    {
                    headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                    }
                    ).then(reponse=>{
                        // console.log(reponse)
                        if(reponse.data.flag=='true') {
                            if(reponse.data.data.status=='true') {
                                this.$notify({
                                    title: '成功',
                                    message: '退款成功！',
                                    type: 'success'
                                });  
                                setTimeout(() => {
                                    this.dialogFormVisible = false                      
                                    // this.getData()
                                    this.reload()
                                }, 200);
                            } else {
                                this.$notify({
                                    title: '失败',
                                    message: reponse.data.data.errorString,
                                    type: 'error'
                                });  
                            }
                        } else {
                            this.$notify({
                                    title: '失败',
                                    message: reponse.data.errorString,
                                    type: 'error'
                                });  
                        }
                        
                    }) 

        },
        // 修改商品订单状态接口(添加物流信息)
        Delivergoods(formInfo){
            this.$refs[formInfo].validate((valid) => {
                if (valid) {       
                    // console.log(432)
                    // console.log(this.formInfo)
                    axios.post(api.api.url+'msChangeProductOrderStatus',qs.stringify({
                        uId:this.userInfo.uId,
                        poId:this.form.poId,
                        poStatus:'2',
                        poDeliverCompany:this.formInfo.poDeliverCompany,
                        poDeliverCode:this.formInfo.poDeliverCode
                    }),{emulateJSON: true},
                    {
                    headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                    }
                    ).then(reponse=>{
                        // console.log(reponse)
                        if(reponse.data.flag=='true') {
                            if(reponse.data.data.status=='true') {
                                this.$notify({
                                    title: '成功',
                                    message: '发货成功！',
                                    type: 'success'
                                });  
                                setTimeout(() => {
                                    this.dialogFormVisible = false                      
                                    // this.getData()
                                    this.reload()
                                }, 200);
                            } else {
                                this.$notify({
                                    title: '失败',
                                    message: reponse.data.data.errorString,
                                    type: 'error'
                                });  
                            }
                        } else {
                            this.$notify({
                                    title: '失败',
                                    message: reponse.data.errorString,
                                    type: 'error'
                                });  
                        }
                        
                    }) 
                    this.$refs[formInfo].resetFields();
                    this.innerVisible=false
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });

        },
        CancelDeliver(formInfo) {
            this.innerVisible=false
            this.$refs[formInfo].resetFields();
        }

        
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
    .goodsorderhome{
        min-height:800px;
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
    // 弹框
    .userInfo{
        margin-top: 20px;
        margin-bottom: 20px;
        .userInfo-right{
            float: right;
            padding: 8px;
            min-width: 300px;
            border: 1px solid #FE7A7A;            
            div{
                margin: 10px auto;
                color:#000;
                text-align: right;
            }
        }
    }

</style>

