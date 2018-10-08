<template>
    <div class="mygoodshome">
        <div id="search">
            <el-form ref="search" :model="search" class="clearfix">
            <el-form-item label="商品名称：" label-width="87px" prop="pName">
                <el-input v-model="search.pName"></el-input>
            </el-form-item>
            <el-form-item label="商品大类：" prop="ptId" label-width="96px">
                <el-select v-model="search.ptId" placeholder="请选择商品大类">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="item in ptIdList" v-bind:label="item.ptName" v-bind:value="item.ptId" :key="item.ptName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item style="width:70px">
                <el-button type="primary" @click="onSubmit(search)">查找</el-button>
            </el-form-item>
            </el-form>
        </div>
        <div class="content">
            <template>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column fixed prop="pBrand" label="商品品牌" width="200"></el-table-column>
                    <el-table-column prop="pName" label="商品名称" width="400"></el-table-column>
                    <el-table-column prop="pOriginalPrice" label="商品原价"></el-table-column>
                    <el-table-column prop="pNowPrice" label="商品现价"></el-table-column>
                    <el-table-column prop="pStockNum" label="商品库存量"></el-table-column>
                    <el-table-column prop="pBrowseNum" label="商品浏览次数"></el-table-column>
                    <el-table-column prop="pChecked" label="是否通过审核">
                        <template slot-scope="scope">
                                <span v-if="scope.row.pChecked=='否'" style="color: red">否</span>
                                <span v-else style="color: #549c54">是</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="pHaveBooth" label="是否推荐"></el-table-column>
                    <el-table-column prop="pDel" label="是否删除"></el-table-column>
                    <el-table-column prop="pDel" fixed="right" label="操作" width="130">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleClick(dialogFormVisible, scope.row)">查看</el-button>
                        <el-button size="mini" v-if="scope.row.pDel=='否'" style="color:red;margin-left:0" @click="deletGoods(scope.row)">删除</el-button>
                        <el-button size="mini" v-if="scope.row.pDel=='是'" style="color:red;margin-left:0" disabled>删除</el-button>
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
        <el-dialog class="bomb clearfix" title="商品详情" :visible.sync="dialogFormVisible" width="970px" :close-on-click-modal='false' @close='closeDialog("form")'>
            <el-form :model="form"  ref="form" :rules="rules" class="demo-ruleForm clearfix" label-position="right">
                <el-form-item label="商品名称：" prop="ptdName" label-width="110px">
                    <span>{{form.ptdName}}</span>
                </el-form-item>
                <el-form-item label="店铺名称：" prop="sName" label-width="110px">
                    <span>{{form.sName}}</span>
                </el-form-item>
                <el-form-item label="浏览次数：" prop="pBrowseNum" label-width="110px">
                    <span>{{form.pBrowseNum}}</span>
                </el-form-item>
                <el-form-item label="添加时间：" prop="pCreateTime" label-width="110px">
                    <span>{{form.pCreateTime}}</span>
                </el-form-item>
                <el-form-item label="审核意见：" prop="pCheckedOpinion" label-width="110px">
                    <span>{{form.pCheckedOpinion}}</span>
                </el-form-item>
                <el-form-item label="审核时间：" prop="pCheckedTime" label-width="110px">
                    <span>{{form.pCheckedTime}}</span>
                </el-form-item>
                <el-form-item label="审核人：" prop="uTrueName" label-width="110px">
                    <span>{{form.uTrueName}}</span>
                </el-form-item>
                <el-form-item label="商品总数：" prop="pTotalNum" label-width="110px">
                    <span>{{form.pTotalNum}}</span>
                </el-form-item>
                <el-form-item label="商品展位数：" prop="sBoothNum" label-width="110px">
                    <span>{{sBoothNum}}</span>
                </el-form-item>
                <el-form-item label="剩余展位：" prop="sLeftBoothNum" label-width="110px">
                    <span>{{sLeftBoothNum}}</span>
                </el-form-item>
                <el-form-item label="是否删除：" prop="pDel" label-width="110px">
                    <span>{{form.pDel}}</span>
                </el-form-item>
                <el-form-item label="是否通过审核：" prop="pChecked" label-width="117px">
                    <span>{{form.pChecked}}</span>
                </el-form-item>
                <el-form-item label="商品品牌：" prop="pBrand" label-width="110px">
                    <el-input v-model="form.pBrand" style="width:175px"></el-input>
                </el-form-item>
                <el-form-item label="商品名称：" prop="pName" label-width="115px">
                    <el-input v-model="form.pName" style="width:175px"></el-input>
                </el-form-item>
                <el-form-item label="商品库存量：" prop="pStockNum" label-width="110px">
                    <el-input v-model="form.pStockNum" style="width:175px"></el-input>
                </el-form-item>
                <el-form-item label="是否推荐商品：" prop="pHaveBooth" label-width="117px">
                    <el-select v-model="form.pHaveBooth" placeholder="请选择" style="width:175px">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="商品描述：" prop="pDescribe" label-width="110px" style="width:98%">
                    <el-input type="textarea" :autosize="{minRows: 4}" placeholder="请输商品描述" v-model="form.pDescribe" resize="none"></el-input>
                </el-form-item>
                <el-form-item label="商品原价：" prop="pOriginalPrice" label-width="110px">
                    <el-input v-model="form.pOriginalPrice" style="width:175px"></el-input>
                </el-form-item>
                <el-form-item label="商品现价：" prop="pNowPrice" label-width="110px">
                    <el-input v-model="form.pNowPrice" style="width:175px"></el-input>
                </el-form-item>
                <!-- <el-form-item label="商品权重：" prop="pWeight" label-width="110px">
                    <el-input v-model="form.pWeight" style="width:175px"></el-input>
                </el-form-item> -->
                <div style="width:90%;height:20px;background-color:#ffffff;float:left;padding-left:28px;font-weight:700">商品主图：
                    <el-button type="text" :disabled="ProductPicDisabled" style="padding:0;margin:0" @click="ProductPicVisible = true">查看</el-button>
                    <el-button type="text" style="padding:0;margin:0"  v-if="this.ProductPic.length > 4" @click="clearProductPics()">清空</el-button>
                </div>
                <!-- 查看图片 -->
                <el-dialog width="600px" title="图片展示" :visible.sync="ProductPicVisible" append-to-body>
                            <div class="block">
                                <el-carousel trigger="click" height="570px">
                                    <el-carousel-item v-for="item in ProductPic" :key="item.name">
                                        <img :src="item.src" alt="" style="width:100%;height:100%">
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                </el-dialog>        
                <div class="goodImg clearfix">
                    <!-- 上传图片 -->
                    <div class="vue-uploader" style="width:100%">
                        <div class="file-list">
                            <section v-for="(file, index) of files" class="file-item draggable-item" style="margin-top:0" :key="file.name">
                                <img :src="file.src" alt="" ondragstart="return false;">
                                <span class="file-remove" @click="removes(index)">+</span>
                            </section>
                            <section v-if="status == 'ready'" class="file-item" style="margin-top:1px">
                                <div class="add">
                                    <input type="file" @change="fileChanged" ref="file"  accept="image/jpg,image/jpeg,image/png,image/bmp">
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                <div style="width:90%;height:20px;background-color:#ffffff;float:left;padding-left:28px;font-weight:700">商品详情：
                    <el-button type="text" :disabled="ProductDetailPicDisabled" style="padding:0;margin:0" @click="ProductDetailPicVisible = true">查看</el-button>
                    <el-button type="text" style="padding:0;margin:0"  v-if="this.ProductDetailPic.length > 0" @click="clearProductDetailPics()">清空</el-button>
                </div>
                <!-- 查看图片 -->
                <el-dialog width="600px" title="图片展示" :visible.sync="ProductDetailPicVisible" append-to-body>
                            <div class="block">
                                <el-carousel trigger="click" height="800px">
                                    <el-carousel-item v-for="item in ProductDetailPic" :key="item.name">
                                        <img :src="item.src" alt="" style="width:100%;height:100%">
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                </el-dialog>
                <div class="clearfix" style="width:100%;">
                    <div class="vue-uploader" style="width:100%">
                        <div class="file-list">
                            <section v-for="(file, index) of filePic" class="file-item draggable-item" style="margin-top:10px" :key="file.name">
                                <img :src="file.src" alt="" ondragstart="return false;">
                                <span class="file-remove" @click="removePic(index)">+</span>
                            </section>
                            <section v-if="status" class="file-item">
                                <div class="add">
                                    <input type="file" @change="fileChangedPic" ref="filePics" multiple="multiple" accept="image/jpg,image/jpeg,image/png,image/bmp">
                                </div>
                            </section>
                        </div>
                    </div>
                </div>

                <div style="width:100%">
                    <el-form-item v-for="item in ppDatas" :label="item.ppName" :key="item.ppName" prop="ppChecked" style="width:100%">
                        <el-checkbox-group v-model="ppChecked" style="width:100%;">
                            <el-checkbox v-for="detail in item.details" :label="detail.ppId" v-bind:value="detail.ppId" :key="detail.ppValue">{{detail.ppValue}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </div>
                <el-form-item style="float:right;margin-bottom:0px;width:100%" class="clearfix">
                    <el-button @click="resetForm('form')" style="float:right;margin-right:35px">关闭</el-button>                
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
        //   搜索
        // 获取大类
        ptIdList:[],
        search: {
          pName: '',
          ptId: '',
        },
        // 数据
        tableData: [],
        // 分页
        currentPage: 1, //  默认显示第几页
        pageSize: 8, //  每页显示多少条数据
        totalCount: 1, //  数据的总条数
        // 弹框
        dialogFormVisible:false,
        form:{},
        // 图片
        htmlPic:[],
        sBoothNum:'',
        sLeftBoothNum:'',

        // 分页
        a1:'',
        a2:'',

        //   上传图片
        status: 'ready',
        // 商品主图
        files: [],
        ProductPicDisabled:false,
        ProductPicVisible:false,
        ProductPic:[],
        // 商品详情图
        ProductDetailPicDisabled:false,
        ProductDetailPicVisible:false,
        ProductDetailPic:[],
        // 商品详情图个数
        productDetailPicSize: 0,

        // 删除后剩余的图片
        mainFileList:[],
        delFileList:[],

        // 商品详情图
        filePic:[],
        htmlPicList:[],
        point: {},
        // uploading: false,
        percent: 0,

        
        // 所有属性
        ppDatas:[],

        
        // 多选选中
        ppChecked:[],


        
        // 删除预览图片数组
        preview:[],

        // 剩余
        fileList:[],
        // 添加图片数组
        Imgs:[],

        // 拼接
        Arr:[],

        rules: {
          pBrand: [
            { required: true, message: '请输入商品品牌', trigger: 'blur' },
            { min: 1, message: '长度在最少 1 个字符', trigger: 'blur' }
          ],
          pName: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            { min: 1, message: '长度在最少 1 个字符', trigger: 'blur' }
          ],
        //   pStockNum: [
        //     { required: true, message: '请输入商品库存量', trigger: 'blur' },
        //     { min: 1, message: '长度在最少 1 个字符', trigger: 'blur' }
        //   ],
          pDescribe: [
            { required: true, message: '请输入商品描述', trigger: 'blur' },
            { min: 1, message: '长度在最少 1 个字符', trigger: 'blur' }
          ],
          pHtml: [
            { required: true, message: '请输入商品图文详情', trigger: 'blur' },
            { min: 1, message: '长度在最少 1 个字符', trigger: 'blur' }
          ],
          pWeight: [
            { required: true, message: '请输入商品权重', trigger: 'blur' },
            { min: 1, message: '长度在最少 1 个字符', trigger: 'blur' }
          ],

        }


      }
    },
    methods: {
        getDataList:function(n1,n2,n3,n4){
            // console.log(this.userInfo)
            // 获取商品列表接口
            axios.post(api.api.url+n1,qs.stringify({
                uId:this.userInfo.uId,
                sId:this.userInfo.sId,
                pName:n2,
                ptId:n3,
                start:n4,
                end:this.pageSize,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse.data.data)
                for(var i=0;i<reponse.data.data.products.length;i++){
                    if(reponse.data.data.products[i].pChecked=='1'){
                       reponse.data.data.products[i].pChecked='是' 
                    }else if(reponse.data.data.products[i].pChecked=='0'){
                        reponse.data.data.products[i].pChecked='否' 
                    }
                    if(reponse.data.data.products[i].pHaveBooth=='1'){
                       reponse.data.data.products[i].pHaveBooth='是' 
                    }else if(reponse.data.data.products[i].pHaveBooth=='0'){
                        reponse.data.data.products[i].pHaveBooth='否' 
                    }
                    if(reponse.data.data.products[i].pDel=='1'){
                       reponse.data.data.products[i].pDel='是' 
                    }else if(reponse.data.data.products[i].pDel=='0'){
                        reponse.data.data.products[i].pDel='否' 
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

            this.getDataList('msGetProductListBySId','','','0')
        },
        // 分页-
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.getDataList('msGetProductListBySId',this.a1,this.a2,(val-1)*(this.pageSize))
        },

        // 搜索
        onSubmit() {
            // console.log(this.search);
            this.a1=this.search.pName
            this.a2=this.search.ptId
            this.getDataList('msGetProductListBySId',this.a1,this.a2,'0')
            this.currentPage=1
        },
        // 清空商品主图
        clearProductPics() {
                // this.form.pics = [];
                this.ProductPic = [];
                this.files = [];
                this.ProductPicDisabled=true;
                this.form.pics=[];
        },    
        // 清空商品详情图
        clearProductDetailPics() {
            this.ProductDetailPic=[];
            this.ProductDetailPicDisabled=true;
            this.filePic=[];
            this.htmlPic=[];
        },
        // 数据查看
        handleClick(dialogFormVisible,row) {
            // console.log(row)

            this.ppChecked=[]
            this.ppDatas=[]

            this.htmlPic=[]
            // console.log(row);      
            if(row.pHtml!=''){
                this.ProductDetailPicDisabled=false;
                for(var i=0;i<row.pHtml.match(/<.*?>/ig,"").length;i++){
                    var a=row.pHtml.match(/<.*?>/ig,"")[i]
                    if(a!='<p>'&&a!='</p>'){
                        var b=a.match(/<img src="(\S*)"/)
                        // console.log(b[1])
                        this.htmlPic.push({name: 'food'+[i]+'.jpeg', url: b[1]})
                        var item = {name:'',src:''};
                        item.src = b[1];
                        item.name = 'pic' + [i];
                        this.ProductDetailPic.push(item);
                    }
                }
            } else {
                this.ProductDetailPicDisabled=true;
            }     
            this.productDetailPicSize = this.ProductDetailPic.length;
            // console.log(this.htmlPic)
            if(row.pics.length!=0) {
                this.ProductPicDisabled=false;
                // 商品主图
                for(let i=0;i<row.pics.length;i++){
                    // row.pics[i].url=row.pics[i].url
                    var item = {name:'',src:''};
                    item.src = row.pics[i].url;
                    item.name = row.pics[i].pNo;
                    this.ProductPic.push(item);
                } 
            } else {
                this.ProductPicDisabled=true;
            }
                       
            this.form=row
            // -获取某商户商品推荐橱窗
            axios.post(api.api.url+'msGetBoothBySId',qs.stringify({
                uId:this.userInfo.uId,
                sId:this.userInfo.sId,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse.data.data)
                this.sBoothNum=reponse.data.data.sBoothNum
                this.sLeftBoothNum=reponse.data.data.sLeftBoothNum
            }) 
            // -获取某商品全部属性列表接口
            axios.post(api.api.url+'msGetAllProductPropertyListOfProduct',qs.stringify({
                uId:this.userInfo.uId,
                pId:row.pId,
                ptdId:row.ptdId,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // 商品属性 0单选  1多选
                for(var i=0;i<reponse.data.data.length;i++){
                    this.ppDatas.push(reponse.data.data[i]);
                    for(var j=0;j<reponse.data.data[i].details.length;j++) {
                        if (reponse.data.data[i].details[j].isSelect=='true') {
                            this.ppChecked.push(reponse.data.data[i].details[j].ppId);    
                        }               
                    }
                }
            }) 
            this.dialogFormVisible=true
        },

        // 删除详情图
        handleRemovePic(file, fileListPic) {
            // console.log(fileListPic);
            this.htmlPic=fileListPic
        },

        // 删除主图预览图片
        handleRemove(file, fileList) {
            this.delFileList.push(file)
            // console.log(fileList);
            // console.log(file);
            // this.preview=(file)
            for(var i=0;i<this.form.pics.length;i++){
                // 删除第一个（0）
                if(fileList[i]!=undefined){
                    // 如果删除第一项（1）
                    if(file.no==0){
                        if(fileList[0]!=undefined){
                            fileList[0].no=0
                        }
                        if(fileList[1]!=undefined){
                            fileList[1].no=1
                        }
                        if(fileList[2]!=undefined){
                            fileList[2].no=2
                        }
                        if(fileList[3]!=undefined){
                            fileList[3].no=3
                        }
                    // 如果删除第二项（2）
                    }else if(file.no==1){
                        if(fileList[0]!=undefined){
                            fileList[0].no=0
                        }
                        if(fileList[1]!=undefined){
                            fileList[1].no=1
                        }
                        if(fileList[2]!=undefined){
                            fileList[2].no=2
                        }
                        if(fileList[3]!=undefined){
                            fileList[3].no=3
                        }
                    // 如果删除第三项（2）
                    }else if(file.no==2){
                        if(fileList[0]!=undefined){
                            fileList[0].no=0
                        }
                        if(fileList[1]!=undefined){
                            fileList[1].no=1
                        }
                        if(fileList[2]!=undefined){
                            fileList[2].no=2
                        }
                        if(fileList[3]!=undefined){
                            fileList[3].no=3
                        }  
                    // 如果删除第一四项（3）
                    }else if(file.no==3){
                        if(fileList[0]!=undefined){
                            fileList[0].no=0
                        }
                        if(fileList[1]!=undefined){
                            fileList[1].no=1
                        }
                        if(fileList[2]!=undefined){
                            fileList[2].no=2
                        }
                        if(fileList[3]!=undefined){
                            fileList[3].no=3
                        }   
                    }
                }
            }
            // console.log(file)
            // console.log(fileList)
            // 剩余图片
            this.mainFileList=fileList
            // console.log(this.fileList)
        },

        // 取消上传
        resetForm(form) {
            this.dialogFormVisible=false;
            this.ProductPic=[];
            this.ProductDetailPic=[];
            this.files = [];
            this.filePic = [];
            this.ProductPicDisabled=true;
            // this.$refs[form].resetFields();
            // this.onSubmit();
        },

        closeDialog(form) {
            this.dialogFormVisible=false;
            this.ProductPic=[];
            this.ProductDetailPic=[];
            this.files = [];
            this.filePic = [];
            this.ProductPicDisabled=true;
            // this.$refs[form].resetFields();
            // this.onSubmit();
        },



// ============上传图片=============

        // 确认上传
        submitForm(form) {
            var Pic,ppic,picData,ppics=''
            var AllClassChecked=[]
            var ppIds=''  
            this.Imgs=[]
            // 拼接
            var Picold,Picnew='';

            this.$refs[form].validate((valid) => {
                if (valid) {
                    for(var i=0;i<this.ppChecked.length;i++){
                        AllClassChecked.push(this.ppChecked[i])
                    }
                    // console.log(AllClassChecked)
                    for(var i=0;i<AllClassChecked.length;i++){
                        // console.log(AllClassChecked[i].ppId)
                        ppIds+=AllClassChecked[i]+';'
                    }
                    // console.log(ppIds)


// ==================================商品主图=====================================================

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
                        const Name=f.name
                        const suffix = Name.substr(Name.indexOf("."));
                        const obj=this.timestamp()+Math.ceil(Math.random()*10*100);
                        const storeAs = api.api.commodityImg+obj+suffix
                        alert(storeAs);
                        return
                        this.Imgs.push(obj+suffix)
                        client.multipartUpload(storeAs, f).then(function (result){
                            // console.log(result.res.requestUrls)
                        })
                    }

                        // 判断原始数据是否为空
                        // 若为空时
                        if(this.form.pics.length==0){
                            // 添加数据
                            // console.log(this.Imgs)
                                // 遍历添加的商户主图
                            for(var i=0;i<this.Imgs.length;i++){
                                ppic+='{"pName": "'+this.Imgs[i]+'","pNo": '+i+'},'
                            }
                                let reg=/,$/gi;
                                ppic=ppic.replace(reg,"");
                                ppic=ppic.substring(9)
                                picData='{"pTag": "'+this.form.pTag+'","pics": ['+ppic+']}'
                                // console.log(picData) 
                        }else{
                            // 如果原始数据不为空时
                                // 如果添加了数据
                            if(this.Imgs.length!=0){
                                // 遍历添加的数据
                                for(var i=0;i<this.Imgs.length;i++){
                                    if(this.mainFileList.length!=0){
                                        let a=(this.mainFileList.length)+i
                                        ppics+='{"pName": "'+this.Imgs[i]+'","pNo": '+a+'},'
                                        // console.log(ppics)
                                    }else{
                                        // let a=(this.form.pics.length)+i
                                        // ppics+='{"pName": "'+this.Imgs[i]+'","pNo": '+a+'},'  
                                        if(this.delFileList!=0){
                                            let a=i
                                            ppics+='{"pName": "'+this.Imgs[i]+'","pNo": '+a+'},'  
                                        }else{
                                            let a=(this.form.pics.length)+i
                                            ppics+='{"pName": "'+this.Imgs[i]+'","pNo": '+a+'},'  

                                        }
                                        // console.log(ppics)
                                    }
                                }

                                // 判断有没有删除
                                if(this.delFileList.length==0){
                                    // 如没有删除
                                        // 遍历原始数据
                                        // console.log(this.form.pics)
                                    for(var i=0;i<this.form.pics.length;i++){
                                        ppic+='{"pName": "'+((this.form.pics[i].url).substring(54))+'","pNo": '+this.form.pics[i].no+'},'
                                    }
                                    let reg=/,$/gi;
                                    ppic=ppic.replace(reg,"");
                                    ppic=ppic.substring(9)
                                    // console.log(ppic)
                                }else{
                                    if(this.mainFileList.length!=0){
                                        // 如果有删除遍历剩余
                                        for(var i=0;i<this.mainFileList.length;i++){
                                            // console.log(this.mainFileList)
                                            // console.log((this.mainFileList[i].url).substring(54))
                                            ppic+='{"pName": "'+((this.mainFileList[i].url).substring(54))+'","pNo": '+this.mainFileList[i].no+'},'
                                        }
                                        let reg=/,$/gi;
                                        ppic=ppic.replace(reg,"");
                                        ppic=ppic.substring(9)
                                    }else{
                                        let reg=/,$/gi;
                                        ppics=ppics.replace(reg,"");
                                        ppic=''
                                    }
                                }
                                picData='{"pTag": "'+this.form.pTag+'","pics": ['+ppics+ppic+']}'
                                // console.log(picData)  
                            }else{
                                // 如果没有添加数据并且删除
                                if(this.delFileList.length!=0){
                                    if(this.mainFileList.length!=0){
                                        // 遍历剩余数据
                                        // console.log(this.mainFileList)
                                        for(var i=0;i<this.mainFileList.length;i++){
                                            // console.log((this.mainFileList[i].url).substring(54))
                                            ppic+='{"pName": "'+((this.mainFileList[i].url).substring(54))+'","pNo": '+this.mainFileList[i].no+'},'
                                        }
                                        let reg=/,$/gi;
                                        ppic=ppic.replace(reg,"");
                                        ppic=ppic.substring(9)
                                        
                                    }else{
                                        ppic=''
                                    }
                                    picData='{"pTag": "'+this.form.pTag+'","pics": ['+ppic+']}'
                                    // console.log(picData) 
                                    
                                }else{
                                        // 遍历原始数据
                                    for(var i=0;i<this.form.pics.length;i++){
                                        ppic+='{"pName": "'+((this.form.pics[i].url).substring(54))+'","pNo": '+this.form.pics[i].no+'},'
                                    }
                                    let reg=/,$/gi;
                                    ppic=ppic.replace(reg,"");
                                    ppic=ppic.substring(9)
                                    picData='{"pTag": "'+this.form.pTag+'","pics": ['+ppics+ppic+']}'
                                    // console.log(picData) 
                                }
                            }
                        }
                        // console.log(picData) 

// =================================商品详情图===============================================================

                    for(var i=0;i<this.filePic.length;i++){
                        var f=this.filePic[i].file
                        const Name=f.name
                        const suffix = Name.substr(Name.indexOf("."));
                        const obj=this.timestamp()+Math.ceil(Math.random()*10*100);
                        const storeAs = api.api.commodityDetails+obj+suffix
                        this.htmlPicList.push(obj+suffix)
                        client.multipartUpload(storeAs, f).then(function (result){
                            // console.log(result.res.requestUrls)
                        })
                    }
                    // 添加新图
                    // console.log(this.htmlPicList)
                    for(var w=0;w<this.htmlPicList.length;w++){
                        Picnew+='<img src="'+api.api.rootUrl+api.api.commodityDetails+this.htmlPicList[w]+'"/>'
                        // console.log(Picnew)
                    }
                    // console.log(Picnew)
                    if(this.htmlPicList.length!=0){
                        Picnew=Picnew
                    }
                    // console.log(this.htmlPic)
                    // console.log(Picnew)
                    // 剩余图
                    if(this.htmlPic.length!=0){
                        for(var s=0;s<this.htmlPic.length;s++){
                            if(this.htmlPic[s]!=undefined){
                                // console.log(this.htmlPic[s])
                                Picold+='<img src="'+this.htmlPic[s].url+'"/>'
                            }
                        }
                        Picold=Picold.substring(9)
                    }
                    if(Picold==undefined){
                        Picold=''
                    }
                    // console.log(Picnew+Picold)
// ================================================================================================

                    if(this.form.pHaveBooth=='0' || this.form.pHaveBooth=='否'){
                        this.form.pHaveBooth='0';
                        this.form.pWeight='1';
                    }else if(this.form.pHaveBooth=='1' || this.form.pHaveBooth=='是'){
                        if(this.sLeftBoothNum=='0') {
                            this.$notify.error({
                                title: '错误',
                                message: '无法设置为推荐商品，剩余展位数量为0！',
                                type: 'error'
                            }); 
                            return;
                        } else {
                            this.form.pHaveBooth='1';
                            this.form.pWeight='5';
                        } 
                    }
                        // 修改商品信息接口
                    axios.post(api.api.url+'msChangeProductInfo',qs.stringify({
                        uId:this.userInfo.uId,
                        sId:this.userInfo.sId,
                        pId:this.form.pId,
                        pName:this.form.pName,
                        pBrand:this.form.pBrand,
                        pDescribe:this.form.pDescribe,
                        picData:picData,
                        pOriginalPrice:this.form.pOriginalPrice,
                        pNowPrice:this.form.pNowPrice,
                        pWeight:this.form.pWeight,
                        pHtml:'<p>'+Picold+Picnew+'</p>',
                        pHaveBooth:this.form.pHaveBooth,
                        pStockNum:this.form.pStockNum,
                        ppIds:ppIds,
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
                                this.dialogFormVisible=false      
                                this.reload() 
                                //setTimeout(() => {                    
                                // this.getData()
                                // this.currentPage=1
                                // this.files=[]
                                // this.htmlPic=[]
                                // // 清空本地数据，避免重复显示
                                // this.filePic=[]
                                // Picnew=''
                                // Picold=''
                                // this.ProductPic=[];
                                // this.ProductDetailPic=[];
                                //}, 200);
                             
                                // ppChecked=[];
                                // ppDatas=[];
                                // (this.dialogFormVisible = false);
                                // this.htmlPic=[];
                                // // 清空本地数据，避免重复显示
                                // this.filePic=[];
                                // Picnew="";
                                // Picold="";
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
                } else {
                    // console.log('error submit!!');
                    return false;
                }
           });

        },
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
        // 删除主图
        removes(index) {
            this.files.splice(index, 1)
            this.ProductPic.splice(this.form.pics.length + index,1)
        },
        fileChanged() {
            if(4 < this.ProductPic.length) {
                    this.$notify.error({
                        title: '失败',
                        message: '添加失败，商品主图最多上传5张！',
                        type: 'error'
                    }); 
                    return;
            }
            this.ProductPicDisabled=false;
            const list = this.$refs.file.files
            for (let i = 0; i < list.length; i++) {
                if (!this.isContain(list[i])) {
                    const item = {
                        name: list[i].name,
                        size: list[i].size,
                        file: list[i]
                    }
                    this.html5Reader(list[i], item)
                    this.files.push(item)
                    this.ProductPic.push(item);
                }
            }
            this.$refs.file.value = ''
        },
        // 删除详情图
        removePic(index) {
            this.filePic.splice(index, 1)
            this.ProductDetailPic.splice(this.productDetailPicSize + index,1)
        },
        fileChangedPic() {
            this.ProductDetailPicDisabled=false;
            const list = this.$refs.filePics.files
            for (let i = 0; i < list.length; i++) {
                if (!this.isContain(list[i])) {
                    const item = {
                        name: list[i].name,
                        size: list[i].size,
                        file: list[i]
                    }
                    this.html5Reader(list[i], item)
                    this.filePic.push(item)
                    this.ProductDetailPic.push(item);
                }
            }
            this.$refs.filePics.value = ''
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


        // 删除商品
        deletGoods(row){
            this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // console.log(row)
                axios.post(api.api.url+'msDelProductInfoByPId',qs.stringify({
                    uId:this.userInfo.uId,
                    pId:row.pId,
                }),{emulateJSON: true},
                {
                headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                }
                ).then(reponse=>{
                    // console.log(reponse)
                    this.getDataList('msGetProductListBySId','','','0')
                    this.currentPage=1
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }) 
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }


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
    .mygoodshome{
        min-height: 800px;
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

.el-form-item{
    width:50%;
    float: left;
}




// 图片上传
.vue-uploader .file-list {
    padding: 10px 0px;
    padding-left: 108px;
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

.goodImg{
    width:100%;float:left;height:177px !important;overflow:hidden
}
</style>

