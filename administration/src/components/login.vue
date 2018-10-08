<template>
    <div class="login">
        <div class="login-form">
            <div class="box">
                <div class="manage_tip">
                    <p>家装商城管理平台</p>
                </div>                
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm" style="width:290px">
                    <el-form-item label="" prop="user" style="margin-bottom:12px">
                        <el-input type="username" v-model="ruleForm.user" auto-complete="off" placeholder="账号"></el-input>
                    </el-form-item>
                    <el-form-item style="margin-top:20px;" label="" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" auto-complete="off" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')"  style="width:230px;height:30px;line-height:6px">登陆</el-button>
                        <!-- <el-button @click="resetForm('ruleForm')">取消</el-button> -->
                    </el-form-item>
                </el-form>                
            </div>
        </div>
    </div>
</template>

<script>
  import qs from 'qs'
  import axios from 'axios';
  import api from '../api/api.js'
  export default {
    data() {
      var checkUser = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入账号'));
          } else {
            if (this.ruleForm.checkPass !== '') {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          }
      };
      var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.ruleForm.checkPass !== '') {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          user: ''
        },
        rules: {
          user: [
            { validator: checkUser, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
        }
      };      
    },
    methods: {
      submitForm(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if(valid){
            axios.post(api.api.url+'msLogin',qs.stringify({
              account:this.ruleForm.user,
              password:this.ruleForm.pass,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
              // console.log(reponse)
              if(reponse.data.data.status=="true"){
                  this.$notify({
                    title: '成功',
                    message: '登陆成功！',
                    type: 'success'
                  });    
                  sessionStorage.setItem('value',JSON.stringify(reponse.data.data))  
                  setTimeout(() => {
                    this.$router.push({ path: '/navigation' })
                  }, 2000);
              }else{
                // 未通过审核
                if(reponse.data.data.checked==0){
                  this.$notify({
                    title: '警告',
                    message: reponse.data.data.errorString,
                    type: 'warning'
                  });
                  sessionStorage.setItem('value',JSON.stringify(reponse.data.data))  
                  setTimeout(() => {
                    this.$router.push({ path: 'auditinfo' })
                  }, 2000);
                }else{
                  this.$notify.error({
                    title: '错误',
                    message: reponse.data.data.errorString
                  });  
                }
              
              }

            }).catch(function(error){
              // console.log(error)
            });
          }
        });
      },
      resetForm(ruleForm) {
        this.$refs[ruleForm].resetFields();
      }
    }
  }
</script>
<style lang='less' scoped>
.el-form-item__content{
  margin-left: 120px;
}
.el-form-item__label{
  width: 50px;
}
.el-form-item__content{
  margin-left: 50px;
}
    .login{
        width: 100%;
        height: 100%;
        background-color: #324057;
        .login-form{
            position: relative;
            margin: 0 auto;
            background-color: #fff;

            padding: 20px;
            position: absolute;
            top: 50%;
            left: 50%;
            border-radius: 5px;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);

            .box{
                margin: 0 auto;
                width: 350px;
                // height: 400px;
                	.manage_tip{
                        width: 100%;
                        text-align: center;
                        margin: 20px auto;
                        p{
                            font-size: 23px;
                            color: #8799f7;
                        }
                    }
            }
        }
    }

</style>
