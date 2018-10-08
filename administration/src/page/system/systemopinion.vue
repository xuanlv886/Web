<template>
    <div class="systemopinion">
        <div id="search">
            <el-form ref="search" :model="search" class="clearfix">
                <el-form-item label="反馈内容："  prop="fContent" label-width="96px">
                    <el-input v-model="search.fContent"></el-input>
                </el-form-item>

                <el-form-item label="客户端类型：" prop="fAppType" label-width="105px">
                    <el-select v-model="search.fAppType" placeholder="请选择客户端类型">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="用户端" value="0"></el-option>
                    <el-option label="商户端" value="1"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="问题类型：" prop="fType" label-width="96px">
                    <el-select v-model="search.fType" placeholder="请选择问题类型">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="功能异常" value="0"></el-option>
                    <el-option label="产品建议" value="1"></el-option>
                    <el-option label="其他问题" value="2"></el-option>
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
                    <el-table-column fixed prop="fType" label="问题类型" width="120"></el-table-column>
                    <el-table-column prop="fAppType" label="客户端类型" width="120"></el-table-column>
                    <el-table-column prop="fContent" label="反馈内容" width="320"></el-table-column>
                    <el-table-column prop="uAccount" label="反馈人账号"></el-table-column>
                    <el-table-column prop="uNickName" label="反馈人账号昵称"></el-table-column>
                    <el-table-column prop="fCreateTime" label="反馈时间" width="180"></el-table-column>
                    
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
        <el-dialog class="bomb" title="反馈意见详情" :visible.sync="dialogFormVisible" :close-on-click-modal='false'>
            <el-form :model="form"  ref="form" class="demo-ruleForm clearfix" label-position="left">
            <el-form-item label="反馈人账号：" prop="uAccount">
                <span>{{form.uAccount}}</span>
            </el-form-item>
            <el-form-item label="反馈人账号昵称：" prop="uNickName">
                <span>{{form.uNickName}}</span>
            </el-form-item>
            <el-form-item label="反馈时间：" prop="fCreateTime" label-width="90px">
                <span>{{form.fCreateTime}}</span>
            </el-form-item>
            <el-form-item label="反馈内容：" prop="fContent" label-width="90px" style="width:660px">
                <el-input type="textarea" :autosize="{minRows: 5}" placeholder="请输入内容" readonly v-model="form.fContent" resize="none"></el-input>
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
    data() {
      return {
        userInfo:JSON.parse(sessionStorage.getItem('value')),

        //   搜索
        search: {
          fContent: '',
          fAppType: '',
          fType: '',
        },

        // 数据
        tableData: [],
        // 分页
        currentPage: 1, //  默认显示第几页
        pageSize: 12, //  每页显示多少条数据
        totalCount: 1, //  数据的总条数
        // 弹框
        dialogFormVisible:false,
        form:{},


        // 分页
        a1:'',
        a2:'',
        a3:'',       

      }
    },
    methods: {

        getDataList:function(n1,n2,n3,n4,n5){
            // console.log(this.userInfo)
            // 获取系统公告列表接口
            axios.post(api.api.url+n1,qs.stringify({
                uId:this.userInfo.uId,
                fContent:n2,
                fAppType:n3,
                fType:n4,
                start:n5,
                end:this.pageSize,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse.data.data.feedbacks)
                for(var i=0;i<reponse.data.data.feedbacks.length;i++){
                    if(reponse.data.data.feedbacks[i].fType=='0'){
                        reponse.data.data.feedbacks[i].fType='功能异常'
                    }
                    if(reponse.data.data.feedbacks[i].fType=='1'){
                        reponse.data.data.feedbacks[i].fType='产品建议'
                    }
                    if(reponse.data.data.feedbacks[i].fType=='2'){
                        reponse.data.data.feedbacks[i].fType='其他问题'
                    }

                    if(reponse.data.data.feedbacks[i].fAppType=='0'){
                        reponse.data.data.feedbacks[i].fAppType='用户端'
                    }
                    if(reponse.data.data.feedbacks[i].fAppType=='1'){
                        reponse.data.data.feedbacks[i].fAppType='商户端'
                    }
                }
                this.tableData=reponse.data.data.feedbacks
                this.totalCount=reponse.data.data.totalCount;
            }) 
        },
        getData:function(){
            this.getDataList('msSysSettingGetFeedbackList','','','','0')        
        },


        // 分页
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.getDataList('msSysSettingGetFeedbackList',this.a1,this.a2,this.a3,(val-1)*(this.pageSize))
        },
        // 搜索
        onSubmit() {
            // console.log(this.search);
            this.a1=this.search.fContent
            this.a2=this.search.fAppType
            this.a3=this.search.fType
            this.getDataList('msSysSettingGetFeedbackList',this.a1,this.a2,this.a3,'0')
            this.currentPage=1
        },
        // 数据查看
        handleClick(dialogFormVisible,row) {
            // console.log(row);
            this.form=row
            this.dialogFormVisible=true
        },
        // 确认上传
        submitForm(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.dialogFormVisible=false                        
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },

        // 取消上传
        resetForm(form) {
            // this.$refs[form].resetFields();
            this.dialogFormVisible=false
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
    .systemopinion{
        min-height:800px;
        height:93%;
        .content{
            position: relative;
            margin: 10px auto;
            width: 99%;
            height: 92%;
            border:1px solid #EBEEF5;
            // 分页
            .pageSizes{
                position: absolute;
                left: 0;
                bottom: 0px;
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

    .el-form-item{
        width:50%;
        float: left;
        div{
            width:100%;
        }
    }

</style>

