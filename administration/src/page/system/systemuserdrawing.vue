<template>
    <div class="systemuserdrawing">
        <div id="search">
            <el-form ref="search" :model="search" class="clearfix">
            <el-form-item label="商户名称：" label-width="87px">
                <el-input v-model="search.sName"></el-input>
            </el-form-item>
            <el-form-item label="提现状态：" prop="utcrStatus" label-width="96px">
                <el-select v-model="search.utcrStatus" placeholder="请选择提现状态">
                <el-option label="全部" value=""></el-option>
                <el-option label="申请中" value="0"></el-option>
                <el-option label="已转账" value="1"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item style="width:90px">
                <el-button type="primary" icon="el-icon-search" @click="onSubmit(search)">查找</el-button>
            </el-form-item>
            </el-form>
        </div>
        <div class="content">
            <template>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="sName" label="商户名称" width="220"></el-table-column>
                    <el-table-column prop="uTrueName" label="申请人姓名"></el-table-column>
                    <el-table-column prop="utcrMoney" label="提现金额"></el-table-column>
                    <el-table-column prop="utcrStatus" label="提现状态">
                        <template slot-scope="scope">
                                <span v-if="scope.row.utcrStatus=='申请中'" style="color: red">申请中</span>
                                <span v-else style="color: #549c54">已转账</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="utcrCreateTime" label="操作时间"></el-table-column>
                    <el-table-column label="操作" width="80">
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
        <el-dialog class="bomb" title="修改商户提现状态" :visible.sync="dialogFormVisible" :close-on-click-modal='false'>
            <el-form :model="form"  ref="form" class="demo-ruleForm clearfix" label-position="left">
            <el-form-item label="店铺名称：" prop="sName">
                <span>{{form.sName}}</span>
            </el-form-item>
            <el-form-item label="提现金额：" prop="utcrMoney">
                <span>{{form.utcrMoney}} 元</span>
            </el-form-item>
            <el-form-item label="收款账号：" prop="utcrAccount">
                <span>{{form.utcrAccount}} </span>
            </el-form-item>
            <el-form-item label="操作时间：" prop="utcrCreateTime">
                <span>{{form.utcrCreateTime}}</span>
            </el-form-item>
            <el-form-item label="操作人：" prop="uTrueName">
                <span>{{form.uTrueName}}</span>
            </el-form-item>
            <el-form-item label="提现状态：" prop="utcrStatus">
                <el-select v-model="form.utcrStatus" placeholder="请选择提现状态" :disabled="Disabled">
                <el-option label="申请中" value="0"></el-option>
                <el-option label="已转账" value="1"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item style="float:right;margin-bottom:0px;width:100%" class="clearfix">
                <el-button @click="resetForm('form')" style="float:right;">关闭</el-button>                
                <el-button type="primary" @click="submitForm('form')" style="float:right;margin-right:30px">确定</el-button>
            </el-form-item>
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
          sName: '',
          utcrStatus: '',
        },
        // 数据
        tableData: [],
        // 分页
        currentPage: 1, //  默认显示第几页
        pageSize: 12, //  每页显示多少条数据
        totalCount: 1, //  数据的总条数
        // 弹框
        dialogFormVisible:false,
        Disabled:false,
        form:{},

        // 分页
        a1:'',
        a2:'',

      }
    },
    methods: {
        getDataList:function(n1,n2,n3,n4){
            // console.log(this.userInfo)
            // 获取系统公告列表接口
            axios.post(api.api.url+n1,qs.stringify({
                uId:this.userInfo.uId,
                sName:n2,
                utcrStatus:n3,
                start:n4,
                end:this.pageSize,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse.data.data)
                for(var i=0;i<reponse.data.data.records.length;i++){
                    if(reponse.data.data.records[i].utcrStatus==1){
                        reponse.data.data.records[i].utcrStatus='已转账'
                    }else if(reponse.data.data.records[i].utcrStatus==0){
                        reponse.data.data.records[i].utcrStatus='申请中'
                    }
                }
                this.tableData=reponse.data.data.records
                this.totalCount=reponse.data.data.totalCount;
            }) 
        },
        getData:function(){
            if(this.$route.params.utcrStatus==0){
                this.getDataList('msGetApplyToCashList','','0','0')
                this.search.utcrStatus="申请中"
            }else{
            this.getDataList('msGetApplyToCashList','','','0')
            }
        },
        // 分页
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.getDataList('msGetApplyToCashList',this.a1,this.a2,(val-1)*(this.pageSize))
        },

        // 搜索
        onSubmit() {
            // console.log(this.search);
            this.a1=this.search.sName
            this.a2=this.search.utcrStatus
            if(this.search.utcrStatus=="申请中"){
                this.a2='0'
            }
            this.getDataList('msGetApplyToCashList',this.a1,this.a2,'0')
            this.currentPage=1
        },
        // 数据查看
        handleClick(dialogFormVisible,row) {
            if(row.utcrStatus=='已转账' || row.utcrStatus==1){
                this.Disabled=true
            }else if(row.utcrStatus=='申请中' || row.utcrStatus==0){
                this.Disabled=false
            }
            // console.log(row);
            this.form=row
            this.dialogFormVisible=true
        },
        // 确认上传
        submitForm(form) {
            // console.log(this.form)
            this.$refs[form].validate((valid) => {
                if (valid) {

                    if(this.form.utcrStatus=='已转账'){
                        this.form.utcrStatus=1
                    }else if(this.form.utcrStatus=='申请中'){
                        this.form.utcrStatus=0
                    }
                    console.log(this.form.utcrStatus)

                    // 获取系统公告列表接口
                    axios.post(api.api.url+'msChangeApplyToCashStatus',qs.stringify({
                        uId:this.userInfo.uId,
                        utcrId:this.form.utcrId,
                        utcrStatus:this.form.utcrStatus,
                    }),{emulateJSON: true},
                    {
                    headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                    }
                    ).then(reponse=>{
                        // console.log(reponse)
                        // this.getData()
                        // this.currentPage=1
                        this.reload()
                    }) 
                    this.dialogFormVisible=false                        
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        // 取消上传
        resetForm(form) {
            this.reload()
            this.dialogFormVisible=false
            // this.$refs[form].resetFields();
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
    .systemuserdrawing{
        min-height:800px;
        height:100%;
        .content{
            position: relative;
            margin: 10px auto;
            width: 99%;
            height: 90%;
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
        .el-form-item{
            width:50%;
            float: left;
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

