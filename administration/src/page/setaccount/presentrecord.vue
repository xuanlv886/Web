<template>
    <div class="systemuserrole">
        <div id="search">
            <el-form ref="search" :model="search" class="clearfix">
                <el-form-item label="提现状态：" prop="utcrStatus" label-width="96px">
                    <el-select v-model="search.utcrStatus" placeholder="请选择提现状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="申请提现" value="0"></el-option>
                    <el-option label="已转账" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="提现方式：" prop="psId" label-width="96px">
                    <el-select v-model="search.psId" placeholder="请选择提现方式">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in ptIdList" v-bind:label="item.psName" v-bind:value="item.psId" :key="item.psName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="width:70px">
                    <el-button type="primary" @click="onSubmit(search)">查找</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="content">
            <template>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column fixed prop="sName" label="商户名称" width="220"></el-table-column>
                    <el-table-column prop="uTrueName" label="用户真实姓名"></el-table-column>
                    <el-table-column prop="utcrMoney" label="提现金额"></el-table-column>
                    <el-table-column prop="utcrStatus" label="提现状态"></el-table-column>
                    <el-table-column prop="utcrCreateTime" label="操作时间" width="200"></el-table-column>
                </el-table>
            </template>
            <!-- 分页 -->
            <div class="pageSizes">
                <div class="block">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper" :total="totalCount"></el-pagination>
                </div>
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
        //   搜索
        ptIdList:[],
        search: {
          utcrStatus: '',
          psId: '',
        },
        // 分页
        currentPage: 1, //  默认显示第几页
        pageSize: 14, //  每页显示多少条数据
        totalCount: 1, //  数据的总条数

        // 数据
        tableData: [],
        // 弹框
        form:{},

        // 输入框的验证信息
        rules: {
        },
        // 分页
        a1:'',
        a2:'',

      }
    },
    methods: {
        getDataList:function(n1,n2,n3,n4){
            // 获取商户提现记录列表接口
            axios.post(api.api.url+n1,qs.stringify({
                uId:this.userInfo.uId,
                sId:this.userInfo.sId,
                utcrStatus:n2,
                psId:n3,
                start:n4,
                end:this.pageSize,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse)
                for(var i=0;i<reponse.data.data.records.length;i++){
                    if(reponse.data.data.records[i].utcrStatus==0){
                        reponse.data.data.records[i].utcrStatus='申请提现'
                    }
                    if(reponse.data.data.records[i].utcrStatus==1){
                        reponse.data.data.records[i].utcrStatus='已转账'
                    }
                }
                this.tableData=reponse.data.data.records
                this.totalCount=reponse.data.data.totalCount;
            }) 
        },
        getData:function(){
            // 获取全部支付方式接口
            axios.post(api.api.url+'msGetPayStyleList',qs.stringify({
                uId:this.userInfo.uId,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse)
                this.ptIdList=reponse.data.data
            }) 
            this.getDataList('msGetApplyToCashListBySId','','','0')
        },
        // 分页
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.getDataList('msGetApplyToCashListBySId',this.a1,this.a2,(val-1)*(this.pageSize))
        },

        // 搜索
        onSubmit() {
            // console.log(this.search);
            this.a1=this.search.utcrStatus
            this.a2=this.search.psId
            this.getDataList('msGetApplyToCashListBySId',this.a1,this.a2,'0')
            this.currentPage=1
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

.el-form{
    .el-form-item{
        width:50%;
        float: left;
    }
}

.systemuserrole{
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

