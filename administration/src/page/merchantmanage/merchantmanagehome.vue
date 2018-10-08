<template>
    <div class="merchantmanage">
        <div id="search">
            <el-form ref="search" :model="search" class="clearfix">
                <el-form-item label="商户名称：" label-width="87px">
                    <el-input v-model="search.sName"></el-input>
                </el-form-item>
                <el-form-item label="商户负责人：" label-width="102px">
                    <el-input v-model="search.sLeader"></el-input>
                </el-form-item>
                <el-form-item label="商户类型：" prop="sType" label-width="96px">
                    <el-select v-model="search.sType" placeholder="请选择商户类型">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="个人商户" value="0"></el-option>
                    <el-option label="企业商户" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核状态：" prop="sChecked" label-width="96px">
                    <el-select v-model="search.sChecked" placeholder="请选择审核状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未通过" value="0"></el-option>
                    <el-option label="已通过" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推荐店铺：" prop="isRecommend" label-width="96px">
                    <el-select v-model="search.isRecommend" placeholder="请选择是否为推荐店铺">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="否" value="0"></el-option>
                    <el-option label="是" value="1"></el-option>
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
                    <el-table-column prop="sName" label="商户名称" width="220"></el-table-column>
                    <el-table-column prop="acCity" label="所在城市"></el-table-column>
                    <el-table-column prop="sType" label="商户类型"></el-table-column>
                    <el-table-column prop="sLeader" label="负责人姓名"></el-table-column>
                    <el-table-column prop="sLevel" label="商户评级"></el-table-column>
                    <el-table-column prop="sCreateTime" label="创建时间" min-width="150"></el-table-column>
                    <el-table-column style="color:red" prop="sChecked" label="审核状态">
                        <template slot-scope="scope">
                                <span v-if="scope.row.sChecked=='未通过'" style="color: red">未通过</span>
                                <span v-else style="color: #549c54">已通过</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="uTrueName" label="审核人"></el-table-column>
                    <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleClick(enterprisedialogFormVisible,storePicsdialogFormVisible, scope.row)">查看</el-button>
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
        <el-dialog class="bomb" title="企业商户详情" :visible.sync="enterprisedialogFormVisible" :close-on-click-modal='false' @close='enterprisedialogFormCloseDialog("form")'>
            <el-form :model="form,OtherInfo"  ref="form" :rules="rules" class="demo-ruleForm clearfix" label-position="left">
                <el-form-item label="商户名称：" prop="sName">
                    <span>{{form.sName}}</span>
                </el-form-item>
                <el-form-item label="商户类型：" prop="sType">
                    <span>{{form.sType}}</span>
                </el-form-item>
                <el-form-item label="商户描述：" prop="sDescribe">
                    <span>{{form.sDescribe}}</span>
                </el-form-item>
                <el-form-item label="商户联系电话：" prop="sTel">
                    <span>{{form.sTel}}</span>
                </el-form-item>
                <el-form-item label="商户负责人：" prop="sLeader">
                    <span>{{form.sLeader}}</span>
                </el-form-item>
                <el-form-item label="负责人身份证号：" prop="sLeaderIdCard">
                    <span>{{form.sLeaderIdCard}}</span>
                </el-form-item>
                <el-form-item label="商户法人：" prop="sLegal">
                    <span>{{form.sLegal}}</span>
                </el-form-item>
                <el-form-item label="法人身份证号：" prop="sLegalIdCard">
                    <span>{{form.sLegalIdCard}}</span>
                </el-form-item>
                <el-form-item label="负责人手持证件照：">
                    <span>{{sLeaderPicsLength}} 张</span> <el-button type="text" :disabled="disabledClick1" @click="GinnerVisible1 = true">查看</el-button>
                </el-form-item>
                <el-form-item label="法人手持证件照：">
                    <span>{{sLegalPicsLength}} 张</span> <el-button type="text" :disabled="disabledClick2" @click="GinnerVisible2 = true">查看</el-button>
                </el-form-item>
                <el-form-item label="商户营业执照照片：">
                    <span>{{sBuinessLicensePicsLength}} 张</span> <el-button type="text" :disabled="disabledClick3" @click="GinnerVisible3 = true">查看</el-button>
                </el-form-item>
                <el-form-item label="商户宣传图照片：">
                    <span>{{storePicsLength}} 张</span> <el-button type="text" :disabled="disabledClick4" @click="GinnerVisible4 = true">查看</el-button>
                </el-form-item>

                <el-form-item label="所在城市：" prop="acCity">
                    <span>{{form.acCity}}</span>
                </el-form-item>
                <el-form-item label="注册时间：" prop="sCreateTime">
                    <span>{{form.sCreateTime}}</span>
                </el-form-item>
                <el-form-item label="地址：" style="width:500px" prop="sAddress">
                    <span>{{form.sAddress}}</span>
                </el-form-item>

                <el-form-item label="审核状态：" prop="sChecked">
                    <span style="color:#549c54">{{form.sChecked}}</span>
                </el-form-item>
                <el-form-item label="审核人：" prop="uTrueName">
                    <span>{{form.uTrueName}}</span>
                </el-form-item>
                <el-form-item label="审核时间：" prop="sCheckedTime">
                    <span>{{form.sCheckedTime}}</span>
                </el-form-item>
                <el-form-item label="审核内容：" prop="sCheckedOpinion" label-width="96px" style="width:660px">
                    <el-input type="textarea" :autosize="{minRows: 6}" placeholder="请输入内容" v-model="form.sCheckedOpinion" resize="none"></el-input>
                </el-form-item>
                <el-form-item label="已缴纳保障金：" prop="uwDeposit">
                    <span>{{OtherInfo.uwDeposit}}</span> 元
                </el-form-item>
                <el-form-item label="可用余额：" prop="uwLeftMoney">
                    <span>{{OtherInfo.uwLeftMoney}}</span> 元
                </el-form-item>
                <el-form-item label="已发布商品：" prop="productNum">
                    <span>{{OtherInfo.productNum}}</span> 个
                </el-form-item>
                <el-form-item label="商品推荐展位总个数：" prop="sBoothNum">
                    <span>{{form.sBoothNum}}</span>
                </el-form-item>
                <el-form-item label="商户接单额度：" prop="sOrderLimint" label-width="130px">
                    <el-input v-model="form.sOrderLimint" style="width:150px"></el-input> 元
                </el-form-item>
                <el-form-item label="需求交易手续费：" prop="sRequirementServiceCharge" label-width="132px">
                    <el-input v-model="form.sRequirementServiceCharge" style="width:150px"></el-input> %
                </el-form-item>
                <el-form-item label="商品交易手续费：" prop="sProductServiceCharge" label-width="132px">
                    <el-input v-model="form.sProductServiceCharge" style="width:150px"></el-input> %
                </el-form-item>
                <el-form-item label="商户评级：" prop="sLevel" label-width="132px">
                    <el-input v-model="form.sLevel" style="width:150px"></el-input>
                </el-form-item>
                <el-form-item label="商品推荐展位剩余个数：" prop="sLeftBoothNum" label-width="180px">
                    <el-input v-model="form.sLeftBoothNum" style="width:100px"></el-input> 个
                </el-form-item>
                <el-form-item label="商户权重：" prop="sWeight" label-width="132px">
                    <el-input v-model="form.sWeight" style="width:150px"></el-input>
                </el-form-item>
                <el-form-item label="是否为推荐商户：" prop="isRecommend" label-width="132px" v-if="this.status">
                    <el-select v-model="OtherInfo.isRecommend" placeholder="请选择是否设置为推荐商户">
                        <el-option label="否" value="0"></el-option>
                        <el-option label="是" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <div v-if="this.OtherInfo.isRecommend=='是' || this.OtherInfo.isRecommend=='1'">
                    <el-form-item style="float:right;width:100%" label="推荐标题：" prop="rsTitle" label-width="132px">
                        <el-input type="textarea" :autosize="{minRows: 2}" placeholder="请输入内容" v-model="OtherInfo.rsTitle" resize="none"></el-input>
                    </el-form-item>
                    <el-form-item style="float:right;width:100%" label="推荐内容：" prop="rsContent" label-width="132px">
                        <el-input type="textarea" :autosize="{minRows: 2}" placeholder="请输入内容" v-model="OtherInfo.rsContent" resize="none"></el-input>
                    </el-form-item>
                    <div style="width:100%;height:200px;float:left;position: relative;" >
                        <div style="width:100%;height:20px;background-color:#ffffff;float:left;font-weight:700;color:#606266;" label-width="132px">推荐图片：
                            <el-button type="text" :disabled="RecommendPicDisabled" style="padding:0;margin-left:30px;" @click="RecommendPicVisible=true">查看</el-button>
                        </div>
                        <!-- 查看图片 -->
                        <el-dialog width="600px" title="图片展示" :visible.sync="RecommendPicVisible" append-to-body>
                            <div class="block">
                                <el-carousel trigger="click" height="300px">
                                    <el-carousel-item v-for="item in RecommendPic" :key="item.name">
                                        <img :src="item.src" alt="" style="width:100%;height:100%">
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                        </el-dialog>
                        
                        <div class="vue-uploader" style="width:100%">
                            <div class="file-list">
                                <section v-for="(file, index) of recommendPic" class="file-item draggable-item" :key="file.name">
                                    <img :src="file.src" alt="" ondragstart="return false;">
                                    <span class="file-remove" @click="recommendPicRemoves(index)">+</span>
                                </section>
                                <section class="file-item">
                                    <div class="add">
                                        <input type="file" @change="recommendPicChange" ref="recommendPicFile"  accept="image/jpg,image/jpeg,image/png,image/bmp">
                                    </div>
                                </section>
                            </div>
                        </div>
                        <div style="width:655px;height:100%;position: absolute;top:0;left:265px;background-color:#ffffff"></div>
                    </div>
                </div>
                

                <el-form-item style="float:right;margin-bottom:0px;width:100%" class="clearfix">
                    <el-button @click="resetForm('form')" style="float:right;">关闭</el-button>     
                    <el-button type="primary" @click="enterprisesubmitForm('form')" style="float:right;margin-right:30px">确定</el-button>
                    <el-button type="primary" @click="QenterprisesubmitForm('form')" style="float:right;margin-right:30px">下架</el-button>
                </el-form-item>
                <!-- 查看图片 -->
                <el-dialog width="600px" title="负责人身份证照片" :visible.sync="GinnerVisible1" append-to-body>
                    <div class="block">
                        <el-carousel trigger="click" height="300px">
                            <el-carousel-item v-for="item in form.sLeaderPics" :key="item.pNo">
                                <img :src="item.url" alt="" style="width:100%;height:100%">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </el-dialog>

                <el-dialog width="600px" title="法人身份证照片" :visible.sync="GinnerVisible2" append-to-body>
                    <div class="block">
                        <el-carousel trigger="click" height="300px">
                            <el-carousel-item v-for="item in form.sLegalPics" :key="item.pNo">
                                <img :src="item.url" alt="" style="width:100%;height:100%">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </el-dialog>

                <el-dialog width="600px" title="营业执照照片" :visible.sync="GinnerVisible3" append-to-body>
                    <div class="block">
                        <el-carousel trigger="click" height="300px">
                            <el-carousel-item v-for="item in form.sBuinessLicensePics" :key="item.pNo">
                                <img :src="item.url" alt="" style="width:100%;height:100%">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </el-dialog>
                <el-dialog width="600px" title="商户宣传图照片" :visible.sync="GinnerVisible4" append-to-body>
                    <div class="block">
                        <el-carousel trigger="click" height="300px">
                            <el-carousel-item v-for="item in form.storePics" :key="item.pNo">
                                <img :src="item.url" alt="" style="width:100%;height:100%">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </el-dialog>
            </el-form>
        </el-dialog>


        <el-dialog class="bomb" title="个人商户详情" :visible.sync="storePicsdialogFormVisible" :close-on-click-modal='false'>
            <el-form :model="form,OtherInfo"  ref="form" :rules="rules" class="demo-ruleForm clearfix" label-position="left">
                <el-form-item label="商户名称：" prop="sName">
                    <span>{{form.sName}}</span>
                </el-form-item>
                <el-form-item label="商户类型：" prop="sType">
                    <span>{{form.sType}}</span>
                </el-form-item>
                <el-form-item label="商户描述：" prop="sDescribe">
                    <span>{{form.sDescribe}}</span>
                </el-form-item>
                <el-form-item label="商户联系电话：" prop="sTel">
                    <span>{{form.sTel}}</span>
                </el-form-item>
                <el-form-item label="商户负责人：" prop="sLeader">
                    <span>{{form.sLeader}}</span>
                </el-form-item>
                <el-form-item label="负责人身份证号：" prop="sLeaderIdCard">
                    <span>{{form.sLeaderIdCard}}</span>
                </el-form-item>
                <el-form-item label="负责人手持证件照：">
                    <span>{{sLeaderPicsLength}} 张</span> <el-button type="text" :disabled="disabledClick1" @click="QinnerVisible1 = true">查看</el-button>
                </el-form-item>
                <el-form-item label="商户宣传图照片：">
                    <span>{{storePicsLength}} 张</span> <el-button type="text" :disabled="disabledClick4" @click="QinnerVisible2 = true">查看</el-button>
                </el-form-item>
                <el-form-item label="所在城市：" prop="acCity">
                    <span>{{form.acCity}}</span>
                </el-form-item>
                <el-form-item label="地址：" prop="sAddress">
                    <span>{{form.sAddress}}</span>
                </el-form-item>
                <el-form-item label="注册时间：" prop="sCreateTime">
                    <span>{{form.sCreateTime}}</span>
                </el-form-item>

                <el-form-item label="审核状态：" prop="sChecked">
                    <span style="color:#549c54">{{form.sChecked}}</span>
                </el-form-item>
                <el-form-item label="审核人：" prop="uTrueName">
                    <span>{{form.uTrueName}}</span>
                </el-form-item>
                <el-form-item label="审核时间：" prop="sCheckedTime">
                    <span>{{form.sCheckedTime}}</span>
                </el-form-item>
                <el-form-item label="审核内容：" prop="sCheckedOpinion" label-width="96px" style="width:660px">
                    <el-input type="textarea" :autosize="{minRows: 6}" placeholder="请输入内容" v-model="form.sCheckedOpinion" resize="none"></el-input>
                </el-form-item>

                <el-form-item label="已缴纳保障金：" prop="uwDeposit">
                    <span>{{OtherInfo.uwDeposit}}</span> 元
                </el-form-item>
                <el-form-item label="可用余额：" prop="uwLeftMoney">
                    <span>{{OtherInfo.uwLeftMoney}}</span> 元
                </el-form-item>
                <el-form-item label="已发布商品：" prop="productNum">
                    <span>{{OtherInfo.productNum}}</span> 个
                </el-form-item>
                <el-form-item label="商品推荐展位总个数：" prop="sBoothNum">
                    <span>{{form.sBoothNum}}</span>
                </el-form-item>
                <el-form-item label="商户接单额度：" prop="sOrderLimint" label-width="130px">
                    <el-input v-model="form.sOrderLimint" style="width:150px"></el-input> 元
                </el-form-item>
                <el-form-item label="需求交易手续费：" prop="sRequirementServiceCharge" label-width="132px">
                    <el-input v-model="form.sRequirementServiceCharge" style="width:150px"></el-input> %
                </el-form-item>
                <el-form-item label="商品交易手续费：" prop="sProductServiceCharge" label-width="132px">
                    <el-input v-model="form.sProductServiceCharge" style="width:150px"></el-input> %
                </el-form-item>
                <el-form-item label="商户评级：" prop="sLevel" label-width="132px">
                    <el-input v-model="form.sLevel" style="width:150px"></el-input>
                </el-form-item>
                <el-form-item label="商品推荐展位剩余个数：" prop="sLeftBoothNum" label-width="180px">
                    <el-input v-model="form.sLeftBoothNum" style="width:100px"></el-input> 个
                </el-form-item>
                <el-form-item label="商户权重：" prop="sWeight" label-width="132px">
                    <el-input v-model="form.sWeight" style="width:150px"></el-input>
                </el-form-item>
                <el-form-item style="float:right;margin-bottom:0px;width:100%" class="clearfix">
                    <el-button @click="resetForm('form')" style="float:right;">关闭</el-button>   
                    <el-button type="primary" @click="personalsubmitForm('form')" style="float:right;margin-right:30px">确定</el-button>
                    <el-button type="primary" @click="GpersonalsubmitForm('form')" style="float:right;margin-right:30px">下架</el-button>
                </el-form-item>

                <!-- 查看图片 -->
                <el-dialog width="600px" title="负责人身份证照片" :visible.sync="QinnerVisible1" append-to-body>
                    <div class="block">
                        <el-carousel trigger="click" height="300px">
                            <el-carousel-item v-for="item in form.sLeaderPics" :key="item.url">
                                <img :src="item.url" alt="" style="width:100%;height:100%">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </el-dialog>
                <el-dialog width="600px" title="商户宣传图照片" :visible.sync="QinnerVisible2" append-to-body>
                    <div class="block">
                        <el-carousel trigger="click" height="300px">
                            <el-carousel-item v-for="item in form.storePics" :key="item.url">
                                <img :src="item.url" alt="" style="width:100%;height:100%">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </el-dialog>
            </el-form>
        </el-dialog>



        <!-- 审核状态 -->
        <el-dialog class="bomb" title="企业商户审核" :visible.sync="enterprisedialogForms" :close-on-click-modal='false'>
            <el-form :model="form,OtherInfo"  ref="form" :rules="rules" class="demo-ruleForm clearfix" label-position="left">
                <el-form-item label="商户名称：" prop="sName">
                    <span>{{form.sName}}</span>
                </el-form-item>
                <el-form-item label="商户类型：" prop="sType">
                    <span>{{form.sType}}</span>
                </el-form-item>
                <el-form-item label="商户负责人姓名：" prop="sLeader">
                    <span>{{form.sLeader}}</span>
                </el-form-item>
                <el-form-item label="商户负责人身份证号：" prop="sLeaderIdCard">
                    <span>{{form.sLeaderIdCard}}</span>
                </el-form-item>
                <el-form-item label="商户联系手机号：" prop="sTel">
                    <span>{{form.sTel}}</span>
                </el-form-item>
                <el-form-item label="地址：" prop="sAddress">
                    <span>{{form.sAddress}}</span>
                </el-form-item>
                <el-form-item label="商户法人姓名：" prop="sLegal">
                    <span>{{form.sLegal}}</span>
                </el-form-item>
                <el-form-item label="商户法人身份证号：" prop="sLegalIdCard">
                    <span>{{form.sLegalIdCard}}</span>
                </el-form-item>
                <el-form-item label="负责人手持证件照：">
                    <span>{{sLeaderPicsLength}} 张</span> <el-button type="text" :disabled="disabledClick1" @click="GGinnerVisible1 = true">查看</el-button>
                </el-form-item>
                <el-form-item label="法人手持证件照：">
                    <span>{{sLegalPicsLength}} 张</span> <el-button type="text" :disabled="disabledClick2" @click="GGinnerVisible2 = true">查看</el-button>
                </el-form-item>
                <el-form-item label="商户营业执照照片：">
                    <span>{{sBuinessLicensePicsLength}} 张</span> <el-button type="text" :disabled="disabledClick3" @click="GGinnerVisible3 = true">查看</el-button>
                </el-form-item>
                <el-form-item label="商户宣传图照片：">
                    <span>{{storePicsLength}} 张</span> <el-button type="text" :disabled="disabledClick4" @click="GGinnerVisible4 = true">查看</el-button>
                </el-form-item>
                <el-form-item label="商户描述：" style="width:550px" prop="sDescribe">
                    <span>{{form.sDescribe}}</span>
                </el-form-item>
                <el-form-item label="审核状态：" prop="formChecked" label-width="96px">
                    <el-select v-model="formChecked" placeholder="请选择审核状态">
                    <el-option label="未通过" value="0"></el-option>
                    <el-option label="已通过" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核内容：" prop="sCheckedOpinion" label-width="96px" style="width:660px">
                    <el-input type="textarea" :autosize="{minRows: 6}" placeholder="请输入内容"  v-model="form.sCheckedOpinion" resize="none"></el-input>
                </el-form-item>
                <el-form-item style="float:right;margin-bottom:0px;width:100%" class="clearfix">
                    <el-button @click="resetForm('form')" style="float:right;">关闭</el-button>                
                    <el-button type="primary" @click="QQsubmitForm('form')" style="float:right;margin-right:30px">确定</el-button>
                </el-form-item>                
                <!-- 查看图片 -->
                <el-dialog width="600px" title="负责人身份证照片" :visible.sync="GGinnerVisible1" append-to-body>
                    <div class="block">
                        <el-carousel trigger="click" height="300px">
                            <el-carousel-item v-for="item in form.sLeaderPics" :key="item.pNo">
                                <img :src="item.url" alt="" style="width:100%;height:100%">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </el-dialog>

                <el-dialog width="600px" title="法人身份证照片" :visible.sync="GGinnerVisible2" append-to-body>
                    <div class="block">
                        <el-carousel trigger="click" height="300px">
                            <el-carousel-item v-for="item in form.sLegalPics" :key="item.pNo">
                                <img :src="item.url" alt="" style="width:100%;height:100%">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </el-dialog>

                <el-dialog width="600px" title="营业执照照片" :visible.sync="GGinnerVisible3" append-to-body>
                    <div class="block">
                        <el-carousel trigger="click" height="300px">
                            <el-carousel-item v-for="item in form.sBuinessLicensePics" :key="item.pNo">
                                <img :src="item.url" alt="" style="width:100%;height:100%">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </el-dialog>
                <el-dialog width="600px" title="商户宣传图照片" :visible.sync="GGinnerVisible4" append-to-body>
                    <div class="block">
                        <el-carousel trigger="click" height="300px">
                            <el-carousel-item v-for="item in form.storePics" :key="item.pNo">
                                <img :src="item.url" alt="" style="width:100%;height:100%">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </el-dialog>
            </el-form>
        </el-dialog>


        <el-dialog class="bomb" title="个人商户审核" :visible.sync="storePicsdialogForms" :close-on-click-modal='false'>
            <el-form :model="form,OtherInfo"  ref="form" :rules="rules" class="demo-ruleForm clearfix" label-position="left">
                <el-form-item label="商户名称：" prop="sName">
                    <span>{{form.sName}}</span>
                </el-form-item>
                <el-form-item label="商户负责人姓名：" prop="sLeader">
                    <span>{{form.sLeader}}</span>
                </el-form-item>
                <el-form-item label="负责人身份证号：" prop="sLeaderIdCard">
                    <span>{{form.sLeaderIdCard}}</span>
                </el-form-item>
                <el-form-item label="商户联系手机号：" prop="sTel">
                    <span>{{form.sTel}}</span>
                </el-form-item>
                <el-form-item label="地址：" style="width:550px" prop="sAddress">
                    <span>{{form.sAddress}}</span>
                </el-form-item>
                
                <el-form-item label="负责人手持证件照：">
                    <span>{{sLeaderPicsLength}} 张</span> <el-button type="text" :disabled="disabledClick1" @click="QQinnerVisible1 = true">查看</el-button>
                </el-form-item>
                <el-form-item label="商户宣传图照片：">
                    <span>{{storePicsLength}} 张</span> <el-button type="text" :disabled="disabledClick4" @click="QQinnerVisible2 = true">查看</el-button>
                </el-form-item>
                <el-form-item label="商户描述：" style="width:550px" prop="sDescribe">
                    <span>{{form.sDescribe}}</span>
                </el-form-item>
                <el-form-item label="审核状态：" prop="formCheckeds" label-width="96px">
                    <el-select v-model="formCheckeds" placeholder="请选择审核状态">
                    <el-option label="未通过" value="0"></el-option>
                    <el-option label="已通过" value="1"></el-option>
                    </el-select>
                </el-form-item>                
                <el-form-item label="审核内容：" prop="sCheckedOpinion" label-width="96px" style="width:660px">
                    <el-input type="textarea" :autosize="{minRows: 6}" placeholder="请输入内容" resize="none" v-model="form.sCheckedOpinion"></el-input>
                </el-form-item>

                <el-form-item style="float:right;margin-bottom:0px;width:100%" class="clearfix">
                    <el-button @click="resetForm('form')" style="float:right;">关闭</el-button>                
                    <el-button type="primary" @click="GGsubmitForm('form')" style="float:right;margin-right:30px">确定</el-button>
                </el-form-item>

                <!-- 查看图片 -->
                <el-dialog width="600px" title="负责人身份证照片" :visible.sync="QQinnerVisible1" append-to-body>
                    <div class="block">
                        <el-carousel trigger="click" height="300px">
                            <el-carousel-item v-for="item in form.sLeaderPics" :key="item.pNo">
                                <img :src="item.url" alt="" style="width:100%;height:100%">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </el-dialog>
                <el-dialog width="600px" title="商户宣传图照片" :visible.sync="QQinnerVisible2" append-to-body>
                    <div class="block">
                        <el-carousel trigger="click" height="300px">
                            <el-carousel-item v-for="item in form.storePics" :key="item.pNo">
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
          sName: '',
          sLeader: '',
          sType: '',          
          sChecked: '',
          isRecommend: '',
        },

        recommendVisible:false,
        RecommendPicDisabled:true,
        RecommendPicVisible:false,
        RecommendPic:[
            {name:'01',src:''}
        ],
        recommendPic:[],
        status:false,
        // 数据
        tableData: [],
        // 分页
        currentPage: 1, //  默认显示第几页
        pageSize: 12, //  每页显示多少条数据
        totalCount: 1, //  数据的总条数
        // 弹框
            // 企业
        enterprisedialogFormVisible:false,
        // 图片查看
        GinnerVisible1:false,
        GinnerVisible2:false,
        GinnerVisible3:false,
        GinnerVisible4:false,
        
            // 个人
        storePicsdialogFormVisible:false,
        // 图片查看
        QinnerVisible1:false,
        QinnerVisible2:false,              
            // 审核-企业
        enterprisedialogForms:false,
        formChecked:'0',
        // 图片查看
        GGinnerVisible1:false,
        GGinnerVisible2:false,
        GGinnerVisible3:false,
        GGinnerVisible4:false,

            // 审核-个人
        storePicsdialogForms:false,
        formCheckeds:'0',        
        // 图片查看
        QQinnerVisible1:false,
        QQinnerVisible2:false,  

        form:{

        },

            sLeaderPicsLength:'',
            disabledClick1:false,
            sLegalPicsLength:'',
            disabledClick2:false,
            sBuinessLicensePicsLength:'',
            disabledClick3:false,
            storePicsLength:'',
            disabledClick4:false,
        // 分页
        a1:'',
        a2:'',
        a3:'',       
        a4:'', 
        a5:'',   
        // 缴费等
        OtherInfo:[],

        rules: {
            sCheckedOpinion: [
                { required: true, message: '请输审核内容', trigger: 'blur' },
                { max: 20,  message: '审核内容不可超过 20 个字符', trigger: 'blur' }
            ],
        }        
      }
    },
    methods: {

        // 删除推荐图片
        recommendPicRemoves(index) {
            this.RecommendPicDisabled=true
            this.recommendPic.splice(index, 1)
            this.RecommendPic.splice(index,1)
        },  
        
        // 添加推荐图片
        recommendPicChange() {
            // 禁用查看图片按钮
            this.RecommendPicDisabled=false
                const list = this.$refs.recommendPicFile.files
                for (let i = 0; i < list.length; i++) {
                    if (!this.recommendPicContain(list[i])) {
                        const recommendPicitem = {
                            name: list[i].name,
                            size: list[i].size,
                            file: list[i]
                        }
                        this.recommendPichtml5Reader(list[i], recommendPicitem)
                        this.recommendPic.push(recommendPicitem)
                        this.RecommendPic[0]=(recommendPicitem)
                    }
            }
            this.$refs.recommendPicFile.value = ''    
        },    
        // 将图片文件转成BASE64格式
        recommendPichtml5Reader(file, recommendPicitem){
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.$set(recommendPicitem, 'src', e.target.result)
                }
                reader.readAsDataURL(file)
        },
        recommendPicContain(file) {
            return this.recommendPic.find((recommendPicitem) => recommendPicitem.name === file.name && recommendPicitem.size === file.size)
        },

        getDataList:function(n1,n2,n3,n4,n5,n6,n7){
            // console.log(this.userInfo)
            // 获取店铺列表接口
            axios.post(api.api.url+n1,qs.stringify({
                uId:this.userInfo.uId,
                sName:n2,
                sType:n3,
                sLeader:n4,
                sChecked:n5,
                isRecommend:n6,
                start:n7,
                end:this.pageSize,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse)
                if(reponse.data.data!=null){
                    for(var i=0;i<reponse.data.data.stores.length;i++){
                        // 商户类型
                        if(reponse.data.data.stores[i].sType=='0'){
                            reponse.data.data.stores[i].sType="个人商户"
                        }else if(reponse.data.data.stores[i].sType=='1'){
                            reponse.data.data.stores[i].sType="企业商户"
                        }
                        // 审核状态
                        if(reponse.data.data.stores[i].sChecked=='0'){
                            reponse.data.data.stores[i].sChecked="未通过"
                        }else if(reponse.data.data.stores[i].sChecked=='1'){
                            reponse.data.data.stores[i].sChecked="已通过"
                        }
                    }
                    this.tableData=reponse.data.data.stores
                    this.totalCount=reponse.data.data.totalCount;
                }

            }) 
        },
        getData:function(){

            if(this.$route.params.sChecked==0){
                this.getDataList('msGetStoreList','','','','0','','0')
                this.search.sChecked="未通过"
            }else{
                this.getDataList('msGetStoreList','','','','','','0')
            }
        },

        // 分页
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.getDataList('msGetStoreList',this.a1,this.a2,this.a3,this.a4,this.a5,(val-1)*(this.pageSize))
        },
        // 搜索
        onSubmit() {
            this.a1=this.search.sName
            this.a2=this.search.sType
            this.a3=this.search.sLeader
            this.a4=this.search.sChecked
            this.a5=this.search.isRecommend
            if(this.search.sChecked=="未通过"){
                this.a4='0'
            }

            // console.log(this.a4);
            
            this.getDataList('msGetStoreList',this.a1,this.a2,this.a3,this.a4,this.a5,'0')
            this.currentPage=1
        },

        // 数据查看
        handleClick(storePicsdialogFormVisible,enterprisedialogFormVisible,row) {
            // console.log(row);
            this.sLeaderPicsLength=row.sLeaderPics.length
            if(row.sLeaderPics.length==0){
                this.disabledClick1=true
            }else{
                this.disabledClick1=false
            }

            this.sLegalPicsLength=row.sLegalPics.length
            if(row.sLegalPics.length==0){
                this.disabledClick2=true
            }else{
                this.disabledClick2=false
            }

            this.sBuinessLicensePicsLength=row.sBuinessLicensePics.length
            if(row.sBuinessLicensePics.length==0){
                this.disabledClick3=true
            }else{
                this.disabledClick3=false
            }

            this.storePicsLength=row.storePics.length
            if(row.storePics.length==0){
                this.disabledClick4=true
            }else{
                this.disabledClick4=false
            }

            var sTypes=''

            this.form=row
            if(row.sType=='个人商户'){
                sTypes='0';
                this.status=false;
            }else if(row.sType=='企业商户'){
                sTypes='1';
                this.status=true;
            }

            axios.post(api.api.url+'msGetStoreOtherInfoBySId',qs.stringify({
                uId:this.userInfo.uId,
                sId:row.sId,
                sType:sTypes,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse.data.data)
                this.OtherInfo=reponse.data.data
                if(this.OtherInfo.isRecommend=='1') {
                    this.OtherInfo.isRecommend='是';
                } else {
                    this.OtherInfo.isRecommend='否';
                }
                if(this.OtherInfo.pics.length!=0) {
                    this.RecommendPicDisabled=false;
                    // 只有一张宣传图片
                    for(let i=0;i<this.OtherInfo.pics.length;i++){
                        this.RecommendPic[0].src=this.OtherInfo.pics[i].url
                    }
                } else {
                    this.RecommendPicDisabled=true;
                }
                
            }) 
            if(row.sType=='个人商户'){
                if(row.sChecked=='未通过'){
                    this.storePicsdialogForms=true;
                }else{
                    this.storePicsdialogFormVisible=true;
                }
            }else{
                if(row.sChecked=='未通过'){
                    this.enterprisedialogForms=true
                }else{
                    this.enterprisedialogFormVisible=true
                }
            }
        },

        // 确认上传
        Submission:function(s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11){
            // 添加或修改店铺配置信息接口
            axios.post(api.api.url+'msAddOrChangeStoreConfigInfo',qs.stringify({
                uId:this.userInfo.uId,
                sId:s1,
                sOrderLimint:s2,
                requirementServiceCharge:s3,
                productServiceCharge:s4,
                sLevel:s5,
                sWeight:s6,
                sBoothNum:s7,
                isRecommend:s8,
                rsTitle:s9,
                rsContent:s10,
                picData:s11,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                // console.log(reponse)
                this.reload()
                // this.getData()
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

        // 企业
        enterprisesubmitForm(form) {
            this.$refs[form].validate((valid) => {
                if(valid){
                    // 推荐照片 Such as: store/xx.png
                    var recommendPichtml='';
                    var picData='';
                    if(this.OtherInfo.isRecommend=='是' || this.OtherInfo.isRecommend=='1') {
                        this.OtherInfo.isRecommend='1';    
                    } else {
                        this.OtherInfo.isRecommend='0';    
                    }
                    if(this.OtherInfo.isRecommend=='0') {
                        this.Submission(this.form.sId,this.form.sOrderLimint,this.form.sRequirementServiceCharge,this.form.sProductServiceCharge,this.form.sLevel,this.form.sWeight,
                            this.form.sLeftBoothNum,this.OtherInfo.isRecommend,'','','')
                    } else {
                        if(this.OtherInfo.rsTitle.length==0) {
                            this.$notify.error({
                                title: '错误',
                                message: '请输入推荐标题!',
                                type: 'error'
                            }); 
                            return
                        }
                        if(this.OtherInfo.rsContent.length==0) {
                            this.$notify.error({
                                title: '错误',
                                message: '请输入推荐内容!',
                                type: 'error'
                            }); 
                            return
                        }
                        if(this.recommendPic.length==0 && this.OtherInfo.pics.length==0) {
                            this.$notify.error({
                                title: '错误',
                                message: '请上传推荐图片!',
                                type: 'error'
                            }); 
                            return
                        }
                        const client = new OSS.Wrapper({
                            region: 'oss-cn-beijing',
                            endpoint:'https://oss-cn-beijing.aliyuncs.com',
                            accessKeyId: api.api.accessKeyId,
                            accessKeySecret: api.api.accessKeySecret,
                            bucket: api.api.bucketName
                        });
                        // 上传推荐店铺的照片
                        const leadfNum = this.recommendPic;
                        if(leadfNum.length!=0){
                            for(var i=0;i<leadfNum.length;i++){
                                var leadf=leadfNum[i].file
                                const leadName=leadf.name
                                const leadsuffix = leadName.substr(leadName.indexOf("."));
                                const leadobj=this.timestamp()+Math.ceil(Math.random()*10*100);
                                const leadstoreAs = api.api.MerchantImg+leadobj+leadsuffix
                                recommendPichtml=leadstoreAs
                                
                                client.multipartUpload(leadstoreAs, leadf).then(function (result){
                                    // console.log(result.res.requestUrls)
                                })
                            }
                        }else{
                            if(0 < this.OtherInfo.pics.length) {
                                recommendPichtml=this.OtherInfo.pics[0].url.substring(46)
                            }
                        }
                        picData='{"pTag": "'+this.OtherInfo.pTag+'","pics": [{"pName": "'+recommendPichtml.substring(6)+'","pNo": '+0+'}]}'
                
                        
                    this.Submission(this.form.sId,this.form.sOrderLimint,this.form.sRequirementServiceCharge,this.form.sProductServiceCharge,this.form.sLevel,this.form.sWeight,
                        this.form.sLeftBoothNum,this.OtherInfo.isRecommend,this.OtherInfo.rsTitle,this.OtherInfo.rsContent,picData)
                    }
                    
                    this.$notify({
                    title: '成功',
                    message: '修改成功！',
                    type: 'success'
                    });                      
                    if (valid) {
                        this.enterprisedialogFormVisible=false                        
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                }

            });
        },


        // 下架与审核
        Lowerframe:function(q1,q2,q3,q4){
            // 修改店铺审核状态接口
            axios.post(api.api.url+'msChangeStoreCheckStatus',qs.stringify({
                uId:q1,
                sId:q2,
                sChecked:q3,
                sCheckedOpinion:q4,
            }),{emulateJSON: true},
            {
            headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
            }
            ).then(reponse=>{
                this.reload()
                // this.getData()
            })  
        },


        // 企业下架
        QenterprisesubmitForm(form) {
            this.$refs[form].validate((valid) => {
                if(valid){
                    this.Lowerframe(this.userInfo.uId,this.form.sId,'0',this.form.sCheckedOpinion)
                    this.enterprisedialogFormVisible=false
                    this.$notify({
                    title: '成功',
                    message: '已下架！',
                    type: 'success'
                    }); 
                }
            });
        },
        // 企业审核
        QQsubmitForm(form) {
            this.$refs[form].validate((valid) => {
                if(valid){
                    this.Lowerframe(this.userInfo.uId,this.form.sId,this.formChecked,this.form.sCheckedOpinion)
                    this.$notify({
                    title: '成功',
                    message: '修改成功！',
                    type: 'success'
                    }); 
                    this.enterprisedialogForms=false   
                    this.formChecked='0'  
                }
  
            });
        },

        



        // 个人
        personalsubmitForm(form) {
            this.$refs[form].validate((valid) => {
                if(valid){
                    // console.log(this.form)
                    this.Submission(this.form.sId,this.form.sOrderLimint,this.form.sRequirementServiceCharge,this.form.sProductServiceCharge,this.form.sLevel,
                        this.form.sWeight,this.form.sLeftBoothNum,'','','','')
                    this.$notify({
                        title: '成功',
                        message: '修改成功！',
                        type: 'success'
                    });                  

                    if (valid) {
                        this.storePicsdialogFormVisible=false                        
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                }

            });
        },
        // 个人下架
        GpersonalsubmitForm(form) {
            this.$refs[form].validate((valid) => {
                if(valid){
                    this.Lowerframe(this.userInfo.uId,this.form.sId,'0',this.form.sCheckedOpinion)
                    this.storePicsdialogFormVisible=false
                    this.$notify({
                    title: '成功',
                    message: '已下架！',
                    type: 'success'
                    });    
                }
            });
        },
        // // 个人审核
        GGsubmitForm(form) {
            this.$refs[form].validate((valid) => {
                if(valid){
                    this.Lowerframe(this.userInfo.uId,this.form.sId,this.formCheckeds,this.form.sCheckedOpinion)
                    this.storePicsdialogForms=false   
                    this.formCheckeds='0'    
                    this.$notify({
                    title: '成功',
                    message: '修改成功！',
                    type: 'success'
                    }); 
                }
            });
        },        

        // 取消上传
        resetForm(form) {
            this.reload()
            // this.$refs[form].resetFields();
            // this.enterprisedialogFormVisible=false
            // this.storePicsdialogFormVisible=false
            // this.enterprisedialogForms=false
            // this.storePicsdialogForms=false
            // this.RecommendPicDisabled=true;
            // this.recommendVisible=false;
            // this.recommendPic=[];
            // this.RecommendPic=[
            //     {name:'01',src:''}
            // ];
            // this.getData()

        },
        enterprisedialogFormCloseDialog(form) {
            this.reload()
            // this.$refs[form].resetFields();
            // this.enterprisedialogFormVisible=false
            // this.storePicsdialogFormVisible=false
            // this.enterprisedialogForms=false
            // this.storePicsdialogForms=false
            // this.RecommendPicDisabled=true;
            // this.recommendVisible=false;
            // this.recommendPic=[];
            // this.RecommendPic=[
            //     {name:'01',src:''}
            // ];
            // this.getData()
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
    .merchantmanage{
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


// 查看图片
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
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

