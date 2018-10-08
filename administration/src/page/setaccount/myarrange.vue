<template>
    <div class="systemuserrole">
        <div class="clearfix" style="margin-top:10px">
            <el-button type="primary" @click="AddContent" style="float:right;margin-right:.5%">添加</el-button>
        </div>
        <div class="content">
            <template>
                <el-table :data="tableData" style="width: 100%" height="800">
                    <el-table-column fixed prop="sName" label="商户名称" width="220"></el-table-column>
                    <el-table-column prop="uTrueName" label="用户真实姓名"></el-table-column>
                    <el-table-column prop="saCreateTime" label="添加时间"></el-table-column>
                    <el-table-column prop="saContent" label="安排内容"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="80">
                    <template slot-scope="scope" class="clearfix">
                        <el-button size="mini" @click="handleClick(dialogFormVisible, scope.row)" style="float:right;">查看</el-button>
                        <el-button size="mini" @click="delClick(delDialogFormVisibility, scope.row)" style="float:right;margin-top:5px;">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <!-- 查看弹框 -->
        <el-dialog class="bomb" title="我的安排详情" :visible.sync="dialogFormVisible" :close-on-click-modal='false'>
            <el-form :model="form"  ref="form" class="demo-ruleForm clearfix">
            <el-form-item label="店铺名称：" prop="sName" label-width="120px">
                <span>{{form.sName}}</span>
            </el-form-item>
            <el-form-item label="用户真实姓名：" prop="uTrueName" label-width="120px">
                <span>{{form.uTrueName}}</span>
            </el-form-item>
            <el-form-item label="安排内容：" prop="saContent" label-width="120px" style="width:100%">
                <el-input resize='none' type="textarea" style="width:95%" :autosize="{minRows: 6}" placeholder="请输入内容" v-model="form.saContent"></el-input>
            </el-form-item>
            <el-form-item style="float:right;margin-bottom:0px;width:100%" class="clearfix">
                    <el-button @click="resetForm('form')" style="float:right;">关闭</el-button>                
                    <el-button type="primary" @click="submitChangeForm('form')" style="float:right;margin-right:30px">确认修改</el-button>
            </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 添加弹框 -->
        <el-dialog class="bomb" title="添加我的安排" :visible.sync="dialogFormVisibles"   @close="closeDialog('AddForms')" :close-on-click-modal='false'>
            <el-form :model="AddForms"  ref="AddForms" :rules="rules" class="demo-ruleForm clearfix">
                <el-form-item label="安排内容：" prop="saContent" label-width="100px" style="width:100%">
                    <el-input resize='none' type="textarea" :autosize="{minRows: 6}" placeholder="请输入内容" v-model="AddForms.saContent"></el-input>
                </el-form-item>
                <el-form-item style="float:right;margin-bottom:0px;width:100%" class="clearfix">
                    <el-button @click="resetAddForm('AddForms')" style="float:right;">关闭</el-button>                
                    <el-button type="primary" @click="submitAddForm('AddForms')" style="float:right;margin-right:30px">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--删除弹框 -->
        <el-dialog class="bomb" title="是否确认删除？" :visible.sync="delDialogFormVisibility" :close-on-click-modal='false'>
            <el-form :model="form" class="demo-ruleForm clearfix">
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
        // 数据
        tableData: [],
        // 弹框
        dialogFormVisible:false,
        dialogFormVisibles:false,
        // 删除我的安排弹框
        delDialogFormVisibility:false,
        form:{},
        AddForms:{
            saContent:''
        },
        // 要删除的
        saId:'',
        // 输入框的验证信息
        rules: {
            saContent: [
                { required: true, message: '请输入您的内容', trigger: 'blur' },
                { min: 2,  message: '长度至少 2 个字符', trigger: 'blur' }
            ],
        }
      }
    },
    methods: {
        getDataList:function(n1){
            // console.log(this.userInfo)
            // 获取商户我的安排列表接口
            axios.post(api.api.url+n1,qs.stringify({
                uId:this.userInfo.uId,
                sId:this.userInfo.sId,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse)
                this.tableData=reponse.data.data
            }) 
        },
        getData:function(){
            this.getDataList('msGetMyArrangeListBySId')
        },
        // 数据查看
        handleClick(dialogFormVisible,row) {
            // console.log(row);
            this.form=row
            this.dialogFormVisible=true
        },
        // 删除我的安排
        delClick(delDialogFormVisibility, row) {
            this.form=row;
            this.delDialogFormVisibility=true;
        },
        // 添加
        AddContent(){
            this.dialogFormVisibles=true
        },
        // 确认上传
        submitAddForm(AddForms){
            this.$refs[AddForms].validate((valid) => {
            if (valid) {
                // console.log(this.AddForms)
                // 商户添加我的安排接口
                axios.post(api.api.url+'msAddMyArrange',qs.stringify({
                    uId:this.userInfo.uId,
                    sId:this.userInfo.sId,
                    saContent:this.AddForms.saContent,
                }),{emulateJSON: true},
                {
                headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                }
                ).then(reponse=>{
                    // console.log(reponse)
                    this.dialogFormVisibles=false  
                    this.reload()                      
                    // this.getData()
                    // this.$refs[AddForms].resetFields();
                }) 
            } else {
                // console.log('error submit!!');
                return false;
            }
            });
        },

        // 取消上传
        resetAddForm(AddForms) {
            this.dialogFormVisibles=false
            // this.$refs[AddForms].resetFields();
        },
        closeDialog(AddForms) {
            this.dialogFormVisibles=false
            // this.$refs[AddForms].resetFields();
        },
        // 关闭删除弹框
        resetForm(form) {
            this.delDialogFormVisibility=false;
            this.dialogFormVisible=false;
        },
        // 确认删除我的安排
        submitForm(form) {
                // 商户删除我的安排接口
                axios.post(api.api.url+'delStoreArrange',qs.stringify({
                    saId:this.form.saId,
                }),{emulateJSON: true},
                {
                headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                }
                ).then(reponse=>{
                    // console.log(reponse)
                    this.delDialogFormVisibility=false
                    if(reponse.data.flag=='true') {
                        if(reponse.data.data.status=='true') {
                            this.$notify({
                                title: '成功',
                                message: '删除成功！',
                                type: 'success'
                            });
                            this.reload()
                            // this.getData();
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
                    this.$refs[form].resetFields();
                }) 
        },
        // 修改我的安排详情
        submitChangeForm(form) {
            // 商户修改我的安排接口
            axios.post(api.api.url+'updateMyArrange',qs.stringify({
                    saId:this.form.saId,
                    saContent:this.form.saContent
                }),{emulateJSON: true},
                {
                headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                }
                ).then(reponse=>{
                    // console.log(reponse)
                    this.dialogFormVisible=false
                    if(reponse.data.flag=='true') {
                        if(reponse.data.data.status=='true') {
                            this.$notify({
                                title: '成功',
                                message: '修改成功！',
                                type: 'success'
                            });
                            this.reload()
                            // this.getData();
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
                    this.$refs[form].resetFields();
                }) 
        },

    },

    //   钩子函数
    created:function(){
      this.getData()
      
    }


  }    

</script>
<style lang="less" scoped>
.el-form{
    .el-form-item{
        width:50%;
        float: left;
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

