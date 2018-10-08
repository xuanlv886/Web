<template>
    <div class="systemjournal">
        <div id="search">
            <el-form ref="search" :model="search" class="clearfix">
                <el-form-item label="操作类型：" prop="solType" label-width="96px" style="width:300px">
                    <el-select v-model="search.solType" placeholder="请选择操作类型">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in ptIdList" v-bind:label="item.name" v-bind:value="item.id" :key="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="width:70px">
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit(search)">查找</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="content">
            <template>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="solType" label="操作类型"></el-table-column>
                    <el-table-column prop="solCreateTime" label="操作时间"></el-table-column>
                    <el-table-column prop="uTrueName" label="操作人" width="120"></el-table-column>
                </el-table>
            </template>
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
        search: {
          solType: '',
        },
        // 数据
        tableData: [],
        // 分页
        currentPage: 1, //  默认显示第几页
        pageSize: 14, //  每页显示多少条数据
        totalCount: 1, //  数据的总条数
        // 弹框
        dialogFormVisible:false,
        form:{},
        ptIdList:[],


        // 分页
        a1:'',
      }
    },
    methods: {
        getDataList:function(n1,n2,n3){
            // console.log(this.userInfo)
            // 获取系统公告列表接口
            axios.post(api.api.url+n1,qs.stringify({
                uId:this.userInfo.uId,
                solType:n2,
                start:n3,
                end:this.pageSize,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse)
                this.tableData=reponse.data.data.logs
                this.totalCount=reponse.data.data.totalCount;
            }) 
        },
        getData:function(){

            // 获取商品大类
            axios.post(api.api.url+'msSysSettingGetSysOperateLogTypeList',qs.stringify({
                uId:this.userInfo.uId,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse.data.data)
                this.ptIdList=reponse.data.data
            }) 

            // if(this.userInfo.urName=='系统管理员'){
                this.getDataList('msSysSettingGetSysOperateLogList','','0')
            // }
        },

        // 分页
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.getDataList('msSysSettingGetSysOperateLogList',this.a1,(val-1)*(this.pageSize))
        },

        // 搜索
        onSubmit() {
            // console.log(this.search);
            this.a1=this.search.solType
            this.getDataList('msSysSettingGetSysOperateLogList',this.a1,'0')
            this.currentPage=1
        },
    },
    //   钩子函数
    created:function(){
      this.getData()
      this.currentPage=1
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
    .systemjournal{
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

