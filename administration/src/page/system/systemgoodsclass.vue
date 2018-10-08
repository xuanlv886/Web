<template>
    <div class="systemgoodsclass">
      <div class="clearfix" style="height:40px;margin-top:20px;">
        <el-button type="primary" @click="AddSmallClass" v-if="disabledss" style="float:right;margin-right:.5%">添加小类</el-button>
        <el-button type="primary" @click="AddClass" style="float:right;margin-right:.5%">添加大类</el-button>
      </div>
      <div style="height:315px;margin-top:20px;width:80%;overflow-x:scroll;overflow-y:hidden; border:1px solid #ccc;margin:0 auto">
        <div class="block clearfix">
            <ul class="First">
              <li v-for="items in tableData1" v-bind:key="items.message" :class="{CheckedColor:CheckedTrue1==items.ptId}" v-bind:id="items.ptId" v-on:click="Checked1(items.ptId)">{{items.ptName}}</li>
            </ul>
            <ul class="Larst First" v-if="shows2">
              <li v-for="items in tableData2" v-bind:key="items.message" :class="{CheckedColor:CheckedTrue2==items.ptdId}" v-bind:id="items.ptdId" v-on:click="Checked2(items.ptdId)">{{items.ptdName}}</li>
            </ul>
            <ul class="Larst First" v-if="shows3">
              <li v-for="items in tableData3" v-bind:key="items.message" :class="{CheckedColor:CheckedTrue3==items.ptdId}" v-bind:id="items.ptdId" v-on:click="Checked3(items.ptdId)">{{items.ptdName}}</li>
            </ul>
            <ul class="Larst First" v-if="shows4">
              <li v-for="items in tableData4" v-bind:key="items.message" :class="{CheckedColor:CheckedTrue4==items.ptdId}" v-bind:id="items.ptdId" v-on:click="Checked4(items.ptdId)">{{items.ptdName}}</li>
            </ul>
            <ul class="Larst First" v-if="shows5">
              <li v-for="items in tableData5" v-bind:key="items.message" :class="{CheckedColor:CheckedTrue5==items.ptdId}" v-bind:id="items.ptdId" v-on:click="Checked5(items.ptdId)">{{items.ptdName}}</li>
            </ul>
            <ul class="Larst First" v-if="shows6">
              <li v-for="items in tableData6" v-bind:key="items.message" :class="{CheckedColor:CheckedTrue6==items.ptdId}" v-bind:id="items.ptdId" v-on:click="Checked6(items.ptdId)">{{items.ptdName}}</li>
            </ul>
            <ul class="Larst First" v-if="shows7">
              <li v-for="items in tableData7" v-bind:key="items.message" :class="{CheckedColor:CheckedTrue7==items.ptdId}" v-bind:id="items.ptdId" v-on:click="Checked7(items.ptdId)">{{items.ptdName}}</li>
            </ul>
            <ul class="Larst First" v-if="shows8">
              <li v-for="items in tableData8" v-bind:key="items.message" :class="{CheckedColor:CheckedTrue8==items.ptdId}" v-bind:id="items.ptdId" v-on:click="Checked8(items.ptdId)">{{items.ptdName}}</li>
            </ul>
        </div>

      </div>

      <!-- 信息 -->
      <div class="htmlInfo" v-if="BodyInfo">
            <el-form :model="HtmlInfo"  ref="HtmlInfo" class="demo-ruleForm clearfix">
              <el-form-item label="类别名称：" prop="ptdName" label-width="100px">
                <el-input v-model="HtmlInfo.ptdName"></el-input>
              </el-form-item>
              <el-form-item label="类别标识：" prop="ptdId" label-width="100px">
                <span>{{HtmlInfo.ptdId}}</span>
              </el-form-item>
                <div style="width:90%;height:20px;background-color:#ffffff;float:left;padding-left:18px;" v-if="DataArray==0">类别图片：<el-button type="text" :disabled="TypePicDisabled" style="padding:0;margin:0" @click="TypePicVisible = true">查看</el-button></div>
                <div class="vue-uploader" style="margin-left:100px;width:440px;height:200px;overflow:hidden;position: relative;" v-if="DataArray==0">
                    <!-- 查看图片 -->
                    <el-dialog width="330px" title="图片展示" :visible.sync="TypePicVisible" append-to-body>
                            <div width="330px">
                                <el-carousel trigger="click" height="300px">
                                    <el-carousel-item v-for="item in fileList" :key="item.name">
                                        <img :src="item.src" alt="" style="width:100%;height:100%">
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                    </el-dialog>    
                    <div class="file-list" style="overflow:hidden;float:left">
                        <section v-for="(file, index) of filesX" class="file-item draggable-item" :key="file.name" style="float:left">
                            <img :src="file.src" alt="" ondragstart="return false;">
                            <span class="file-remove" @click="removeX(index)">+</span>
                        </section>
                        <section v-if="statusX == 'ready'" class="file-item" style="float:left">
                            <div class="add">
                                <input type="file" @change="fileChangedX" ref="file" multiple="multiple" accept="image/jpg,image/jpeg,image/png,image/bmp">
                            </div>
                        </section>
                    </div>
                        <div style="width:160px;height:160px;position: absolute;bottom:15px;right:120px;background-color:#ffffff"></div>
                    
                </div>
                <el-form-item style="float:right;margin-bottom:0px;width:100%" class="clearfix"  v-if="HtmlInfo.ptdId">
                    <el-button type="primary" @click="submitInfo('HtmlInfo')" style="float:right;margin-right:30px">确定</el-button>
                </el-form-item>
            </el-form>    
      </div>




        <el-dialog class="bomb" title="添加大类界面" :visible.sync="dialogFormVisible" :close-on-click-modal='false' @close="closeDialog('form')">
            <el-form :model="form" :rules="rules" ref="form" class="demo-ruleForm clearfix">
            <el-form-item label="大类名称：" prop="ptName" label-width="100px">
              <el-input v-model="form.ptName"></el-input>
            </el-form-item>

            <el-form-item label="大类标识：" prop="ptId" label-width="100px">
              <el-input v-model="form.ptId"></el-input>
            </el-form-item>

            <el-form-item style="float:right;margin-bottom:0px;width:100%" class="clearfix">
                <el-button @click="resetForm('form')" style="float:right">关闭</el-button>                
                <el-button type="primary" @click="submitForm('form')" style="float:right;margin-right:30px">确定</el-button>
            </el-form-item>
            </el-form>
        </el-dialog>


        <el-dialog class="bomb" title="添加小类界面" :visible.sync="HtmlInfoVisible" :close-on-click-modal='false' @close="closeDialogs('HtmlInfo')">
            <el-form :model="HtmlInfo"  ref="HtmlInfo" :rules="rules" class="demo-ruleForm clearfix">
            <el-form-item label="小类名称：" prop="smallName" label-width="100px">
              <el-input v-model="HtmlInfo.smallName"></el-input>
            </el-form-item>
            <el-form-item label="小类标识：" prop="smallptdId" label-width="100px">
              <el-input v-model="HtmlInfo.smallptdId"></el-input>
            </el-form-item>
                <div style="width:90%;height:20px;background-color:#ffffff;float:left;padding-left:18px;font-weight:700;color:#606266">类别图片：</div>
                <div class="vue-uploader" style="width:320px;overflow:hidden;margin-left:100px">
                    <div class="file-list" style="width:150px;height:150px;float:left">
                        <section v-for="(file, index) of files" class="file-item draggable-item" :key="file.name">
                            <img :src="file.src" alt="" ondragstart="return false;">
                            <span class="file-remove" @click="remove(index)">+</span>
                        </section>
                        <section v-if="status == 'ready'" class="file-item">
                            <div class="add">
                                <input type="file" @change="fileChanged" ref="fileInfo" multiple="multiple" accept="image/jpg,image/jpeg,image/png,image/bmp">
                            </div>
                        </section>
                    </div>
                    <!-- <section v-if="files.length != 0" class="upload-func">
                        <div class="progress-bar">
                            <section v-if="uploading" :width="(percent * 100) + '%'">{{(percent * 100) + '%'}}</section>
                        </div>
                    </section> -->
                </div>

            <el-form-item style="float:right;margin-bottom:0px;width:100%" class="clearfix">
                <el-button @click="HtmlInfoForms('HtmlInfo')" style="float:right">关闭</el-button>                
                <el-button type="primary" @click="HtmlInfoForm('HtmlInfo')" style="float:right;margin-right:30px">确定</el-button>
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
        disabledss:false,
        CheckedTrue1:'',
        CheckedTrue2:'',
        CheckedTrue3:'',
        CheckedTrue4:'',
        CheckedTrue5:'',
        CheckedTrue6:'',
        CheckedTrue7:'',
        CheckedTrue8:'',
        tableData1:[],
        tableData2:[],
        tableData3:[],
        tableData4:[],
        tableData5:[],
        tableData6:[],
        tableData7:[],
        tableData8:[],
        BodyInfo:false,
        shows2:false,
        shows3:false,
        shows4:false,
        shows5:false,
        shows6:false,
        shows7:false,
        shows8:false,

        TypePicDisabled:false,
        TypePicVisible:false,


      // 添加大类
        dialogFormVisible:false,
        form:{
          ptId:'',
          ptName:'',
        },
        
        // 获取列表
        DetailInfo1:[],
        DetailInfo2:[],
        DetailInfo3:[],
        DetailInfo4:[],
        DetailInfo5:[],
        DetailInfo6:[],
        DetailInfo7:[],
        DetailInfo8:[],

        // 页面信息
        // 判断是不是最小类
        DataArray:'',
        HtmlInfo:{
            smallptdId:'',
            ptId:'',
            smallName:'',
            ptdId:'',            
        },
        fileList:[{name:'01',src:''}],
        HtmlInfoVisible:false,
        status: 'ready',
        statusX: 'ready',
        files: [],
        filesX: [],
        point: {},
        uploading: false,
        percent: 0,

        Pics:'',
        PicsX:'',

        rules: {
          ptName: [
            { required: true, message: '请添加大类名称', trigger: 'blur' },
            { min: 1, message: '不能为空', trigger: 'blur' }
          ],
          ptId: [
            { required: true, message: '请添加大类', trigger: 'blur' },
            { min: 1, message: '不能为空', trigger: 'blur' }
          ],
          smallName: [
            { required: true, message: '请添加小类名称', trigger: 'blur' },
            { min: 1, message: '不能为空', trigger: 'blur' }
          ],
          smallptdId: [
            { required: true, message: '请添加小类标识', trigger: 'blur' },
            { min: 1, message: '不能为空', trigger: 'blur' }
          ],
        },
      };
    },
    methods: {
        getDataList:function(n1){
            // console.log(this.userInfo)
            // 获取商品大类列表
            axios.post(api.api.url+n1,qs.stringify({
                uId:this.userInfo.uId,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse.data.data)
                this.tableData1=reponse.data.data
                this.DetailInfo1=reponse.data.data
            }) 
        },
        getData:function(){
            this.getDataList('msGetProductTypeList')
        } ,

        Checked1(e){
            this.BodyInfo=false
            this.disabledss=true
            this.CheckedTrue2='';
            this.CheckedTrue3='';
            this.shows3=false;
            this.CheckedTrue4='';
            this.shows4=false;
            this.CheckedTrue5='';
            this.shows5=false;
            this.CheckedTrue6='';
            this.shows6=false;
            this.CheckedTrue7='';
            this.shows7=false;
            this.CheckedTrue8='';
            this.shows8=false;
            this.CheckedTrue1=e
            axios.post(api.api.url+'msSysSettingGetPTDByPtId',qs.stringify({
                uId:this.userInfo.uId,
                ptId:e,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                //   console.log(reponse.data)
                this.HtmlInfo={}
                // console.log(e)
                this.HtmlInfo.ptId=e
                this.HtmlInfo.ptdId=e

                if(reponse.data.data==0){
                    this.shows2=false
                    // console.log(this.DetailInfo1)
                }else{
                    this.shows2=true
                    this.tableData2=reponse.data.data
                    this.DetailInfo2=reponse.data.data
                }
            })         
        },

        Checked2(e){
            this.BodyInfo=true
            this.disabledss=true
            this.CheckedTrue3='';
            this.CheckedTrue4='';
            this.shows4=false;
            this.CheckedTrue5='';
            this.shows5=false;
            this.CheckedTrue6='';
            this.shows6=false;
            this.CheckedTrue7='';
            this.shows7=false;
            this.CheckedTrue8='';
            this.shows8=false;

            this.CheckedTrue2=e
            axios.post(api.api.url+'msSysSettingGetPTDByPtId',qs.stringify({
                uId:this.userInfo.uId,
                ptId:e,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse.data)
                this.DataArray=reponse.data.data.length
                    // console.log(this.DetailInfo2)
                    for(var i=0;i<this.DetailInfo2.length;i++){
                        // this.HtmlInfo={}
                    if(e==this.DetailInfo2[i].ptdId){
                        // console.log(this.DetailInfo2[i])
                        this.HtmlInfo=this.DetailInfo2[i]
                        if(this.DetailInfo2[i].pName==''){
                            this.TypePicDisabled=true;
                        } else {
                            this.TypePicDisabled=false;
                            this.fileList[0].src=api.api.rootUrl+api.api.goodsClass+this.DetailInfo2[i].pName
                        }
                    }
                    }

                if(reponse.data.data==0){
                    this.shows3=false
                    // console.log(e)
                }else{
                    this.shows3=true
                    this.tableData3=reponse.data.data
                    this.DetailInfo3=reponse.data.data
                }
            })
        },

        Checked3(e){
            this.BodyInfo=true
            this.disabledss=true
            //   console.log(e)
            this.CheckedTrue4='';
            this.CheckedTrue5='';
            this.shows5=false;
            this.CheckedTrue6='';
            this.shows6=false;
            this.CheckedTrue7='';
            this.shows7=false;
            this.CheckedTrue8='';
            this.shows8=false;
            this.CheckedTrue3=e
            axios.post(api.api.url+'msSysSettingGetPTDByPtId',qs.stringify({
                uId:this.userInfo.uId,
                ptId:e,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse.data)
                this.DataArray=reponse.data.data.length
                    for(var i=0;i<this.DetailInfo3.length;i++){
                        // this.HtmlInfo={}
                    if(e==this.DetailInfo3[i].ptdId){
                        // console.log(this.DetailInfo3[i])
                        this.HtmlInfo=this.DetailInfo3[i]
                        if(this.DetailInfo3[i].pName==''){
                            this.TypePicDisabled=true;
                        } else {
                            this.TypePicDisabled=false;
                            this.fileList[0].src=api.api.rootUrl+api.api.goodsClass+this.DetailInfo3[i].pName
                        }
                    }
                    }

                if(reponse.data.data==0){
                    this.shows4=false
                    // console.log(this.DetailInfo3)
                }else{
                    this.shows4=true
                    this.tableData4=reponse.data.data
                    this.DetailInfo4=reponse.data.data
                }
            })
        },
        Checked4(e){
            this.BodyInfo=true
            this.disabledss=true
            this.CheckedTrue5='';
            this.CheckedTrue6='';
            this.shows6=false;
            this.CheckedTrue7='';
            this.shows7=false;
            this.CheckedTrue8='';
            this.shows8=false;
            this.CheckedTrue4=e
            axios.post(api.api.url+'msSysSettingGetPTDByPtId',qs.stringify({
                uId:this.userInfo.uId,
                ptId:e,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse.data)
                this.DataArray=reponse.data.data.length
                    for(var i=0;i<this.DetailInfo4.length;i++){
                        // this.HtmlInfo={}
                    if(e==this.DetailInfo4[i].ptdId){
                        // console.log(this.DetailInfo4[i])
                        this.HtmlInfo=this.DetailInfo4[i]
                        if(this.DetailInfo4[i].pName==''){
                            this.TypePicDisabled=true;
                        } else {
                            this.TypePicDisabled=false;
                            this.fileList[0].src=api.api.rootUrl+api.api.goodsClass+this.DetailInfo4[i].pName
                        }
                    }
                    }

                if(reponse.data.data==0){
                    this.shows5=false
                    // console.log(this.DetailInfo4)
                }else{
                    this.shows5=true
                    this.tableData5=reponse.data.data
                    this.DetailInfo5=reponse.data.data
                }
            })
        },
        Checked5(e){
            this.BodyInfo=true
            this.disabledss=true
            this.CheckedTrue6='';
            this.CheckedTrue7='';
            this.shows7=false;
            this.CheckedTrue8='';
            this.shows8=false;

            this.CheckedTrue5=e
            axios.post(api.api.url+'msSysSettingGetPTDByPtId',qs.stringify({
                uId:this.userInfo.uId,
                ptId:e,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse.data)
                this.DataArray=reponse.data.data.length
                    for(var i=0;i<this.DetailInfo5.length;i++){
                        // this.HtmlInfo={}
                    if(e==this.DetailInfo5[i].ptdId){
                        // console.log(this.DetailInfo5[i])
                        this.HtmlInfo=this.DetailInfo5[i]
                        if(this.DetailInfo5[i].pName==''){
                            this.TypePicDisabled=true;
                        } else {
                            this.TypePicDisabled=false;
                            this.fileList[0].src=api.api.rootUrl+api.api.goodsClass+this.DetailInfo5[i].pName
                        }
                    }
                    }

                if(reponse.data.data==0){
                    this.shows6=false
                    // console.log(this.DetailInfo5)
                }else{
                    this.shows6=true
                    this.tableData6=reponse.data.data
                    this.DetailInfo6=reponse.data.data
                }
            })
        },
        Checked6(e){
            this.BodyInfo=true
            this.disabledss=true
            this.CheckedTrue7='';
            this.CheckedTrue8='';
            this.shows8=false;

            this.CheckedTrue6=e
            axios.post(api.api.url+'msSysSettingGetPTDByPtId',qs.stringify({
                uId:this.userInfo.uId,
                ptId:e,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse.data)
                this.DataArray=reponse.data.data.length
                    for(var i=0;i<this.DetailInfo6.length;i++){
                        // this.HtmlInfo={}
                    if(e==this.DetailInfo6[i].ptdId){
                        // console.log(this.DetailInfo6[i])
                        this.HtmlInfo=this.DetailInfo6[i]
                        if(this.DetailInfo6[i].pName==''){
                            this.TypePicDisabled=true;
                        } else {
                            this.TypePicDisabled=false;
                            this.fileList[0].src=api.api.rootUrl+api.api.goodsClass+this.DetailInfo6[i].pName
                        }
                    }
                    }

                if(reponse.data.data==0){
                    this.shows7=false
                    // console.log(this.DetailInfo6)
                }else{
                    this.shows7=true
                    this.tableData7=reponse.data.data
                    this.DetailInfo7=reponse.data.data
                }
            })
        },
        Checked7(e){
            this.BodyInfo=true
            this.disabledss=true
            this.CheckedTrue8='';
            this.CheckedTrue7=e
            axios.post(api.api.url+'msSysSettingGetPTDByPtId',qs.stringify({
                uId:this.userInfo.uId,
                ptId:e,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse.data)
                this.DataArray=reponse.data.data.length
                    for(var i=0;i<this.DetailInfo7.length;i++){
                        // this.HtmlInfo={}
                    if(e==this.DetailInfo7[i].ptdId){
                        // console.log(this.DetailInfo7[i])
                        this.HtmlInfo=this.DetailInfo7[i]
                        if(this.DetailInfo7[i].pName==''){
                            this.TypePicDisabled=true;
                        } else {
                            this.TypePicDisabled=false;
                            this.fileList[0].src=api.api.rootUrl+api.api.goodsClass+this.DetailInfo7[i].pName
                        }
                    }
                    }

                if(reponse.data.data==0){
                    this.shows8=false
                    // console.log(this.DetailInfo7)
                }else{
                    this.shows8=true
                    this.tableData8=reponse.data.data
                    this.DetailInfo8=reponse.data.data
                }
            })
        },
        Checked8(e){
            this.BodyInfo=true
            this.disabledss=true
            this.CheckedTrue8=e
            axios.post(api.api.url+'msSysSettingGetPTDByPtId',qs.stringify({
                uId:this.userInfo.uId,
                ptId:e,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse.data)
                this.DataArray=reponse.data.data.length
                    if(e==this.DetailInfo8[i].ptdId){
                    // console.log(this.DetailInfo7[i])
                    this.HtmlInfo=this.DetailInfo8[i]
                    if(this.DetailInfo8[i].pName==''){
                            this.TypePicDisabled=true;
                    } else {
                            this.TypePicDisabled=false;
                            this.fileList[0].src=api.api.rootUrl+api.api.goodsClass+this.DetailInfo8[i].pName
                    }
                    }

                this.tableData9=reponse.data.data
                this.DetailInfo8=reponse.data.data
            })
        },


        // 添加大类
        AddClass(){
          this.dialogFormVisible=true
        },
        // 确认上传
        submitForm(form) {
            // console.log(this.form)
            this.$refs[form].validate((valid) => {
                if (valid) {
                    // 添加商品大类接口
                    axios.post(api.api.url+'msAddProductTypeInfo',qs.stringify({
                        uId:this.userInfo.uId,
                        ptId:this.form.ptId,
                        ptName:this.form.ptName,
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
            this.$refs[form].resetFields();
        },
        // 取消上传
        closeDialog(form) {
            this.dialogFormVisible=false
            this.$refs[form].resetFields();
        },




        // 添加小类
        AddSmallClass(){
            // console.log(this.HtmlInfo)
            this.HtmlInfoVisible=true
        },

        HtmlInfoForm(HtmlInfo){
            // console.log(this.$refs)
            this.$refs[HtmlInfo].validate((valid) => {
                if(valid){
                    //  这里是OSS
                    const client = new OSS.Wrapper({
                            region: 'oss-cn-beijing',
                            endpoint:'https://oss-cn-beijing.aliyuncs.com',
                            accessKeyId: api.api.accessKeyId,
                            accessKeySecret: api.api.accessKeySecret,
                            bucket: api.api.bucketName
                    });

                    const fNum = this.files;
                    for(var i=0;i<fNum.length;i++){
                        var f=fNum[i].file
                        // console.log(f)
                        const Name=f.name
                        // console.log(Name)
                        const suffix = Name.substr(Name.indexOf("."));
                        const obj=this.timestamp()+Math.ceil(Math.random()*10*100);
                        const storeAs = api.api.addGoodImg+obj+suffix  //  路径+时间戳+后缀名
                        // console.log(storeAs)
                        this.Pics=obj+suffix 
                        // console.log(this.Pics)
                        client.multipartUpload(storeAs, f).then(function (result){
                            // console.log(result.res.requestUrls)
                        })
                    }
                    // console.log(this.HtmlInfo)
                    axios.post(api.api.url+'msAddProductTypeDetailInfo',qs.stringify({
                        uId:this.userInfo.uId,
                        ptdId:this.HtmlInfo.smallptdId,
                        ptId:this.HtmlInfo.ptId,
                        ptdName:this.HtmlInfo.smallName,
                        ptdFatherId:this.HtmlInfo.ptdId,
                        pName:this.Pics,
                    }),{emulateJSON: true},
                    {
                    headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                    }
                    ).then(reponse=>{
                        // console.log(reponse)
                        this.reload()
                        this.HtmlInfoVisible=false
                        // this.getData()
                        // this.files=[]
                        // this.HtmlInfoVisible=false
                        // this.$refs[HtmlInfo].resetFields();            
                        
                    })                     
                }
            }) 
        },

        // 取消
        HtmlInfoForms(HtmlInfo){
            this.reload()
            // this.$refs[HtmlInfo].resetFields();
            this.HtmlInfoVisible=false
            // this.files=[];
        },
        closeDialogs(HtmlInfo){
            this.reload()
            // this.$refs[HtmlInfo].resetFields();
            this.HtmlInfoVisible=false
            // this.files=[];
        },


        // 添加小类
        remove(index) {
            this.files.splice(index, 1)
        },
        fileChanged() {
            const list = this.$refs.fileInfo.files
            for (let i = 0; i < list.length; i++) {
                if (!this.isContain(list[i])) {
                    const item = {
                        name: list[i].name,
                        size: list[i].size,
                        file: list[i]
                    }
                    this.html5Reader(list[i], item)
                    this.files.push(item)
                }
            }
            this.$refs.fileInfo.value = ''
        },
        // 将图片文件转成BASE64格式
        html5Reader(file, item){
            const reader = new FileReader()
            reader.onload = (e) => {
                this.$set(item, 'src', e.target.result)
            }
            reader.readAsDataURL(file)
        },
        isContain(file) {
            return this.files.find((item) => item.name === file.name && item.size === file.size)
        },




        // 信息修改
      handleRemove(file, htmlPic) {
        // console.log(file, htmlPic);
      },


        submitInfo(HtmlInfo) {
            // console.log(this.HtmlInfo)
            this.$refs[HtmlInfo].validate((valid) => {
                if(valid){
                    const client = new OSS.Wrapper({
                            region: 'oss-cn-beijing',
                            endpoint:'https://oss-cn-beijing.aliyuncs.com',
                            accessKeyId: api.api.accessKeyId,
                            accessKeySecret: api.api.accessKeySecret,
                            bucket: api.api.bucketName
                    });

                    const fNum = this.filesX;
                    // console.log(fNum)
                    if(fNum!=0){
                        for(var i=0;i<fNum.length;i++){
                            var f=fNum[i].file
                            // console.log(f)
                            const Name=f.name
                            // console.log(Name)
                            const suffix = Name.substr(Name.indexOf("."));
                            const obj=this.timestamp()+Math.ceil(Math.random()*10*100);
                            const storeAs = api.api.addGoodImg+obj+suffix  //  路径+时间戳+后缀名
                            // console.log(storeAs)
                            this.PicsX=obj+suffix 
                            // console.log(this.PicsX)
                            client.multipartUpload(storeAs, f).then(function (result){
                                // console.log(result.res.requestUrls)
                            })
                        }
                    }else{
                        this.PicsX=this.HtmlInfo.pName
                    }

                        // console.log(this.PicsX)
                        
                    axios.post(api.api.url+'msChangeProductTypeDetailInfo',qs.stringify({
                        uId:this.userInfo.uId,
                        ptdId:this.HtmlInfo.ptdId,
                        ptdName:this.HtmlInfo.ptdName,
                        pTag:this.HtmlInfo.pTag,
                        pName:this.PicsX,
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
                                    message: '修改成功！',
                                    type: 'success'
                                }); 
                                this.filesX=[];
                                this.HtmlInfo.pName=this.PicsX
                                this.PicsX=''
                                setTimeout(() => {
                                    this.$router.push({ path: 'systemgoodsclass' })
                                }, 1000);
                            } else {
                                this.$notify.error({
                                    title: '失败',
                                    message: reponse.data.data.errorString,
                                    type: 'error'
                                }); 
                            }
                        } else {
                            this.$notify.error({
                                title: '失败',
                                message: reponse.data.errorString,
                                type: 'error'
                            }); 
                        }
                        

                    }) 
                }
            }) 
            // this.$refs[HtmlInfo].resetFields();
        },


        removeX(index) {
            this.filesX.splice(index, 1)
            this.TypePicDisabled=true;
        },
        fileChangedX() {
            // 当添加后解禁查看按钮
            this.TypePicDisabled=false;
            const list = this.$refs.file.files
            for (let i = 0; i < list.length; i++) {
                if (!this.isContain(list[i])) {
                    const item = {
                        name: list[i].name,
                        size: list[i].size,
                        file: list[i]
                    }
                    this.html5Reader(list[i], item)
                    this.filesX.push(item)
                    this.fileList[0]=item;
                }
            }
            this.$refs.file.value = ''
        },




        //  时间戳
        timestamp:function(){  
            const time = new Date();  
            const y = time.getFullYear();  
            const m = time.getMonth()+1;  
            const d = time.getDate();  
            const h = time.getHours();  
            const mm = time.getMinutes();  
            const s = time.getSeconds();  
            const ms = time.getMilliseconds()  
            return ""+y+this.Add0(m)+this.Add0(d)+this.Add0(h)+this.Add0(mm)+this.Add0(s)+this.Add0(ms);  
        },
        Add0:function(m){  
            return m<10?'0'+m : m;  
        } ,



    },
    //   钩子函数
    created:function(){
      this.getData()
      
    }

  };
</script>
<style lang="less" scoped>
.CheckedColor{
  background-color: #409eff;
  color:#ffffff;
}
.systemgoodsclass{
    overflow-y: scroll;
    min-height: 800px;
    height:100%;
}
.block{
  width:1200px;
  height: 300px;
  .First{
    overflow-y: scroll;
    float: left;
    width:200px;
    height: 300px;
    background-color: #fff;
    li{
      width: 100%;
      height: 35px;
      line-height: 35px;
      text-align: center;
    }
  }
}




.htmlInfo{
  margin: 20px auto;
  width:80%;
}

// 图片上传
.vue-uploader .file-list {
    padding: 10px 0px;
}
.vue-uploader .file-list:after {
    content: '';
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
    font-size: 0;
}
.vue-uploader .file-list .file-item {
    float: left;
    margin:0 7px;
    margin-top: 10px;
    border-radius: 6px;
    position: relative;
    width: 150px;
    text-align: center;
}
.vue-uploader .file-list .file-item img{
    border-radius: 6px;
    width: 150px;
    height: 150px;
    border: 1px solid #ececec;
}
.vue-uploader .file-list .file-item .file-remove {
    position: absolute;
    right: 4px;
    display: none;
    top: 4px;
    width: 20px;
    height: 20px;
    font-size:20px;
    text-align: center;
    color: white;
    cursor: pointer;
    line-height: 20px;
    border-radius: 100%;
    transform: rotate(45deg);
    background: rgba(0, 0, 0, 0.5);
}
.vue-uploader .file-list .file-item:hover .file-remove {
    display: inline;
}
.vue-uploader .file-list .file-item .file-name {
    margin: 0;
    height: 40px;
    word-break: break-all;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.vue-uploader .add {
    position: relative;
    overflow: hidden;
    width: 150px;
    height: 150px;
    float: left;
    text-align: center;
    line-height: 150px;
    font-size: 30px;
    cursor: pointer;
    background: url(../../assets/upImg.png) no-repeat;
    background-size: 100% 100%;
    input{
        position: absolute;
        top: -25px;
        left: -15px;
        width: 180px;
        height:200px;
        opacity:0;
        filter:alpha(opacity=0);
    }
}
.vue-uploader .upload-func {
    display: flex;
    padding: 10px;
    margin: 0px;
    background: #f8f8f8;
    border-top: 1px solid #ececec;
}
.vue-uploader .upload-func .progress-bar {
    flex-grow: 1;
}
.vue-uploader .upload-func .progress-bar section {
    margin-top: 5px;
    background: #00b4aa;
    border-radius: 3px;
    text-align: center; 
    color: #fff;
    font-size: 12px;
    transition: all .5s ease;
}
.vue-uploader .upload-func .operation-box {
    flex-grow: 0;
    padding-left: 10px;
}
.vue-uploader .upload-func .operation-box button {
    padding: 4px 12px;
    color: #fff;
    background: #007ACC;
    border: none;
    border-radius: 2px;
    cursor: pointer;
}
.vue-uploader > input[type="file"] {
    display: none;
}

</style>
