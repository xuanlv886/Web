<template>
    <div class="systemgoodsattribute">
        <div id="search">
            <el-form ref="search" :model="search" class="clearfix">
                <el-form-item label="属性名称：" label-width="100px">
                    <el-input v-model="search.ppName"></el-input>
                </el-form-item>
                <el-form-item label="属性值名称：" label-width="103px">
                    <el-input v-model="search.ppValue"></el-input>
                </el-form-item>
                <el-form-item label="属性标识：" label-width="100px">
                    <el-input v-model="search.ppTag"></el-input>
                </el-form-item>

                <el-form-item style="width:90px;margin-right:26px">
                    <el-button type="primary" icon="el-icon-search" @click="onSubmit(search)">查找</el-button>
                </el-form-item>
                <el-form-item style="width:130px;float:left;margin-left:6px">
                    <el-button type="primary" @click="handleClick">属性关联类别</el-button>
                </el-form-item>
                <el-form-item style="width:100px;float:right;margin-right:6px">
                    <el-button type="primary" @click="Release">添加属性</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="content">
            <template>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="ppName" label="属性名称"></el-table-column>
                    <el-table-column prop="ppValue" label="属性值"></el-table-column>
                    <el-table-column prop="ppTag" label="属性标识"></el-table-column>
                    <el-table-column prop="ppChoseType" label="是否可多选"></el-table-column>
                    <el-table-column prop="ppRequired" label="是否可必填"></el-table-column>
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
        <el-dialog class="bomb" title="属性关联类别" :visible.sync="dialogFormVisible" :close-on-click-modal='false'>
            <el-form :model="form"  ref="form" class="demo-ruleForm goodsClass clearfix">
                <el-form-item label="类别标识：" prop="ptdId" label-width="100px">
                    <el-input v-model="form.ptdId"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="searchgoodsClass" style="margin-left:40px">搜索</el-button>
                </el-form-item>
                <p><span style="margin-left:18px;height:40px;line-height:40px;font-weight:700;color:#606266">类别名称：</span><span style="color:red">{{goodsClass}}</span> </p>
                <p><span style="margin-left:18px;font-weight:700;color:#606266">关联属性：</span> <span style="color:red">请使用英文 “ ; ” （分号） 作为分割</span> </p>
                <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 3}" placeholder="暂无" resize="none" v-model="textarea"></el-input>

                <el-form-item style="float:right;margin-top:20px;width:100%" class="clearfix">
                    <el-button @click="resetForm('form')" style="float:right;margin-right:0px">关闭</el-button>                
                    <el-button type="primary" @click="submitForm('form')" :disabled="disabled" style="float:right;margin-right:30px">确定</el-button>
                </el-form-item>
            </el-form>
            <!-- 弹框内的搜索 -->
            <div id="box" v-if="boxShow">
                <el-form ref="formSearch" :model="formSearch" class="clearfix">
                    <el-form-item label="属性名称：" label-width="90px">
                        <el-input v-model="formSearch.ppName"></el-input>
                    </el-form-item>
                    <el-form-item label="属性值名称：" label-width="100px">
                        <el-input v-model="formSearch.ppValue"></el-input>
                    </el-form-item>
                    <el-form-item label="属性标识：" label-width="90px">
                        <el-input v-model="formSearch.ppTag"></el-input>
                    </el-form-item>
                    <el-form-item style="width:70px;margin-left:10px;float:right">
                        <el-button type="primary" @click="SearchInside(formSearch)">查找</el-button>
                    </el-form-item>
                </el-form>
                <template>
                    <el-table :data="DataList" style="width: 100%">
                        <el-table-column prop="ppName" label="属性名称"></el-table-column>
                        <el-table-column prop="ppValue" label="属性值"></el-table-column>
                        <el-table-column prop="ppTag" label="属性标识"></el-table-column>
                    </el-table>
                </template>
                <div id="footerPage">
                    <div class="block">
                        <el-pagination @size-change="FormhandleSizeChange" @current-change="FormhandleCurrentChange" :current-page.sync="FormcurrentPage" :page-size="FormpageSize" layout="prev, pager, next, jumper" :total="FormtotalCount"></el-pagination>
                    </div>
                </div>
            </div>
        </el-dialog>
        
        <!-- 发布公告 -->
        <el-dialog class="bomb" title="添加商品属性" :visible.sync="dialogFormVisibleS" @close="closeDialog('ruleForm')" :close-on-click-modal='false'>
            <el-form :model="ruleForm"  ref="ruleForm" :rules="rules" class="demo-ruleForm clearfix" label-position="left">
            <el-form-item label="商品属性名称：" prop="ppName" label-width="150px">
                <el-input v-model="ruleForm.ppName"></el-input>
            </el-form-item>
            <el-form-item label="商品属性值：" prop="ppValues" label-width="150px">
                <el-input v-model="ruleForm.ppValues"></el-input>
            </el-form-item>
            <el-form-item label="属性二级标识：" prop="ppTag" label-width="150px">
                <el-input v-model="ruleForm.ppTag"></el-input>
            </el-form-item>
            <el-form-item label="单选多选：" prop="ppChoseType">
                <el-select v-model="ruleForm.ppChoseType" placeholder="请选择">
                <el-option label="单选" value="0"></el-option>
                <el-option label="多选" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否必填：" prop="ppRequired">
                <el-select v-model="ruleForm.ppRequired" placeholder="请选择是否必填">
                <el-option label="非必填" value="0"></el-option>
                <el-option label="必填" value="1"></el-option>
                </el-select>
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
          ppName: '',
          ppValue: '',
          ppTag: '',
        },
        // 数据
        tableData: [],
        // 分页
        currentPage: 1, //  默认显示第几页
        pageSize: 14, //  每页显示多少条数据
        totalCount: 1, //  数据的总条数
        // 弹框
        dialogFormVisible:false,
        goodsClass:'',
        textarea:'',
        disabled:true,
        // 弹框的搜索小类
        formSearch:{
            ppName:'',
            ppValue:'',
            ppTag:'',
        },
        // 显示隐藏
        boxShow:false,

        DataList:[],
        // 分页
        FormcurrentPage: 1, //  默认显示第几页
        FormpageSize: 5, //  每页显示多少条数据
        FormtotalCount: 1, //  数据的总条数
        // 分页
        aa1:'',
        aa2:'',
        aa3:'',  


        dialogFormVisibleS:false,
        form:{
            ptdId:''
        },
        ruleForm:{
            ppName:'',
            ppValues:'',
            ppTag:'',
            ppChoseType:'1',
            ppRequired:'1',
        },
        rules: {
          ppName: [
            { required: true, message: '请输入属性名称', trigger: 'blur' },
            { min: 1, message: '长度在最少 1 个字符', trigger: 'blur' }
          ],
          ppValues: [
            { required: true, message: '请输入属性值', trigger: 'blur' },
            { min: 1, message: '长度在最少 1 个字符', trigger: 'blur' }
          ],
          ppTag: [
            { required: true, message: '请输入属性二级标识', trigger: 'blur' },
            { min: 1, message: '长度在最少 1 个字符', trigger: 'blur' }
          ],

        },

        
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
                ppName:n2,
                ppValue:n3,
                ppTag:n4,
                start:n5,
                end:this.pageSize,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse.data.data.properties)
                for(var i=0;i<reponse.data.data.properties.length;i++){
                    // 是否可多选
                    if(reponse.data.data.properties[i].ppChoseType==0){
                        reponse.data.data.properties[i].ppChoseType='否'
                    }else{
                        reponse.data.data.properties[i].ppChoseType='是'
                    }
                    // 是否必填
                    if(reponse.data.data.properties[i].ppRequired==0){
                        reponse.data.data.properties[i].ppRequired='否'
                    }else{
                        reponse.data.data.properties[i].ppRequired='是'
                    }

                }
                this.tableData=reponse.data.data.properties
                this.totalCount=reponse.data.data.totalCount;
            }) 
        },
        getData:function(){
            this.getDataList('msGetProductPropertyList','','','','0')
            this.currentPage=1
        },

        // 分页
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.getDataList('msGetProductPropertyList',this.a1,this.a2,this.a3,(val-1)*(this.pageSize))
        },

        // 搜索
        onSubmit() {
            // console.log(this.search);
            this.a1=this.search.ppName
            this.a2=this.search.ppValue
            this.a3=this.search.ppTag
            this.getDataList('msGetProductPropertyList',this.a1,this.a2,this.a3,'0')
            this.currentPage=1
        },
        // 数据查看
        handleClick() {
            this.dialogFormVisible=true
            this.textarea=''
            this.goodsClass=''
            this.form.ptdId=''          
        },
        searchgoodsClass(){
            if(this.form.ptdId!=''){
                this.disabled=false
                // console.log(this.form)
                axios.post(api.api.url+'msGetProductTypeRelationPropertiesByPtdId',qs.stringify({
                    uId:this.userInfo.uId,
                    ptdId:this.form.ptdId,
                    }),{emulateJSON: true},
                    {
                    headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                    }
                    ).then(reponse=>{
                    // console.log(reponse)
                if(reponse.data.data.status=="false"){
                    this.boxShow=false
                    this.disabled=true  
                    this.$notify.error({
                    title: '错误',
                    message: reponse.data.data.errorString
                    });
                }else{
                    this.boxShow=true
                    this.disabled=false  
                    this.goodsClass=reponse.data.data.ptdName;              
                    this.textarea=reponse.data.data.ppTags;
                    this.$notify({
                    title: '成功',
                    message: '搜索成功！',
                    type: 'success'
                    }); 
                }

                })  
            }

        },

        // 确认上传
        submitForm(form) {
            axios.post(api.api.url+'msChangeProductTypeRelationProperties',qs.stringify({
                uId:this.userInfo.uId,
                ptdId:this.form.ptdId,
                ppTags:this.textarea
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse)
                this.dialogFormVisible=false
            })  
        },

        // 取消上传
        resetForm(form) {
            this.dialogFormVisible=false
        },



        // 弹框中的搜索

        getAttributeContent(q1,q2,q3,q4){
            axios.post(api.api.url+'msGetProductPropertyList2',qs.stringify({
                uId:this.userInfo.uId,
                ppName:q1,
                ppValue:q2,
                ppTag:q3,
                start:q4,
                end:this.FormpageSize,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse.data.data)
                this.DataList=reponse.data.data.properties
                this.FormtotalCount=reponse.data.data.totalCount;
            }) 
        },
        SearchInside(){
            // console.log(this.formSearch)
            this.aa1=this.formSearch.ppName 
            this.aa2=this.formSearch.ppValue
            this.aa3=this.formSearch.ppTag
            this.getAttributeContent(this.aa1,this.aa2,this.aa3,'0')
            this.FormcurrentPage=1
        },
        // 分页
        FormhandleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
        },
        FormhandleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.getAttributeContent(this.aa1,this.aa2,this.aa3,(val-1)*(this.FormpageSize))
        },




        // 发布公告
        Release:function(){
            this.dialogFormVisibleS=true
        },
        
        // 发布公告确认上传
        determine(ruleForm) {
            this.$refs[ruleForm].validate((valid) => {    
                if (valid) {
                    // console.log(this.ruleForm)
                    axios.post(api.api.url+'msAddProductProperty',qs.stringify({
                        uId:this.userInfo.uId,
                        ppName:this.ruleForm.ppName,
                        ppValues:this.ruleForm.ppValues,
                        ppTag:this.ruleForm.ppTag,
                        ppChoseType:this.ruleForm.ppChoseType,
                        ppRequired:this.ruleForm.ppRequired,
                    }),{emulateJSON: true},
                    {
                    headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                    }
                    ).then(reponse=>{
                        // console.log(reponse)
                        // this.getData()
                        this.$notify({
                        title: '成功',
                        message: '添加成功！！！',
                        type: 'success'
                        }); 

                    }) 
                    // this.$refs[ruleForm].resetFields();
                    this.reload()
                    this.dialogFormVisibleS=false                        
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },

        // 发布公告取消上传
        cancel(ruleForm) {
            this.reload()
            this.dialogFormVisibleS=false
            // this.$refs[ruleForm].resetFields();
        },
        closeDialog(ruleForm) {
            this.reload()
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
    .systemgoodsattribute{
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


.goodsClass{
    width:100%;
    .el-form-item{
        width:50%;
        float: left;
    }
}
#box{
    position: relative;
    height:400px;
    width:100%;
    .el-form-item{
        width:29%;
        float: left;
    }
    #footerPage{
        position: absolute;
        left: 0;
        bottom: 0px;
        text-align: center;
        width: 100%;
        height: 40px;
        overflow: hidden;
        .block{
            margin: 10px auto;
            width: 70%;
        }
    }
}
</style>

