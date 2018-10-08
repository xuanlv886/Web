<template>
    <div class="goodsmangehome">
        <div id="search">
            <el-form ref="search" :model="search" class="clearfix">
                <el-form-item label="商品名称：" label-width="87px">
                    <el-input v-model="search.pName"></el-input>
                </el-form-item>
                <el-form-item label="是否为推荐商品：" prop="pHaveBooth" label-width="140px" style="width:270px">
                    <el-select v-model="search.pHaveBooth" placeholder="请选择是否为推荐商品">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="否" value="0"></el-option>
                    <el-option label="是" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品所属大类：" prop="ptId" label-width="140px" style="width:270px">
                    <el-select v-model="search.ptId" placeholder="请选择商品所属大类">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="item in ptIdList" v-bind:label="item.ptName" v-bind:value="item.ptId" :key="item.ptName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核状态：" prop="pChecked" label-width="96px">
                    <el-select v-model="search.pChecked" placeholder="请选择审核状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未通过" value="0"></el-option>
                    <el-option label="已通过" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="width:70px">
                    <el-button type="primary" @click="onSubmit(search)">查找</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="content">
            <template>
                <el-table :data="tableData" style="width: 100%;">
                    <el-table-column fixed prop="sName" label="商户名称" width="220"></el-table-column>
                    <el-table-column prop="pName" label="商品名称" width="400"></el-table-column>
                    <el-table-column prop="ptdName" label="所属小类"></el-table-column>
                    <el-table-column prop="pCreateTime" label="创建时间" min-width="150"></el-table-column>
                    <el-table-column prop="pChecked" label="审核状态">
                        <template slot-scope="scope">
                                <span v-if="scope.row.pChecked=='未通过'" style="color: red">未通过</span>
                                <span v-else style="color: #549c54">已通过</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="pHaveBooth" label="是否为推荐商品"></el-table-column>
                    <el-table-column prop="pDel" label="是否被删除"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="80">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleClick(dialogFormVisible,examinedialogFormVisible, scope.row)">查看</el-button>
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
        <el-dialog class="bomb" title="商品详情" :visible.sync="dialogFormVisible" :close-on-click-modal='false'>
            <el-form :model="form"  ref="form" class="demo-ruleForm clearfix" label-position="left">
            <el-form-item label="商品名称：" prop="pName">
                <span>{{form.pName}}</span>
            </el-form-item>
            <el-form-item label="所属店铺：" prop="sName">
                <span>{{form.sName}}</span>
            </el-form-item>
            <el-form-item label="商品品牌：" prop="pBrand">
                <span>{{form.pBrand}}</span>
            </el-form-item>
            <el-form-item label="商品描述：" prop="pDescribe">
                <span>{{form.pDescribe}}</span>
            </el-form-item>
            <el-form-item label="商品原价：" prop="pOriginalPrice">
                <span>{{form.pOriginalPrice}}</span> 元
            </el-form-item>
            <el-form-item label="商品现价：" prop="pNowPrice">
                <span>{{form.pNowPrice}}</span> 元
            </el-form-item>
            <el-form-item label="创建时间：" prop="pCreateTime">
                <span>{{form.pCreateTime}}</span>
            </el-form-item>
            <el-form-item label="所属小类：" prop="ptdName">
                <span>{{form.ptdName}}</span>
            </el-form-item>
            <el-form-item label="是否被删除：" prop="pDel">
                <span>{{form.pDel}}</span>
            </el-form-item>
            <el-form-item label="是否为推荐商品：" prop="pHaveBooth">
                <span>{{form.pHaveBooth}}</span>
            </el-form-item>
            <el-form-item label="审核状态：" prop="pChecked">
                <span style="color:#549c54">{{form.pChecked}}</span>
            </el-form-item>
            <el-form-item label="审核人：" prop="uTrueName">
                <span>{{form.uTrueName}}</span>
            </el-form-item>
            <el-form-item label="审核时间：" prop="pCheckedTime">
                <span>{{form.pCheckedTime}}</span>
            </el-form-item>
            <el-form-item label="商品主图：">
                <span>{{viewPicture}} 张</span> <el-button type="text" @click="QinnerVisible1 = true">查看</el-button>
            </el-form-item>
            <el-form-item label="审核意见：" prop="pCheckedOpinion" style="width:660px">
                <el-input type="textarea" :autosize="{minRows: 6}" placeholder="请输入内容" v-model="form.pCheckedOpinion" resize="none"></el-input>
            </el-form-item>
            <p style="width:500px;display:inline-block" v-if="this.Singleelection.length!=0">商品属性：单选</p>
            <div class="Singleelection clearfix">
                <el-form-item prop="pNowPrice" label-width="120px" v-for="item in Singleelection" v-bind:key="item.ppId" :label="item.ppName" style="float:left">
                    <el-input v-model="item.ppValue" disabled="disabled" style="width:180px"></el-input>
                </el-form-item>
            </div>
            <p style="width:500px;display:inline-block;margin-bottom:10px" v-if="this.Multiselection.length!=0">商品属性：多选</p>
            <div class="Multiselection clearfix">
                <el-checkbox style="width:45%;float:left" v-model="isSelect" disabled v-for="item in Multiselection" :key="item.ppId" :id="item.ppId" :label="item.ppName+'--'+item.ppValue"></el-checkbox>
            </div>
            <el-form-item label="商品权重：" prop="pWeight" label-width="100px">
                <el-input v-model="form.pWeight"></el-input>
            </el-form-item>
            <el-form-item style="float:right;margin-bottom:0px;width:100%" class="clearfix">
                <el-button @click="resetForm('form')" style="float:right;">关闭</el-button>                
                <el-button type="primary" @click="submitForm('form')" style="float:right;margin-right:30px">确定</el-button>
                <el-button type="primary" @click="GsubmitForm('form')" style="float:right;margin-right:30px">下架</el-button>
            </el-form-item>
                <!-- 查看图片 -->
                <el-dialog width="600px" title="商品主图" :visible.sync="QinnerVisible1" append-to-body>
                    <div class="block">
                        <el-carousel trigger="click" height="570px">
                            <el-carousel-item v-for="item in form.productPics" :key="item.pNo">
                                <img :src="item.url" alt="" style="width:100%;height:100%">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </el-dialog>
            </el-form>
        </el-dialog>
        <!-- 审核 -->
        <el-dialog class="bomb" title="商品审核" :visible.sync="examinedialogFormVisible" :close-on-click-modal='false'>
            <el-form :model="form"  ref="form" class="demo-ruleForm clearfix">
            <el-form-item label="商品名称：" prop="pName">
                <span>{{form.pName}}</span>
            </el-form-item>
            <el-form-item label="所属店铺：" prop="sName">
                <span>{{form.sName}}</span>
            </el-form-item>
            <el-form-item label="商品品牌：" prop="pBrand">
                <span>{{form.pBrand}}</span>
            </el-form-item>
            <el-form-item label="商品描述：" prop="pDescribe">
                <span>{{form.pDescribe}}</span>
            </el-form-item>
            <el-form-item label="商品原价：" prop="pOriginalPrice">
                <span>{{form.pOriginalPrice}}</span> 元
            </el-form-item>
            <el-form-item label="商品现价：" prop="pNowPrice">
                <span>{{form.pNowPrice}}</span> 元
            </el-form-item>
            <el-form-item label="创建时间：" prop="pCreateTime">
                <span>{{form.pCreateTime}}</span>
            </el-form-item>
            <el-form-item label="所属小类：" prop="ptdName">
                <span>{{form.ptdName}}</span>
            </el-form-item>
            <el-form-item label="是否被删除：" prop="pDel">
                <span>{{form.pDel}}</span>
            </el-form-item>
            <el-form-item label="是否为推荐商品：" prop="pHaveBooth">
                <span>{{form.pHaveBooth}}</span>
            </el-form-item>
            <el-form-item label="商品主图：">
                <span>{{viewPicture}} 张</span> <el-button type="text" :disabled="disabledClick" @click="QinnerVisible2 = true">查看</el-button>
            </el-form-item>
            <el-form-item label="." style="font-weight:100">
            </el-form-item>
            <!-- <el-form-item label="审核状态：" prop="pChecked">
                <span style="color:red">{{form.pChecked}}</span>
            </el-form-item> -->
            <p style="width:500px;display:inline-block" v-if="this.Singleelection.length!=0">商品属性：单选</p>
            <div class="Singleelection clearfix">
                <el-form-item prop="pNowPrice" label-width="120px" v-for="item in Singleelection" v-bind:key="item.ppId" :label="item.ppName" style="float:left">
                    <el-input v-model="item.ppValue" disabled="disabled" style="width:180px"></el-input>
                </el-form-item>
            </div>
            <p style="width:500px;display:inline-block;margin-bottom:10px" v-if="this.Multiselection.length!=0">商品属性：多选</p>
            <div class="Multiselection clearfix">
                <el-checkbox style="width:45%;float:left" v-model="isSelect" disabled v-for="item in Multiselection" :key="item.ppId" :id="item.ppId" :label="item.ppName+'--'+item.ppValue"></el-checkbox>
            </div>
            <el-form-item label="审核人：" prop="uTrueName">
                <span>{{form.uTrueName}}</span>
            </el-form-item>
            <el-form-item label="审核状态：" prop="examineVal">
                <el-select v-model="examineVal" placeholder="请选择审核状态">
                <el-option label="未通过" value="0"></el-option>
                <el-option label="已通过" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="审核时间：" prop="pCheckedTime">
                <span>{{form.pCheckedTime}}</span>
            </el-form-item>
            <el-form-item label="审核意见：" style="width:100%;">
                <el-input type="textarea" :autosize="{minRows: 6}" placeholder="请输入内容" v-model="form.pCheckedOpinion" resize="none"></el-input>
            </el-form-item>
            <el-form-item style="width:660px" class="clearfix">
                <el-button @click="resetForm('form')" style="float:right;">关闭</el-button>                
                <el-button type="primary" @click="examinesubmitForm('form')" style="float:right;margin-right:30px">确定</el-button>
            </el-form-item>
            <!-- 查看图片 -->
            <el-dialog width="600px" title="商品主图" :visible.sync="QinnerVisible2" append-to-body>
                <div class="block">
                    <el-carousel trigger="click" height="570px">
                        <el-carousel-item v-for="item in form.productPics" :key="item.pNo">
                            <img :src="item.url" alt="" style="width:100%;height:100%">
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </el-dialog>

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
          pName: '',
          pHaveBooth: '',
          ptId: '',
          pChecked: '',
        },
        // 数据
        tableData: [],
        // 商品大类
        ptIdList:{},

        // 分页
        currentPage: 1, //  默认显示第几页
        pageSize: 9, //  每页显示多少条数据
        totalCount: 1, //  数据的总条数
        // 弹框
        viewPicture:'',
        // 0图片判断
        disabledClick:false,
        dialogFormVisible:false,
        QinnerVisible1:false,
        // 审核
        examinedialogFormVisible:false,
        QinnerVisible2:false,
        
        form:{},


        // 分页
        a1:'',
        a2:'',
        a3:'',       
        a4:'',   
        
        // 商品单选多选
            // 单选Singleelection
        Singleelection:[],
            // 多选Multiselection
        Multiselection:[],
        isSelect:true,
        // 审核状态
        examineVal:'0',
        // 文本域
        textareaVal:''
      }
    },
    methods: {
        // 获取商品列表接口
        getDataList:function(n1,n2,n3,n4,n5,n6){
            // console.log(this.Multiselection)
            // console.log(this.userInfo)
            axios.post(api.api.url+n1,qs.stringify({
                uId:this.userInfo.uId,
                userType:'1',
                pName:n2,
                pHaveBooth:n3,
                ptId:n4,
                pChecked:n5,
                start:n6,
                end:this.pageSize,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse)
                for(var i=0;i<reponse.data.data.products.length;i++){
                    // console.log(reponse.data.data.products[i])
                    // 审核状态
                    if(reponse.data.data.products[i].pChecked=='0'){
                        reponse.data.data.products[i].pChecked="未通过"
                    }else if(reponse.data.data.products[i].pChecked=='1'){
                        reponse.data.data.products[i].pChecked="已通过"
                    }
                    // 推荐商品
                    if(reponse.data.data.products[i].pHaveBooth=='0'){
                        reponse.data.data.products[i].pHaveBooth="否"
                    }else if(reponse.data.data.products[i].pHaveBooth=='1'){
                        reponse.data.data.products[i].pHaveBooth="是"
                    }
                    // 是否被删除
                    if(reponse.data.data.products[i].pDel=='0'){
                        reponse.data.data.products[i].pDel="否"
                    }else if(reponse.data.data.products[i].pDel=='1'){
                        reponse.data.data.products[i].pDel="是"
                    }

                }
                this.tableData=reponse.data.data.products
                this.totalCount=reponse.data.data.totalCount;
            }) 
        },
        getData:function(){

            // 获取商品大类列表
            axios.post(api.api.url+'msGetProductTypeList',qs.stringify({
                uId:this.userInfo.uId,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse.data.data)
                this.ptIdList=reponse.data.data
            }) 

            if(this.$route.params.pChecked==0){
                this.getDataList('msGetProductList','','','','0','0')
                this.search.pChecked='未通过'
            }else{
                this.getDataList('msGetProductList','','','','','0')
            }
            
        },


        // 分页
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.getDataList('msGetProductList',this.a1,this.a2,this.a3,this.a4,(val-1)*(this.pageSize))
        },

        // 搜索
        onSubmit() {
            // console.log(this.search);
            this.a1=this.search.pName
            this.a2=this.search.pHaveBooth
            this.a3=this.search.ptId
            this.a4=this.search.pChecked
            if(this.search.pChecked=="未通过"){
                this.a4='0'
            }
            this.getDataList('msGetProductList',this.a1,this.a2,this.a3,this.a4,'0')
            this.currentPage=1
        },
        // 数据查看
        handleClick(examinedialogFormVisible,dialogFormVisible,row) {
            // console.log(row)
            this.viewPicture=row.productPics.length
            if(row.productPics.length==0){
                this.disabledClick=true
            }else{
                this.disabledClick=false
            }
            // 清空单选多选
            this.Singleelection=[]
            this.Multiselection=[]
                // 审核状态
            this.examineVal='0'
                // 文本域
            this.textareaVal=''

            // 获取某商品全部属性列表接口
            axios.post(api.api.url+'msGetAllProductPropertyListOfProduct',qs.stringify({
                uId:this.userInfo.uId,
                pId:row.pId,
                ptdId:row.ptdId,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse.data.data)
                // 商品属性 0单选  1多选
                for(var i=0;i<reponse.data.data.length;i++){
                    if(reponse.data.data[i].ppChoseType==0){
                        if(reponse.data.data[i].isSelect==true){
                            // console.log(reponse.data.data[i])
                            this.Singleelection.push(reponse.data.data[i])
                        }

                    }else if(reponse.data.data[i].ppChoseType==1){
                        if(reponse.data.data[i].isSelect==true){
                            // console.log(reponse.data.data[i])
                            this.Multiselection.push(reponse.data.data[i])
                        }
                    }
                }

            }) 
            // console.log(row);
            this.form=row
            if(this.form.pChecked=='未通过'){
                this.examinedialogFormVisible=true
            }else{
                this.dialogFormVisible=true
            }
        },


        // 下架
        GsubmitForm(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    // 修改商品审核状态接口
                    axios.post(api.api.url+'msChangeProductCheckStatus',qs.stringify({
                        uId:this.userInfo.uId,
                        pId:this.form.pId,
                        pChecked:'0',
                        pCheckedOpinion:this.form.pCheckedOpinion,
                    }),{emulateJSON: true},
                    {
                    headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                    }
                    ).then(reponse=>{
                        // console.log(reponse)
                        // this.getDataList('msGetProductList','','','','','0')
                        // this.currentPage=1
                        this.$notify({
                        title: '成功',
                        message: '已下架！',
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

        // 确认上传
        submitForm(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    // 添加或修改商品配置信息接口
                    axios.post(api.api.url+'msAddOrChangeProductConfigInfo',qs.stringify({
                        uId:this.userInfo.uId,
                        pId:this.form.pId,
                        pWeight:this.form.pWeight,
                    }),{emulateJSON: true},
                    {
                    headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                    }
                    ).then(reponse=>{
                        // console.log(reponse)
                        this.reload()
                        // this.getDataList('msGetProductList','','','','','0')
                        // this.currentPage=1
                    }) 

                    this.dialogFormVisible=false                        
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        // 审核确认上传
        examinesubmitForm(form) {
            this.$refs[form].validate((valid) => {
                // console.log(this.examineVal)
                // console.log(this.textareaVal)
                if (valid) {
                    // 修改商品审核状态接口
                    axios.post(api.api.url+'msChangeProductCheckStatus',qs.stringify({
                        uId:this.userInfo.uId,
                        pId:this.form.pId,
                        pChecked:this.examineVal,
                        pCheckedOpinion:this.form.pCheckedOpinion,
                    }),{emulateJSON: true},
                    {
                    headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                    }
                    ).then(reponse=>{
                        // console.log(reponse)
                        this.reload()
                        // this.getDataList('msGetProductList','','','','','0')
                        // this.currentPage=1
                    }) 

                    this.examinedialogFormVisible=false                        
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },

        // 取消上传
        resetForm(form) {
            this.reload()
            this.dialogFormVisible=false
            this.examinedialogFormVisible=false
            // this.$refs[form].resetFields();
            // this.getData();
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

    .goodsmangehome{
        min-height:800px;
        height: 100%;
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

    
    // 单选
    .Multiselection, .Singleelection{
        overflow:auto;
        width:100%;
        max-height: 200px;
    }

    // 图片
.zhizhaoImg{
    span{
        display:block;
        float:left;    
        width:100px;
        height:100px;
        margin-top:18px;
        margin-left: 10px;
        img{
            width: 100%;
            height:100%;
        }
    }
}


</style>

