<template>
    <div class="systemuser">
        <div id="search">
            <el-form ref="search" :model="search" class="clearfix">
            <el-form-item label="用户账号：" label-width="87px">
                <el-input v-model="search.uAccount"></el-input>
            </el-form-item>
            <el-form-item label="用户姓名：" label-width="87px">
                <el-input v-model="search.uTrueName"></el-input>
            </el-form-item>
            <el-form-item label="用户电话：" label-width="87px">
                <el-input v-model="search.uTel"></el-input>
            </el-form-item>
            <el-form-item label="用户角色：" prop="urId" label-width="96px">
                <el-select v-model="search.urId" placeholder="请选择用户角色">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in ptIdList" v-bind:label="item.urName" v-bind:value="item.urId" :key="item.urName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item style="width:70px">
                <el-button type="primary" icon="el-icon-search" @click="onSubmit(search)">查找</el-button>
            </el-form-item>
            <el-form-item style="width:70px;float:right;margin-right:35px">
                <el-button type="primary" @click="Release" v-if="this.userInfo.urName!='系统子管理员'">添加用户</el-button>
            </el-form-item>
            </el-form>
        </div>
        <div class="content">
            <template>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="urName" label="用户角色" width="140"></el-table-column>
                    <el-table-column prop="uAccount" label="用户账号"></el-table-column>
                    <el-table-column prop="uTrueName" label="真实姓名"></el-table-column>
                    <!-- <el-table-column prop="uPassword" label="用户密码" width="120"></el-table-column> -->
                    <!-- <el-table-column prop="sName" label="店铺名称" width="120"></el-table-column> -->
                    <el-table-column prop="uNickName" label="用户昵称"></el-table-column>
                    
                    <!-- <el-table-column prop="uBirthday" label="用户出生日期" width="120"></el-table-column> -->
                    <!-- <el-table-column prop="uSex" label="用户性别" width="80"></el-table-column> -->
                    <el-table-column prop="uTel" label="联系电话"></el-table-column>
                    <!-- <el-table-column prop="uEmail" label="用户Email" width="200"></el-table-column> -->
                    <el-table-column prop="uCreateTime" label="创建时间" min-width="70"></el-table-column>
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
        <el-dialog class="bomb" title="修改用户角色" :visible.sync="dialogFormVisible" :close-on-click-modal='false'>
            <el-form :model="form"  ref="form" class="demo-ruleForm clearfix">
            <el-form-item label="用户角色：" prop="urName" label-width="100px">
                <span>{{ form.urName }}</span>
            </el-form-item>
            <el-form-item label="用户账号：" prop="uAccount" label-width="100px">
                <el-input v-model="form.uAccount" :readonly="Disabled"></el-input>
            </el-form-item>
            <el-form-item label="用户密码：" prop="uPassword" label-width="100px">
                <el-input v-model="form.uPassword" :type="passwordUser" :readonly="Disabled"></el-input>
            </el-form-item>
            <el-form-item label="用户昵称：" prop="uNickName" label-width="100px">
                <el-input v-model="form.uNickName" :readonly="Disabled"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名：" prop="uTrueName" label-width="100px">
                <el-input v-model="form.uTrueName" :readonly="Disabled"></el-input>
            </el-form-item>
            <el-form-item label="用户性别：" prop="uSex" label-width="100px">
                <el-select v-model="form.uSex" placeholder="请选择用户性别" :disabled="Disabled" style="height:28px">
                <el-option label="女" value="0"></el-option>
                <el-option label="男" value="1"></el-option>
                </el-select>
            </el-form-item> 
            <el-form-item label="用户电话：" prop="uTel" label-width="100px">
                <el-input v-model="form.uTel" :readonly="Disabled"></el-input>
            </el-form-item>
            <el-form-item label="用户Email：" prop="uEmail" label-width="100px">
                <el-input v-model="form.uEmail" :readonly="Disabled"></el-input>
            </el-form-item>
            <el-form-item style="float:right;margin-bottom:0px;width:100%" class="clearfix">
                <el-button @click="resetForm('form')" style="float:right;">关闭</el-button>                
                <el-button type="primary" @click="submitForm('form')" style="float:right;margin-right:30px">确定</el-button>
            </el-form-item>
            </el-form>
        </el-dialog>
        
        <!-- 添加用户角色界面 -->
        <el-dialog class="bomb" title="添加管理者" :visible.sync="dialogFormVisibleS" @close='closeDialog("ruleForm")' :close-on-click-modal='false'>
            <el-form :model="ruleForm"  ref="ruleForm" :rules="rules" class="demo-ruleForm clearfix">
                <el-form-item label="管理者账号：" prop="uAccount" label-width="120px">
                    <el-input v-model="ruleForm.uAccount"></el-input>
                </el-form-item>
                <el-form-item label="管理者密码：" prop="uPassword" label-width="120px">
                    <el-input v-model="ruleForm.uPassword"></el-input>
                </el-form-item>
                <el-form-item label="管理者昵称：" prop="uNickName" label-width="120px">
                    <el-input v-model="ruleForm.uNickName"></el-input>
                </el-form-item>
                <el-form-item label="管理者姓名：" prop="uTrueName" label-width="120px">
                    <el-input v-model="ruleForm.uTrueName"></el-input>
                </el-form-item>
                <el-form-item label="管理者性别：" prop="uSex" label-width="120px">
                    <el-select v-model="ruleForm.uSex" placeholder="请选择管理者性别">
                    <el-option label="女" value="0"></el-option>
                    <el-option label="男" value="1"></el-option>
                    </el-select>
                </el-form-item> 
                <el-form-item label="管理者邮箱：" prop="uEmail" label-width="120px">
                    <el-input v-model="ruleForm.uEmail"></el-input>
                </el-form-item>
                <el-form-item label="管理者电话：" prop="uTel" label-width="120px">
                    <el-input v-model="ruleForm.uTel"></el-input>
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
          uAccount: '',
          uTrueName: '',
          uTel: '',
          urId: '',
        },
        // 数据
        tableData: [],
        // 分页
        currentPage: 1, //  默认显示第几页
        pageSize: 12, //  每页显示多少条数据
        totalCount: 1, //  数据的总条数
        // 弹框
            // 查看
        dialogFormVisible:false,
        Disabled:true,
        passwordUser:'text',
            // 添加
        dialogFormVisibleS:false,
        form:{},
        ptIdList:[],

        rules: {
          uAccount: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 1, message: '长度最少 1 个字符', trigger: 'blur' }
          ],
          uPassword: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 1, message: '长度最少 1 个字符', trigger: 'blur' }
          ],
          uNickName: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 1, message: '长度最少 1 个字符', trigger: 'blur' }
          ],
          uTrueName: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 1, message: '长度最少 1 个字符', trigger: 'blur' }
          ],
          uEmail: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { min: 1, message: '长度最少 1 个字符', trigger: 'blur' }
          ],
          uTel: [
            { required: true, message: '请输入电话号', trigger: 'blur' },
            { min: 11, max:11, message: '长度为 11 个字符', trigger: 'blur' }
          ],

        },

        // 分页
        a1:'',
        a2:'',
        a3:'',       
        a4:'',   

        ruleForm:{
            uAccount:'',
            uPassword:'',
            uNickName:'',
            uTrueName:'',
            uSex:'1',
            uEmail:'',
            uTel:'',
        }
      }
    },
    methods: {
        getDataList:function(n1,n2,n3,n4,n5,n6){
            // console.log(this.userInfo)
            // 获取系统公告列表接口
            axios.post(api.api.url+n1,qs.stringify({
                uId:this.userInfo.uId,
                uAccount:n2,
                uTrueName:n3,
                uTel:n4,
                urId:n5,
                start:n6,
                end:this.pageSize,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse)
                this.tableData=reponse.data.data.users
                this.totalCount=reponse.data.data.totalCount;
            }) 
        },
        getData:function(){

            // 获取商品大类
            axios.post(api.api.url+'msSysSettingGetUserRoleList',qs.stringify({
                uId:this.userInfo.uId,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse.data.data)
                this.ptIdList=reponse.data.data
            }) 

            this.getDataList('msSysSettingGetUserList','','','','','0')
        },

        // 分页
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.getDataList('msSysSettingGetUserList',this.a1,this.a2,this.a3,this.a4,(val-1)*(this.pageSize))
        },

        // 搜索
        onSubmit() {
            // console.log(this.search);
            this.a1=this.search.uAccount
            this.a2=this.search.uTrueName
            this.a3=this.search.uTel
            this.a4=this.search.urId
            this.getDataList('msSysSettingGetUserList',this.a1,this.a2,this.a3,this.a4,'0')
            this.currentPage=1
        },
        // 数据查看
        handleClick(dialogFormVisible,row) {
            // console.log(this.userInfo);
            // 设置权限
            if(this.userInfo.urName=='系统管理员'){
                if(row.urName=="系统管理员" || row.urName=="系统子管理员"){
                    this.passwordUser='text'
                    this.Disabled=false
                }else{
                    this.passwordUser='password'
                    this.Disabled=true
                }
            }else if(this.userInfo.urName=='系统子管理员'){
                    this.passwordUser='password'
                    this.Disabled=true                
            }

            if(row.uSex==1){
                row.uSex='男'
            }else if(row.uSex==0){
                row.uSex='女'
            }
            this.form=row
            this.dialogFormVisible=true
        },
        // 确认上传
        submitForm(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                // console.log(this.form)
                    
                if(this.form.uSex=='男'){
                    this.form.uSex=1
                }else if(this.form.uSex=='女'){
                    this.form.uSex=0
                }
                    // 获取商品大类
                    axios.post(api.api.url+'msSysSettingChangeUserInfo',qs.stringify({
                        uId:this.userInfo.uId,
                        targetId:this.form.uId,
                        uAccount:this.form.uAccount,
                        uPassword:this.form.uPassword,
                        uNickName:this.form.uNickName,
                        uTrueName:this.form.uTrueName,
                        uSex:this.form.uSex,
                        uEmail:this.form.uEmail,
                        uTel:this.form.uTel,
                    }),{emulateJSON: true},
                    {
                    headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                    }
                    ).then(reponse=>{
                        // console.log(reponse)
                        this.reload()
                        // this.getData()
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


        // 添加
        Release:function(){
            this.dialogFormVisibleS=true
        },
        
        // 添加确认上传
        determine(ruleForm) {
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    // 获取商品大类
                    axios.post(api.api.url+'msSysSettingAddUserInfo',qs.stringify({
                        uId:this.userInfo.uId,
                        uAccount:this.ruleForm.uAccount,
                        uPassword:this.ruleForm.uPassword,
                        uNickName:this.ruleForm.uNickName,
                        uTrueName:this.ruleForm.uTrueName,
                        uSex:this.ruleForm.uSex,
                        uEmail:this.ruleForm.uEmail,
                        uTel:this.ruleForm.uTel,
                    }),{emulateJSON: true},
                    {
                    headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                    }
                    ).then(reponse=>{
                        // console.log(reponse)
                        this.reload()
                        // this.getData()
                    }) 
                    this.dialogFormVisibleS=false                        
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },

        // 添加取消上传
        cancel(ruleForm) {
            this.dialogFormVisibleS=false
            // this.$refs[ruleForm].resetFields();
        },
        closeDialog(ruleForm) {
            this.dialogFormVisibleS=false
            // this.$refs[ruleForm].resetFields();
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
    .systemuser{
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

