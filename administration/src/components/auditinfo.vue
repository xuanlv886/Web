<template>
    <div class="auditinfo">
        <navtitle></navtitle>
        <div class="box">
            <div class="content">
                <el-form :model="form"  ref="form" :rules="rules" class="demo-ruleForm clearfix" label-position="left" style="margin-left:50px;">
                    <el-form-item label="商户名称：" prop="sName" label-width="100px">
                        <el-input v-model="form.sName" style="width:80%"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人姓名：" prop="sLeader" label-width="111px">
                        <el-input v-model="form.sLeader" style="width:80%"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号：" prop="sLeaderIdCard" label-width="100px">
                        <el-input v-model="form.sLeaderIdCard" style="width:80%"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人电话：" prop="sTel" label-width="111px">
                        <el-input v-model="form.sTel" style="width:80%"></el-input>
                    </el-form-item>

                    <div style="width:100%;height:200px;float:left;position: relative;">
                        <div style="width:90%;height:20px;background-color:#ffffff;float:left;font-weight:700;color:#606266;">负责人手持证件照：<el-button type="text" :disabled="LeaderPicDisabled" style="padding:0;margin:0" @click="LeaderPicVisible = true">查看</el-button></div>
                        <!-- 查看图片 -->
                        <el-dialog width="600px" title="图片展示" :visible.sync="LeaderPicVisible" append-to-body>
                            <div class="block">
                                <el-carousel trigger="click" height="300px">
                                    <el-carousel-item v-for="item in LeaderPic" :key="item.name">
                                        <img :src="item.src" alt="" style="width:100%;height:100%">
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                        </el-dialog>

                        <div class="vue-uploader" style="width:100%">
                            <div class="file-list">
                                <section v-for="(file, index) of leadPic" class="file-item draggable-item" :key="file.name">
                                    <img :src="file.src" alt="" ondragstart="return false;">
                                    <span class="file-remove" @click="leadRemove(index)">+</span>
                                </section>
                                <section class="file-item">
                                    <div class="add">
                                        <input type="file" @change="leadFileChange" ref="leadFile"  accept="image/jpg,image/jpeg,image/png,image/bmp"/>
                                    </div>
                                </section>
                            </div>
                        </div>
                        <div style="width:655px;height:100%;position: absolute;top:0;left:265px;background-color:#ffffff"></div>
                    </div>
                    <el-form-item label="法人姓名：" prop="sLegal" label-width="100px" v-if="this.userInfo.urName=='企业商户'">
                        <el-input v-model="form.sLegal" style="width:80%"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号：" prop="sLegalIdCard" label-width="100px" v-if="this.userInfo.urName=='企业商户'">
                        <el-input v-model="form.sLegalIdCard" style="width:80%"></el-input>
                    </el-form-item>
                    <div style="width:100%;height:200px;float:left;position: relative;" v-if="this.userInfo.urName=='企业商户'">
                        <div style="width:90%;height:20px;background-color:#ffffff;float:left;font-weight:700;color:#606266;">法人手持证件照：<el-button type="text" :disabled="LegalPicDisabled" style="padding:0;margin:0" @click="LegalPicVisible = true">查看</el-button></div>
                        <!-- 查看图片 -->
                        <el-dialog width="600px" title="图片展示" :visible.sync="LegalPicVisible" append-to-body>
                            <div class="block">
                                <el-carousel trigger="click" height="300px">
                                    <el-carousel-item v-for="item in LegalPic" :key="item.name">
                                        <img :src="item.src" alt="" style="width:100%;height:100%">
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                        </el-dialog>
                        
                        <div class="vue-uploader" style="width:100%">
                            <div class="file-list">
                                <section v-for="(file, index) of legalPic" class="file-item draggable-item" :key="file.name">
                                    <img :src="file.src" alt="" ondragstart="return false;">
                                    <span class="file-remove" @click="legalRemove(index)">+</span>
                                </section>
                                <section class="file-item">
                                    <div class="add">
                                        <input type="file" @change="legalFileChange" ref="legalFile"  accept="image/jpg,image/jpeg,image/png,image/bmp">
                                    </div>
                                </section>
                            </div>
                        </div>
                        <div style="width:655px;height:100%;position: absolute;top:0;left:265px;background-color:#ffffff"></div>
                    </div>

                    <el-form-item label="商户经度：" prop="sLon" label-width="100px">
                        <span>{{form.sLon}}</span>
                    </el-form-item>
                    <el-form-item label="商户纬度：" prop="sLat" label-width="100px">
                        <span>{{form.sLat}}</span>
                    </el-form-item>
                    <el-form-item label="所在城市：" prop="acCity" label-width="100px">
                        <span>{{form.acCity}}</span>
                    </el-form-item>
                    <el-form-item label="商户地址：" prop="sAddress" style="width:91.6%;" label-width="100px">
                        <el-input type="textarea" :autosize="{minRows: 2}" resize='none' v-model="form.sAddress" @blur="blurClick"></el-input>
                    </el-form-item>
                    <el-form-item label="商户描述：" prop="sDescribe" style="width:91.6%;" label-width="100px">
                        <el-input type="textarea" :autosize="{minRows: 4}" resize='none' v-model="form.sDescribe"></el-input>
                    </el-form-item>
                    <div style="width:100%;height:200px;float:left;position: relative;" v-if="this.userInfo.urName=='企业商户'">
                        <div style="width:90%;height:20px;background-color:#ffffff;float:left;font-weight:700;color:#606266;">营业执照：<el-button type="text" :disabled="BusinessPicDisabled" style="padding:0;margin:0" @click="BusinessImgVisible = true">查看</el-button></div>
                        <!-- 查看图片 -->
                        <el-dialog width="600px" title="图片展示" :visible.sync="BusinessImgVisible" append-to-body>
                            <div class="block">
                                <el-carousel trigger="click" height="300px">
                                    <el-carousel-item v-for="item in BusinessPic" :key="item.name">
                                        <img :src="item.src" alt="" style="width:100%;height:100%">
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                        </el-dialog>
                        
                        <div class="vue-uploader" style="width:100%">
                            <div class="file-list">
                                <section v-for="(file, index) of licensePic" class="file-item draggable-item" :key="file.name">
                                    <img :src="file.src" alt="" ondragstart="return false;">
                                    <span class="file-remove" @click="licenseRemoves(index)">+</span>
                                </section>
                                <section class="file-item">
                                    <div class="add">
                                        <input type="file" @change="licenseFileChange" ref="licenseFile"  accept="image/jpg,image/jpeg,image/png,image/bmp">
                                    </div>
                                </section>
                            </div>
                        </div>
                        <div style="width:655px;height:100%;position: absolute;top:0;left:265px;background-color:#ffffff"></div>
                    </div>

                    <div style="width:100%;height:180px;float:left;overflow: hidden;">
                        <div style="width:90%;height:20px;background-color:#ffffff;float:left;overflow: hidden;font-weight:700;color:#606266;">商户宣传图：
                            <el-button type="text" :disabled="StorePicDisabled" style="padding:0;margin:0" @click="StoreImgVisible = true">查看</el-button>
                            <el-button type="text" style="padding:0;margin:0"  v-if="this.StorePic.length > 4" @click="clearStorePics()">清空</el-button>
                            </div>
                        <!-- 查看图片 -->
                        <el-dialog width="600px" title="图片展示" :visible.sync="StoreImgVisible" append-to-body>
                            <div class="block">
                                <el-carousel trigger="click" height="300px">
                                    <el-carousel-item v-for="item in StorePic" :key="item.name">
                                        <img :src="item.src" alt="" style="width:100%;height:100%">
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                        </el-dialog>
                        <div class="vue-uploader" style="width:100%">
                            <div class="file-list">
                                <section v-for="(file, index) of mainPic" class="file-item draggable-item" :key="file.name">
                                    <img :src="file.src" alt="" ondragstart="return false;">
                                    <span class="file-remove" @click="mainRemoves(index)">+</span>
                                </section>
                                <section class="file-item">
                                    <div class="add">
                                        <input type="file" @change="mainFileChange" ref="mainFile"  accept="image/jpg,image/jpeg,image/png,image/bmp">
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                    <el-form-item style="width:160px;float:right;margin-top:10px">
                        <el-button type="primary" @click="submit('form')">提交</el-button>
                    </el-form-item>

                </el-form>

            </div>
        </div>
    </div>
</template>
<script>
    import qs from 'qs';
    import axios from 'axios';
    import navtitle from './navtitle'
    import api from '../api/api.js'
    export default {
        inject:['reload'],
        data() {
            return {
                userInfo:JSON.parse(sessionStorage.getItem('value')),
                form:{
                    // 经度
                    sLon:'',
                    // 纬度
                    sLat:'',
                },
                // ===================照片=========================
                // 负责人身份证件照
                LeaderPicVisible:false,
                LeaderPic:[
                    {name:'01',src:''}
                ],
                // 是否禁用查看按钮
                LeaderPicDisabled:false,
                leadPic:[],



                // 法人身份证件照
                LegalPicVisible:false,
                LegalPic:[
                    {name:'01',src:''}
                ],
                // 是否禁用查看按钮
                LegalPicDisabled:false,
                legalPic:[],



                // 营业执照
                BusinessImgVisible:false,
                licensePic:[],
                BusinessPic:[
                    {name:'01',src:''}
                ],
                // 是否禁用查看按钮
                BusinessPicDisabled:false,


                // 商户主图
                mainPic:[],
                // 是否禁用查看按钮
                StorePicDisabled:false,
                StoreImgVisible:false,
                StorePic:[],


                // 删除后剩余的图片
                mainFileList:[],
                delFileList:[],
                // 添加的主图
                Imgs:[],



                // 验证
                rules: {
                    // 安全中心
                    sName: [
                        { required: true, message: '请输入商户名称', trigger: 'blur' },
                        { min: 2,  message: '长度至少 2 个字符', trigger: 'blur' }
                    ],                
                    sLeader: [
                        { required: true, message: '请输入负责人姓名', trigger: 'blur' },
                        { min: 2,  message: '长度至少 2 个字符', trigger: 'blur' }
                    ],                
                    sLeaderIdCard: [
                        { required: true, message: '请输入负责人身份证号', trigger: 'blur' },
                        { min: 2,  message: '长度至少 2 个字符', trigger: 'blur' }
                    ],                
                    sTel: [
                        { required: true, message: '请输入联系电话', trigger: 'blur' },
                        { min: 11, max:11, message: '长度 11 个字符', trigger: 'blur' }
                    ],                
                    sLegal: [
                        { required: true, message: '请输入法人姓名', trigger: 'blur' },
                        { min: 2,  message: '长度至少 2 个字符', trigger: 'blur' }
                    ],                
                    sLegalIdCard: [
                        { required: true, message: '请输入法人身份证号', trigger: 'blur' },
                        { min: 2,  message: '长度至少 2 个字符', trigger: 'blur' }
                    ],                
                    sAddress: [
                        { required: true, message: '请输入商户地址', trigger: 'blur' },
                        { min: 2,  message: '长度至少 2 个字符', trigger: 'blur' }
                    ],                
                    sDescribe: [
                        { required: true, message: '请输入商户描述', trigger: 'blur' },
                        { min: 2,  message: '长度至少 2 个字符', trigger: 'blur' }
                    ],                              
                }
            }
        },
        methods: {
            getDataList(n1){
                // console.log(this.userInfo)
                // 获取商户详细信息
                axios.post(api.api.url+n1,qs.stringify({
                    uId:this.userInfo.uId,
                    sId:this.userInfo.sId,
                }),{emulateJSON: true},
                {
                headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                }
                ).then(reponse=>{
                    // console.log(reponse.data.data)
                    this.form=reponse.data.data
                    // 判断商户负责人手持证件照是否为0
                    // 如果不等于0
                    if(this.form.sLeaderPics.length!=0){
                        this.LeaderPicDisabled=false
                        // 由于只显示一张，所以这里写死
                        for(let i=0;i<this.form.sLeaderPics.length;i++){
                            this.LeaderPic[0].src=this.form.sLeaderPics[i].url
                        }
                    }else{
                        // 如果等于0
                        this.LeaderPicDisabled=true
                    }
                    
                    // 判断法人手持证件照是否为0
                    // 如果不等于0
                    if(this.form.sLegalPics.length!=0){
                        this.LegalPicDisabled=false
                        // 由于只显示一张，所以这里写死
                        for(let i=0;i<this.form.sLegalPics.length;i++){
                            this.LegalPic[0].src=this.form.sLegalPics[i].url
                        }
                    }else{
                        // 如果等于0
                        this.LegalPicDisabled=true
                    }


                    // 判断营业执照手持证件照是否为0
                    // 如果不等于0
                    if(this.form.sBuinessLicensePics.length!=0){
                        this.BusinessPicDisabled=false
                        // 由于只显示一张，所以这里写死
                        for(let i=0;i<this.form.sBuinessLicensePics.length;i++){
                            this.BusinessPic[0].src=this.form.sBuinessLicensePics[i].url
                        }
                    }else{
                        // 如果等于0
                        this.BusinessPicDisabled=true
                    }
                    // 判断商户宣传图是否为0
                    // 如果不等于0   
                    if(this.form.storePics.length!=0) {
                        this.StorePicDisabled=false;
                        for(let i=0;i<this.form.storePics.length;i++){
                            var item = {name:'',src:''};
                            item.src = this.form.storePics[i].url;
                            item.name = this.form.storePics[i].pNo;
                            this.StorePic.push(item);
                        }
                    } else {
                        this.StorePicDisabled=true;
                    }
                }) 
            },
            // 当商户地址失去焦点时的事件
            // http://restapi.amap.com/v3/geocode/geo?address=中华大街信誉楼百货&city=石家庄&output=JSON&key=5171da4ec1beb220053af33e742f7ea0
            blurClick(){
                // console.log(234)
                axios.post('http://restapi.amap.com/v3/geocode/geo',qs.stringify({
                    output:'JSON',
                    key:'5171da4ec1beb220053af33e742f7ea0',
                    city:this.form.acCity,
                    address:this.form.sAddress,
                }),{emulateJSON: true},
                {
                headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                }
                ).then(reponse=>{
                    // 获取经纬度
                    // console.log(reponse.data.geocodes[0].location)
                    // 更改经纬度
                    this.form.sLon=(reponse.data.geocodes[0].location).split(',')[0]
                    this.form.sLat=(reponse.data.geocodes[0].location).split(',')[1]
                }) 
            },


// ===============================负责人证件照开始=========================================
            // 负责人证件照
            sLeaderRemove(file, fileList) {
                // 当删除后禁用按钮
                this.LeaderPicDisabled=true
                // console.log(fileList)
            },
            // 添加负责人证件照
            leadFileChange(e) {
                // 当添加后解禁查看按钮
                this.LeaderPicDisabled=false
                
                const list = this.$refs.leadFile.files
                for (let i = 0; i < list.length; i++) {
                    if (!this.leadisContain(list[i])) {
                        const leaditem = {
                            name: list[i].name,
                            size: list[i].size,
                            file: list[i]
                        }
                        this.leadhtml5Reader(list[i], leaditem)
                        this.leadPic.push(leaditem)
                        this.LeaderPic[0]=(leaditem)
                    }
                }
                this.$refs.leadFile.value = ''
            },
            // 删除负责人证件照
            leadRemove(index) {
                // 当删除后禁用查看按钮
                this.LeaderPicDisabled=true
                this.leadPic.splice(index, 1)
            },
            // 将图片文件转成BASE64格式
            leadhtml5Reader(file, leaditem){
                const leadreader = new FileReader()
                leadreader.onload = (e) => {
                    this.$set(leaditem, 'src', e.target.result)
                }
                leadreader.readAsDataURL(file)
            },
            leadisContain(file) {
                return this.leadPic.find((leaditem) => leaditem.name === file.name && leaditem.size === file.size)
            },
// ===============================负责人证件照结束=========================================





// ===============================法人证件照开始=========================================
            // 法人证件照
            slegalerRemove(file, fileList) {
                // 当删除后禁用按钮
                this.LegalPicDisabled=true
            },
            // 添加法人证件照
            legalFileChange() {
                // 当添加后解禁查看按钮
                this.LegalPicDisabled=false
                const list = this.$refs.legalFile.files
                for (let i = 0; i < list.length; i++) {
                    if (!this.legalisContain(list[i])) {
                        const legalitem = {
                            name: list[i].name,
                            size: list[i].size,
                            file: list[i]
                        }
                        this.legalhtml5Reader(list[i], legalitem)
                        this.legalPic.push(legalitem)
                        this.LegalPic[0]=(legalitem)
                    }
                }
                this.$refs.legalFile.value = ''
            },
            // 删除法人证件照
            legalRemove(index) {
                // 当删除后禁用查看按钮
                this.LegalPicDisabled=true
                this.legalPic.splice(index, 1)
            },
            // 将图片文件转成BASE64格式
            legalhtml5Reader(file, legalitem){
                const legalreader = new FileReader()
                legalreader.onload = (e) => {
                    this.$set(legalitem, 'src', e.target.result)
                }
                legalreader.readAsDataURL(file)
            },
            legalisContain(file) {
                return this.legalPic.find((legalitem) => legalitem.name === file.name && legalitem.size === file.size)
            },
// ===============================法人证件照结束=========================================



// ===============================营业执照开始=========================================
            // 营业执照
            licenseRemove(file, fileList) {
                // 禁用查看图片按钮
                this.BusinessPicDisabled=true
            },
            // 添加营业执照
            licenseFileChange() {
                // 禁用查看图片按钮
                this.BusinessPicDisabled=false
                const list = this.$refs.licenseFile.files
                for (let i = 0; i < list.length; i++) {
                    if (!this.licenseisContain(list[i])) {
                        const licenseitem = {
                            name: list[i].name,
                            size: list[i].size,
                            file: list[i]
                        }
                        this.licensehtml5Reader(list[i], licenseitem)
                        this.licensePic.push(licenseitem)
                        this.BusinessPic[0]=(licenseitem)
                    }
                }
                this.$refs.licenseFile.value = ''
            },
            // 删除营业执照
            licenseRemoves(index) {
                // 禁用查看图片按钮
                this.BusinessPicDisabled=true
                this.licensePic.splice(index, 1)
            },
            // 将图片文件转成BASE64格式
            licensehtml5Reader(file, licenseitem){
                const licensereader = new FileReader()
                licensereader.onload = (e) => {
                    this.$set(licenseitem, 'src', e.target.result)
                }
                licensereader.readAsDataURL(file)
            },
            licenseisContain(file) {
                return this.licensePic.find((licenseitem) => licenseitem.name === file.name && licenseitem.size === file.size)
            },
// ===============================营业执照结束=========================================


// ===============================商户主图开始=========================================
            // 商户主图
            mainRemove(file, fileList) {
                this.delFileList.push(file)
                // console.log(file)
                // console.log(fileList)
                // console.log(this.form.storePics)
                for(var i=0;i<this.form.storePics.length;i++){
                    // 删除第一个（0）
                    if(fileList[i]!=undefined){
                        // 如果删除第一项（1）
                        if(file.pNo==0){
                            if(fileList[0]!=undefined){
                                fileList[0].pNo=0
                            }
                            if(fileList[1]!=undefined){
                                fileList[1].pNo=1
                            }
                            if(fileList[2]!=undefined){
                                fileList[2].pNo=2
                            }
                            if(fileList[3]!=undefined){
                                fileList[3].pNo=3
                            }
                        // 如果删除第二项（2）
                        }else if(file.pNo==1){
                            if(fileList[0]!=undefined){
                                fileList[0].pNo=0
                            }
                            if(fileList[1]!=undefined){
                                fileList[1].pNo=1
                            }
                            if(fileList[2]!=undefined){
                                fileList[2].pNo=2
                            }
                            if(fileList[3]!=undefined){
                                fileList[3].pNo=3
                            }
                        // 如果删除第三项（2）
                        }else if(file.pNo==2){
                            if(fileList[0]!=undefined){
                                fileList[0].pNo=0
                            }
                            if(fileList[1]!=undefined){
                                fileList[1].pNo=1
                            }
                            if(fileList[2]!=undefined){
                                fileList[2].pNo=2
                            }
                            if(fileList[3]!=undefined){
                                fileList[3].pNo=3
                            }  
                        // 如果删除第一四项（3）
                        }else if(file.pNo==3){
                            if(fileList[0]!=undefined){
                                fileList[0].pNo=0
                            }
                            if(fileList[1]!=undefined){
                                fileList[1].pNo=1
                            }
                            if(fileList[2]!=undefined){
                                fileList[2].pNo=2
                            }
                            if(fileList[3]!=undefined){
                                fileList[3].pNo=3
                            }   
                        }
                    }
                }
                // console.log(fileList)
                this.mainFileList=fileList
            },
            // 添加商户主图
            mainFileChange() {
                if(4 < this.StorePic.length) {
                    this.$notify.error({
                                title: '失败',
                                message: '添加失败，商户宣传图片最多上传5张！',
                                type: 'error'
                            }); 
                            return;
                }
                const list = this.$refs.mainFile.files
                for (let i = 0; i < list.length; i++) {
                    if (!this.mainisContain(list[i])) {
                        const mainitem = {
                            name: list[i].name,
                            size: list[i].size,
                            file: list[i]
                        }
                        this.mainhtml5Reader(list[i], mainitem)
                        this.mainPic.push(mainitem)
                        this.StorePic.push(mainitem);
                    }
                }
                this.StorePicDisabled=false;
                this.$refs.mainFile.value = ''
            },
            // 删除商户主图
            mainRemoves(index) {
                this.mainPic.splice(index, 1)
                this.StorePic.splice(this.form.storePics.length + index,1)
            },
            // 将图片文件转成BASE64格式
            mainhtml5Reader(file, mainitem){
                const mainreader = new FileReader()
                mainreader.onload = (e) => {
                    this.$set(mainitem, 'src', e.target.result)
                }
                mainreader.readAsDataURL(file)
            },
            mainisContain(file) {
                return this.mainPic.find((mainitem) => mainitem.name === file.name && mainitem.size === file.size)
            },
            // 清空商户宣传图
            clearStorePics() {
                this.form.storePics = [];
                this.StorePic = [];
                this.mainPic = [];
                this.StorePicDisabled=true;
            },
// ===============================商户主图结束=========================================




            submit(form){

                this.$refs[form].validate((valid) => {
                    if(valid){

                        // 负责人证件照字符串  Such as: store/xx.png
                        var leadPichtml=''
                        // 法人证件照字符串 Such as: store/xx.png
                        var legalPichtml=''
                        // 营业执照 Such as: store/xx.png
                        var licensePichtml=''
                        // 商户主图 Such as: store/xx.pngs
                        var mainPichtml=''
                        var ppic,picData,ppics=''
                        this.Imgs=[]

                        const client = new OSS.Wrapper({
                            region: 'oss-cn-beijing',
                            endpoint:'https://oss-cn-beijing.aliyuncs.com',
                            accessKeyId: api.api.accessKeyId,
                            accessKeySecret: api.api.accessKeySecret,
                            bucket: api.api.bucketName
                        });

                
                        // 上传的负责人证件照
                        const leadfNum = this.leadPic;
                        if(leadfNum.length!=0){
                            for(var i=0;i<leadfNum.length;i++){
                                var leadf=leadfNum[i].file
                                const leadName=leadf.name
                                const leadsuffix = leadName.substr(leadName.indexOf("."));
                                const leadobj=this.timestamp()+Math.ceil(Math.random()*10*100);
                                const leadstoreAs = api.api.MerchantImg+leadobj+leadsuffix
                                leadPichtml=leadstoreAs
                                
                                client.multipartUpload(leadstoreAs, leadf).then(function (result){
                                    // console.log(result.res.requestUrls)
                                })
                            }
                        }else{
                            if(0 < this.form.sLeaderPics.length) {
                                leadPichtml=this.form.sLeaderPics[0].url.substring(46)
                            }
                        }
                        // 上传的法人证件照
                        const legalfNum = this.legalPic;
                        if(this.userInfo.urName=="企业商户"){
                            if(legalfNum.length!=0){
                                for(var i=0;i<legalfNum.length;i++){
                                    var legalf=legalfNum[i].file
                                    const legalName=legalf.name
                                    const legalsuffix = legalName.substr(legalName.indexOf("."));
                                    const legalobj=this.timestamp()+Math.floor(Math.random()*10*100);
                                    const legalstoreAs = api.api.MerchantImg+legalobj+legalsuffix
                                    legalPichtml=legalstoreAs
                                    // console.log(legalstoreAs)
                                    client.multipartUpload(legalstoreAs, legalf).then(function (result){
                                        // console.log(result.res.requestUrls)
                                    })
                                }
                            }else{
                                if(0 < this.form.sLegalPics.length) {
                                    legalPichtml=this.form.sLegalPics[0].url.substring(46)
                                }
                            }
                        }

                        // 上传的营业执照
                        const licensefNum = this.licensePic;
                        if(this.userInfo.urName=='企业商户') {
                            if(licensefNum.length!=0){
                                for(var i=0;i<licensefNum.length;i++){
                                    var licensef=licensefNum[i].file
                                    const licenseName=licensef.name
                                    const licensesuffix = licenseName.substr(licenseName.indexOf("."));
                                    const licenseobj=this.timestamp()+Math.floor(Math.random()*10*100);
                                    const licensestoreAs = api.api.MerchantImg+licenseobj+licensesuffix
                                    licensePichtml=licensestoreAs
                                    client.multipartUpload(licensestoreAs, licensef).then(function (result){
                                    // console.log(result.res.requestUrls)
                                    })
                                }
                            }else{
                                if(0 < this.form.sBuinessLicensePics.length) {
                                    licensePichtml=this.form.sBuinessLicensePics[0].url.substring(46)
                                }
                            }
                        }

                        // 上传商品主图
                        const mainfNum = this.mainPic;
                        for(var i=0;i<mainfNum.length;i++){
                            var mainf=mainfNum[i].file
                            const mainName=mainf.name
                            const mainsuffix = mainName.substr(mainName.indexOf("."));
                            const mainobj=this.timestamp()+Math.floor(Math.random()*10*100);
                            const mainstoreAs = api.api.MerchantImg+mainobj+mainsuffix
                            this.Imgs.push(mainobj+mainsuffix)
                            // console.log(this.Imgs)
                            mainPichtml=mainstoreAs
                            // console.log(mainstoreAs)
                            client.multipartUpload(mainstoreAs, mainf).then(function (result){
                                // console.log(result.res.requestUrls)
                            })
                        }
                        // console.log(mainPichtml.substring(6))

// =============================================================
                        // 判断原始数据是否为空
                        // 若为空时
                        if(this.form.storePics.length==0){
                            if(this.StorePic.length == 0) {
                                picData='{"pTag": "'+this.form.pTag+'","pics": []}'
                            } else {
                            // 遍历添加的商户主图
                            for(var i=0;i<this.Imgs.length;i++){
                                ppic+='{"pName": "'+this.Imgs[i]+'","pNo": '+i+'},'
                            }
                            if(ppic!='') {
                                let reg=/,$/gi;
                                ppic=ppic.replace(reg,"");
                                ppic=ppic.substring(9)
                                picData='{"pTag": "'+this.form.pTag+'","pics": ['+ppic+']}'
                            }
                            }
                            
                                
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
                                        // let a=(this.form.storePics.length)+i
                                        // ppics+='{"pName": "'+this.Imgs[i]+'","pNo": '+a+'},'  
                                        if(this.delFileList!=0){
                                            let a=i
                                            ppics+='{"pName": "'+this.Imgs[i]+'","pNo": '+a+'},'  
                                        }else{
                                            let a=(this.form.storePics.length)+i
                                            ppics+='{"pName": "'+this.Imgs[i]+'","pNo": '+a+'},'  

                                        }
                                        // console.log(ppics)
                                    }
                                }

                                // 判断有没有删除
                                if(this.delFileList.length==0){
                                    // 如没有删除
                                        // 遍历原始数据
                                    for(var i=0;i<this.form.storePics.length;i++){
                                        ppic+='{"pName": "'+((this.form.storePics[i].url).substring(52))+'","pNo": '+this.form.storePics[i].pNo+'},'
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
                                            // console.log((this.mainFileList[i].url).substring(52))
                                            ppic+='{"pName": "'+((this.mainFileList[i].url).substring(52))+'","pNo": '+this.mainFileList[i].pNo+'},'
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
                                            // console.log((this.mainFileList[i].url).substring(52))
                                            ppic+='{"pName": "'+((this.mainFileList[i].url).substring(52))+'","pNo": '+this.mainFileList[i].pNo+'},'
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
                                    for(var i=0;i<this.form.storePics.length;i++){
                                        ppic+='{"pName": "'+((this.form.storePics[i].url).substring(52))+'","pNo": '+this.form.storePics[i].pNo+'},'
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
// =============================================================
                        axios.post(api.api.url+'msReSubmitStoreAuditInfo',qs.stringify({
                            uId:this.userInfo.uId,
                            sId:this.form.sId,
                            sDescribe:this.form.sDescribe,
                            sTel:this.form.sTel,
                            sAddress:this.form.sAddress,
                            sLon:this.form.sLon,
                            sLat:this.form.sLat,
                            picData:picData,
                            sLeader:this.form.sLeader,
                            sLeaderIdCard:this.form.sLeaderIdCard,
                            sLeaderPicName:leadPichtml.substring(6),
                            sLegal:this.form.sLegal,
                            sLegalIdCard:this.form.sLegalIdCard,
                            sLegalPicName:legalPichtml.substring(6),
                            sBusinessLicensePicName:licensePichtml.substring(6),
                        }),{emulateJSON: true},
                        {
                        headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                        }
                        ).then(reponse=>{
                            // console.log(reponse)
                            this.$notify({
                                title: '成功',
                                message: '修改成功，等待管理员审核！',
                                type: 'success'
                            }); 
                            this.reload();
                            // setTimeout(() => {
                            //     if(this.userInfo.urName=='个人商户'){
                            //         this.getDataList('msGetPersonalStoreInfoBySid')
                            //     }else if(this.userInfo.urName=='企业商户'){
                            //         this.getDataList('msGetCompanyStoreInfoBySid')
                            //     }
                            // // 负责人证件照字符串
                            // this.leadPic=[]
                            // var leadPichtml=''
                            // // 法人证件照字符串
                            // this.legalPic=[]
                            // var legalPichtml=''
                            // // 营业执照
                            // this.licensePic=[]
                            // var licensePichtml=''
                            // // 商户主图
                            // this.mainPic=[]
                            // this.StorePic=[]
                            // var mainPichtml=''
                            // var ppic,picData,ppics=''
                            // this.Imgs=[]
                            // }, 200);
                        }) 
                    }
                })
            },



            // 时间戳
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
            },
        },
        components:{
            // 引入导航
            navtitle:navtitle
        },
        //   钩子函数
        created:function(){
            if(this.userInfo.urName=='个人商户'){
                this.getDataList('msGetPersonalStoreInfoBySid')
            }else if(this.userInfo.urName=='企业商户'){
                this.getDataList('msGetCompanyStoreInfoBySid')
            }
        }
    }
</script>    
<style lang='less' scoped>
.auditinfo{
    width: 100%;
    height:100%;
    .box{
        margin:0 auto;
        width:100%;
        height:100%;
        overflow: scroll;        
        background:url(../assets/bg.jpg);
        background-size: contain;
        // background-color: #324057;
        .content{
            margin: 20px auto;
            width:1000px;
            padding: 10px 0;
            // height:1355px;
            // border: 1px solid #ccc;
            background-color: #fff;
            .el-form-item{
                float: left;
                width:50%;
                div[class='.el-form-item__content']{
                    width:10%!important;
                }
            }
        }
    }
}




// 图片上传

.upload-demo{
    padding-left: 96px;
}

.vue-uploader .file-list {
    padding: 10px 0px;
    padding-left: 96px;
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
    margin:4px 7px;
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
    border-radius:6px;
    width: 150px;
    height: 150px;
    float: left;
    text-align: center;
    line-height: 150px;
    font-size: 30px;
    cursor: pointer;
    background: url(../assets/upImg.png) no-repeat;
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

