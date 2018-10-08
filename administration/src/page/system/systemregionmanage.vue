<template>
    <div class="systemregionmanage clearfix">
        <div class="regionmanage-left">
          <el-menu class="el-menu-vertical-demo">
            <el-menu-item :index="item.acId" v-for="item in Data1" v-bind:key="item.acId"  @click="CheckedVal(item.acProvince,item.acId)">
              <span slot="title">{{item.acProvince}}</span>
            </el-menu-item>
            <el-submenu :index="item.acId" v-for="item in Data2" v-bind:key="item.acId">
              <template>
                <span slot="title">{{item.acProvince}}</span>
              </template>
              <el-menu-item-group v-for="items in item.citys" v-bind:key="items.acId">
                <el-menu-item :index="items.acId" :name="items.acCity" @click="CheckedVal(items.acCity,items.acId)">{{items.acCity}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
        <div class="regionmanage-right">
            <el-form :model="form"  ref="form" class="demo-ruleForm clearfix">
            <el-form-item label="城市名称：" prop="acCity" label-width="160px">
                <span>{{form.acCity}}</span>
            </el-form-item>
            <el-form-item label="城市所属：" prop="acProvince" label-width="160px">
                <span>{{form.acProvince}}</span>
            </el-form-item>
            <el-form-item label="城市区划代码：" prop="acCode" label-width="160px">
                <span>{{form.acCode}}</span>
            </el-form-item>
            <el-form-item label="是否开通该城市：" prop="isOpen" label-width="160px">
              <el-radio v-model="form.isOpen" label="true">是</el-radio>
              <el-radio v-model="form.isOpen" label="false">否</el-radio>              
            </el-form-item>
            <el-form-item label="是否设置为热门城市：" prop="ocIsHot" label-width="162px" v-if="this.form.isOpen=='true'">
              <el-radio-group v-model="form.ocIsHot">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>        
            </el-form-item>
            <el-form-item style="float:right;margin-bottom:0px;width:100%" class="clearfix">
                <el-button type="primary" @click="submitForm('form')" style="float:right;margin-right:30px" :disabled="disabled">确定</el-button>
            </el-form-item>
            </el-form>
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
        CleckedOpen:false,
        Data1:[],
        Data2:[],
        form:{},
        disabled:true
      };
    },
    methods: {
        getDataList:function(n1){
            // console.log(this.userInfo)
            this.Data1=[]
            this.Data2=[]
            // 获取系统公告列表接口
            axios.post(api.api.url+n1,qs.stringify({
                uId:this.userInfo.uId,
                end:this.pageSize,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse.data.data)
                for(var i=0;i<reponse.data.data.length;i++){
                  if(reponse.data.data[i].citys==0){
                    // console.log(reponse.data.data[i])
                    this.Data1.push(reponse.data.data[i])
                  }else{
                    this.Data2.push(reponse.data.data[i])
                  }
                }
            }) 
        },
        getData:function(){
            this.getDataList('msSysSettingGetAreaList')
        },
        CheckedVal(acCity, acId){
          axios.post(api.api.url+'msSysSettingGetCityInfoByCityName',qs.stringify({
              uId:this.userInfo.uId,
              acCity:acCity,
          }),{emulateJSON: true},
          {
          headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
          }
          ).then(reponse=>{
              // console.log(reponse.data.data.ocIsHot)
              if(reponse.data.data.ocIsHot==undefined){
                reponse.data.data.ocIsHot=0
              }
              this.form=reponse.data.data
              this.disabled=false
          }) 
        },
        // 确认上传
        submitForm(form) {
            this.$refs[form].validate((valid) => {
              if (valid) {
                // console.log(this.form)
                var isOpen=''
                if(this.form.isOpen=='false'){
                  isOpen='0';
                  this.form.ocIsHot=''
                  // console.log(isOpen)
                }else if(this.form.isOpen=='true'){
                  isOpen='1';
                  // console.log(isOpen)
                }
                axios.post(api.api.url+'msSysSettingAddOrChangeOpenCityInfo',qs.stringify({
                    uId:this.userInfo.uId,
                    acId:this.form.acId,
                    isOpen:isOpen,
                    ocIsHot:this.form.ocIsHot,
                }),{emulateJSON: true},
                {
                headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                }
                ).then(reponse=>{
                    // console.log(reponse)
                    // this.form={}
                    // this.disabled=true
                    this.$notify.info({
                      title: '成功',
                      message: '修改成功！！！'
                    });

                }) 
              } else {
                  // console.log('error submit!!');
                  return false;
              }
            });
        },
    },
    //   钩子函数
    created:function(){
      this.getData()
      
    }

  };
</script>
<style lang="less" scoped>
.systemregionmanage{
  margin: 20px auto;
  width:98%;
  max-width: 1200px;
  .regionmanage-left{
    float: left;
    width:40%;
    height: 400px;
    overflow: auto;
    border: 1px solid #ccc;
  }
  .regionmanage-right{
    float: right;
    width:57%;
    height: 400px;
    border: 1px solid #ccc;
  }
}
</style>
