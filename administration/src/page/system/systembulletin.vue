<template>
    <div class="systembulletin">
        <div id="search">
            <el-form ref="search" :model="search" class="clearfix">
            <el-form-item label="公告标题：" label-width="87px">
                <el-input v-model="search.snTitle"></el-input>
            </el-form-item>
            <el-form-item label="发布人：" label-width="86px">
                <el-input v-model="search.uTrueName"></el-input>
            </el-form-item>
            <el-form-item style="width:70px">
                <el-button type="primary" icon="el-icon-search" @click="onSubmit(search)">查找</el-button>
            </el-form-item>
            <el-form-item style="width:70px;float:right;margin-right:35px">
                <el-button type="primary" @click="Release">发布公告</el-button>
            </el-form-item>
            </el-form>
        </div>
        <div class="content">
            <template>
                <el-table :data="tableData" style="width: 100%" height="812">
                    <el-table-column prop="snTitle" label="系统公告标题" width="120"></el-table-column>
                    <el-table-column prop="snContent" label="系统公告内容"></el-table-column>
                    <el-table-column prop="snCreateTime" label="系统公告发布时间" width="180"></el-table-column>
                    <el-table-column prop="uTrueName" label="公告发布人" width="120"></el-table-column>
                    <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleClick(dialogFormVisible, scope.row)">查看</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>

        <!-- 查看弹框 -->
        <el-dialog class="bomb" title="系统公告详情" :visible.sync="dialogFormVisible" :close-on-click-modal='false'>
            <el-form :model="form"  ref="form" :rules="rules" class="demo-ruleForm clearfix" label-position="left">
                <el-form-item label="系统公告标题：" prop="snTitle" label-width="120px">
                    <el-input v-model="form.snTitle"></el-input>
                </el-form-item>
                <el-form-item label="系统公告内容：" prop="snContent" label-width="120px">
                    <el-input type="textarea" :autosize="{minRows: 6}" placeholder="请输入内容" v-model="form.snContent" resize="none"></el-input>
                </el-form-item>
                <el-form-item label="系统公告发布人：" prop="uTrueName">
                    <span>{{form.uTrueName}}</span>
                </el-form-item>
                <el-form-item label="系统公告发布时间：" prop="snCreateTime">
                    <span>{{form.snCreateTime}}</span>
                </el-form-item>
                <el-form-item style="float:right;margin-bottom:0px;width:100%" class="clearfix">
                    <el-button @click="resetForm('form')" style="float:right;">关闭</el-button>                
                    <el-button type="primary" @click="submitForm('form')" style="float:right;margin-right:30px">确认修改</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 发布公告 -->
        <el-dialog class="bomb" title="发布系统公告" :visible.sync="dialogFormVisibleS"  @close="closeDialog('ruleForm')" :close-on-click-modal='false'>
            <el-form :model="ruleForm"  ref="ruleForm" :rules="rules" class="demo-ruleForm clearfix">
            <el-form-item label="系统公告标题：" prop="snTitle" label-width="120px">
                <el-input v-model="ruleForm.snTitle"></el-input>
            </el-form-item>
            <el-form-item label="系统公告内容：" prop="snContent" label-width="120px">
                <el-input type="textarea" :autosize="{minRows: 6}" resize='none' v-model="ruleForm.snContent"></el-input>
            </el-form-item>
            <el-form-item style="float:right;margin-bottom:0px;width:100%" class="clearfix">
                <el-button @click="cancel('ruleForm')" style="float:right;">关闭</el-button>                
                <el-button type="primary" @click="determine('ruleForm')" style="float:right;margin-right:30px">确定</el-button>
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
          snTitle: '',
          uTrueName: '',
        },
        // 数据
        tableData: [],
        // 弹框
        dialogFormVisible:false,
        dialogFormVisibleS:false,
        form:{
            delivery:false,
            resource: '',
        },
        ruleForm:{
            snTitle:'',
            snContent:''
        },
        rules: {
          snTitle: [
            { required: true, message: '请输入公告标题', trigger: 'blur' },
            { min: 1, message: '长度在最少 1 个字符', trigger: 'blur' }
          ],
          snContent: [
            { required: true, message: '请输入公告内容', trigger: 'blur' },
            { min: 1, message: '长度在最少 1 个字符', trigger: 'blur' }
          ],
        }


      }
    },
    methods: {

        getDataList:function(n1,n2,n3){
            // console.log(this.userInfo)
            // 获取系统公告列表接口
            axios.post(api.api.url+n1,qs.stringify({
                uId:this.userInfo.uId,
                snTitle:n2,
                uTrueName:n3,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse.data.data)
                this.tableData=reponse.data.data
            }) 
        },
        getData:function(){
            // if(this.userInfo.urName=='系统管理员'){
                this.getDataList('msSysSettingGetSysNoticeList','','')
            // }
        },

        // 搜索
        onSubmit() {
            // console.log(this.search);
            this.a1=this.search.snTitle
            this.a2=this.search.uTrueName
            this.getDataList('msSysSettingGetSysNoticeList',this.a1,this.a2)      
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
                    // console.log(this.form)
                    // 修改系统公告接口
                    axios.post(api.api.url+'msSysSettingChangeSysNotice',qs.stringify({
                        uId:this.userInfo.uId,
                        snId:this.form.snId,
                        snTitle:this.form.snTitle,
                        snContent:this.form.snContent,
                    }),{emulateJSON: true},
                    {
                    headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                    }
                    ).then(reponse=>{
                        // console.log(reponse)
                        // this.getDataList('msSysSettingGetSysNoticeList','','')
                        // this.currentPage=1
                        this.$notify({
                        title: '成功',
                        message: '修改成功！！！',
                        type: 'success'
                        }); 
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
            this.dialogFormVisible=false
            // this.$refs[form].resetFields();
        },


        // 发布公告
        Release:function(){
            this.dialogFormVisibleS=true
        },
        
        // 发布公告确认上传
        determine(ruleForm) {
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    // 发布系统公告接口
                    axios.post(api.api.url+'msSysSettingAddSysNotice',qs.stringify({
                        uId:this.userInfo.uId,
                        snTitle:this.ruleForm.snTitle,
                        snContent:this.ruleForm.snContent,
                    }),{emulateJSON: true},
                    {
                    headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                    }
                    ).then(reponse=>{
                        // console.log(reponse)
                        // this.getDataList('msSysSettingGetSysNoticeList','','')
                        // this.currentPage=1
                        this.$notify({
                        title: '成功',
                        message: '添加成功！！！',
                        type: 'success'
                        }); 
                        this.reload()

                    })                 
                    this.dialogFormVisibleS=false       
                    this.$refs[ruleForm].resetFields();                 
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },

        // 发布公告取消上传
        cancel(ruleForm) {
            this.dialogFormVisibleS=false
            this.$refs[ruleForm].resetFields();
        },
       closeDialog(ruleForm) {
            this.dialogFormVisibleS=false
            this.$refs[ruleForm].resetFields();
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
    .content{
        margin: 10px auto;
        width: 99%;
        border:1px solid #EBEEF5;
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

