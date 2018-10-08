<template>
    <div class="setaccount clearfix">
        <div class="setaccount-first" @click="accountInformation">
            <div class="first-img">
                <img src="../../assets/user.png" alt="">
            </div>
            <div class="first-txt">账户信息</div>
        </div>
        <div class="setaccount-first" @click="SecurityCenter">
            <div class="first-img"  style="height:60px;margin-top:38px">
                <img src="../../assets/security.png" alt="">
            </div>
            <div class="first-txt">安全中心</div>
        </div>

        <!-- <div class="setaccount-first" @click="forgetPassword">
            <div class="first-img">
                <img src="../../assets/forget.png" alt="">
            </div>
            <div class="first-txt">忘记密码</div>
        </div> -->

        <div class="setaccount-first" @click="modifyPassword" v-if="forgetPasswordHide">
            <div class="first-img">
                <img src="../../assets/modify.png" alt="">
            </div>
            <div class="first-txt">修改密码</div>
        </div>

        <div class="setaccount-first" @click="Mywallet">
            <div class="first-img">
                <img src="../../assets/money.png" alt="">
            </div>
            <div class="first-txt">我的钱包</div>
        </div>

    <!-- 弹框 -->
        <!-- 账户信息 -->
        <el-dialog class="bomb" title="账户信息" :visible.sync="accountInformationPopup" :close-on-click-modal='false' @close='AccountinfoCloseDialog("accountInfo")'>
            <el-form :model="accountInfo"  ref="accountInfo" class="demo-ruleForm clearfix">

            <el-form-item label="商户名称：" prop="sName" label-width="110px">
                <span>{{accountInfo.sName}}</span>
            </el-form-item>
            <el-form-item label="创建时间：" prop="sCreateTime" label-width="110px">
                <span>{{accountInfo.sCreateTime}}</span>
            </el-form-item>
            <el-form-item label="负责人姓名：" prop="sLeader" label-width="110px">
                <span>{{accountInfo.sLeader}}</span>
            </el-form-item>
            <el-form-item label="身份证号：" prop="sLeaderIdCard" label-width="110px">
                <span>{{accountInfo.sLeaderIdCard}}</span>
            </el-form-item>
            <el-form-item label="商户经度：" prop="sLon" label-width="110px">
                <span>{{accountInfo.sLon}}</span>
            </el-form-item>
            <el-form-item label="商户纬度：" prop="sLat" label-width="110px">
                <span>{{accountInfo.sLat}}</span>
            </el-form-item>
            <el-form-item label="联系电话：" prop="sTel" label-width="110px">
                <el-input v-model="accountInfo.sTel"></el-input>
            </el-form-item>
            <el-form-item label="商户地址：" prop="sAddress" label-width="110px" style="width:100%;">
                <el-input type="textarea" :autosize="{minRows: 2}" resize='none' v-model="accountInfo.sAddress" @blur="blurClick"></el-input>
            </el-form-item>
            <el-form-item label="商户描述：" prop="sDescribe" label-width="110px" style="width:100%;">
                <el-input type="textarea" :autosize="{minRows: 4}" resize='none' v-model="accountInfo.sDescribe"></el-input>
            </el-form-item>

                <div style="width:90%;height:20px;background-color:#ffffff;float:left;padding-left:28px;font-weight:700;color:#606266">商户宣传图：
                    <el-button type="text" :disabled="StorePicDisabled" style="padding:0;margin:0" @click="StoreImgVisible = true">查看</el-button>
                    <el-button type="text" style="padding:0;margin:0"  v-if="this.StorePic.length > 4" @click="clearStorePics()">清空</el-button>
                </div>
                <!-- 将数据遍历，并操作删除 -->
                <!-- <el-upload class="upload-demo" style="padding-left:111px;width:20%;" action="s" :on-remove="handleRemove" :file-list="accountInfo.storePics" list-type="picture"></el-upload>      -->
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
                <div class="vue-uploader" style="height:730px">
                    <div class="file-list">
                        <section v-for="(file, index) in files" class="file-item draggable-item" :key="file.name">
                            <img :src="file.src" alt="" ondragstart="return false;">
                            <span class="file-remove" @click="removes(index)">+</span>
                        </section>
                        <section v-if="status == 'ready'" class="file-item">
                            <div class="add">
                                <input type="file" @change="fileChanged" ref="file"  accept="image/jpg,image/jpeg,image/png,image/bmp">
                            </div>
                        </section>
                        <!-- <div style="width:240px;height:160px;background-color:#ffffff;position: absolute;top:677px;right:0"></div> -->
                    </div>
                </div>


            <el-form-item style="float:right;margin-bottom:0px;width:100%" class="clearfix">
                <el-button @click="resetForm('accountInfo')" style="float:right;">关闭</el-button>                
                <el-button type="primary" @click="submitInfo('accountInfo')" :disabled="accountInfoDisable" style="float:right;margin-right:30px">修改</el-button>
            </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 安全中心未设置 -->
        <el-dialog class="bomb Securitymodify" title="设置安全中心" :visible.sync="SecurityCenterPopup" :close-on-click-modal='false' @close='SecurityCcloseDialog("SecurityC")'>
            <el-form :model="SecurityC" :rules="rules" ref="SecurityC" class="demo-ruleForm clearfix">
                <el-form-item label="问题一：" prop="Selected1" label-width="100px">
                    <el-select v-model="SecurityC.Selected1" placeholder="请选择条目一">
                        <el-option v-for="item in problemList1" v-bind:label="item.sqName" v-bind:value="item.sqId" :key="item.sqName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="您的回答：" prop="Answer1" label-width="100px" placeholder="请输入您的回答">
                    <el-input v-model="SecurityC.Answer1"></el-input>
                </el-form-item>
                <el-form-item label="问题二：" prop="Selected2" label-width="100px">
                    <el-select v-model="SecurityC.Selected2" placeholder="请选择条目二">
                        <el-option v-for="item in problemList2" v-bind:label="item.sqName" v-bind:value="item.sqId" :key="item.sqName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="您的回答：" prop="Answer2" label-width="100px" placeholder="请输入您的回答">
                    <el-input v-model="SecurityC.Answer2"></el-input>
                </el-form-item>
                <el-form-item label="问题三：" prop="Selected3" label-width="100px">
                    <el-select v-model="SecurityC.Selected3" placeholder="请选择条目三">
                        <el-option v-for="item in problemList3" v-bind:label="item.sqName" v-bind:value="item.sqId" :key="item.sqName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="您的回答：" prop="Answer3" label-width="100px" placeholder="请输入您的回答">
                    <el-input v-model="SecurityC.Answer3"></el-input>
                </el-form-item>
                <el-form-item style="float:right;margin-bottom:0px;width:100%" class="clearfix">
                    <el-button @click="SecurityCresetForm('SecurityC')" style="float:right;">关闭</el-button>                
                    <el-button type="primary" @click="submitAnswer('SecurityC')" style="float:right;margin-right:30px">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 安全中心修改 -->
        <el-dialog class="bomb Securitymodify" title="修改安全中心" :visible.sync="SecurityCenterPopups" @close='oldSecurityCcloseDialog("oldSecurityC")' :close-on-click-modal='false'>
            <el-form :model="oldSecurityC" :rules="rules" ref="oldSecurityC" class="demo-ruleForm clearfix">
                <p style="font-weight:700;font-size:15px;">旧问题：</p>                
                <el-form-item label="问题一：" prop="oldSelected1" label-width="100px">
                        <el-input disabled v-model="oldproblemList1"></el-input>
                </el-form-item>
                <el-form-item label="您的回答：" prop="oldAnswer1" label-width="100px" placeholder="请输入您的回答">
                    <el-input :disabled='oldDisabled' v-model="oldSecurityC.oldAnswer1" @focus="focusClick()"></el-input>
                </el-form-item>
                <el-form-item label="问题二：" prop="oldSelected2" label-width="100px">
                        <el-input disabled v-model="oldproblemList2"></el-input>
                </el-form-item>
                <el-form-item label="您的回答：" prop="oldAnswer2" label-width="100px" placeholder="请输入您的回答">
                    <el-input :disabled='oldDisabled' v-model="oldSecurityC.oldAnswer2" @focus="focusClick()"></el-input>
                </el-form-item>
                <el-form-item  label="问题三：" prop="oldSelected3" label-width="100px">
                        <el-input disabled v-model="oldproblemList3"></el-input>
                </el-form-item>
                <el-form-item label="您的回答：" prop="oldAnswer3" label-width="100px" placeholder="请输入您的回答">
                    <el-input :disabled='oldDisabled' v-model="oldSecurityC.oldAnswer3" @focus="focusClick()"></el-input>
                </el-form-item>
                <el-form-item style="float:right;margin-bottom:0px;width:100%" class="clearfix">
                    <el-button :disabled='oldDisabled' :type="primaryColor" @click="Verification('oldSecurityC')" style="float:right;">{{VerificationTitle}}</el-button>
                </el-form-item>
                <div v-if="blockBox">
                    <p style="font-weight:700;font-size:15px;">新问题：</p>                
                    <el-form-item label="问题一：" prop="newSelected1" label-width="100px">
                        <el-select v-model="oldSecurityC.newSelected1" placeholder="请选择条目一">
                            <el-option v-for="item in problemList1" v-bind:label="item.sqName" v-bind:value="item.sqId" :key="item.sqName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="您的回答：" prop="newAnswer1" label-width="100px" placeholder="请输入您的回答">
                        <el-input v-model="oldSecurityC.newAnswer1"></el-input>
                    </el-form-item>
                    <el-form-item label="问题二：" prop="newSelected2" label-width="100px">
                        <el-select v-model="oldSecurityC.newSelected2" placeholder="请选择条目二">
                            <el-option v-for="item in problemList2" v-bind:label="item.sqName" v-bind:value="item.sqId" :key="item.sqName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="您的回答：" prop="newAnswer2" label-width="100px" placeholder="请输入您的回答">
                        <el-input v-model="oldSecurityC.newAnswer2"></el-input>
                    </el-form-item>
                    <el-form-item label="问题三：" prop="newSelected3" label-width="100px">
                        <el-select v-model="oldSecurityC.newSelected3" placeholder="请选择条目三">
                            <el-option v-for="item in problemList3" v-bind:label="item.sqName" v-bind:value="item.sqId" :key="item.sqName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="您的回答：" prop="newAnswer3" label-width="100px" placeholder="请输入您的回答">
                        <el-input v-model="oldSecurityC.newAnswer3"></el-input>
                    </el-form-item>
                    <el-form-item style="float:right;margin-bottom:0px;width:100%" class="clearfix">
                        <el-button @click="oldSecurityCresetForm('oldSecurityC')" style="float:right;">关闭</el-button>                
                        <el-button type="primary" @click="NewsubmitForm('oldSecurityC')" style="float:right;margin-right:30px">确定</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-dialog>



        <!-- 修改密码 -->
        <el-dialog class="bomb" title="敏感操作需要验证您的身份，请选择验证方式" :visible.sync="SelectedPopup" width="500px" :close-on-click-modal='false'>
            <template>
            <el-radio v-model="selectedRadio" label="1">手机号验证</el-radio>
            <el-radio v-model="selectedRadio" label="2">安全问题验证</el-radio>
            </template>
            <div style="width:100%;margin-top:50px" class="clearfix">
                <el-button @click="resetForm" style="float:right;">关闭</el-button>                
                <el-button type="primary" @click="checkedForm" style="float:right;margin-right:30px">确定</el-button>
            </div>
        </el-dialog>
  

        <!-- 忘记密码 -->
        <el-dialog class="bomb" title="手机号验证" :visible.sync="forgetPasswordPopup" width="500px" @close='forgetPasscloseDialog("forgetPass")' :close-on-click-modal='false'>
            <el-form :model="forgetPass" :rules="rules" ref="forgetPass" class="demo-ruleForm clearfix">
                <el-form-item label="请输入手机号：" prop="tel" label-width="127px" placeholder="请输入您的手机号">
                    <el-input :disabled='TelDisabled' style="width:335px" v-model.number="forgetPass.tel"></el-input>
                </el-form-item>
                <el-form-item prop="number" label="请输入验证码：" placeholder="请输入验证码" label-width="127px" style="width:100%;">
                    <el-input :disabled='TelDisabled' v-model.number="forgetPass.number" style="width:150px" placeholder="请输入验证码"></el-input>
                    <el-button @click="sendMsg" :disabled="isDisabled" style="margin-left:20px;width:159px;text-align:center">{{buttonName}}</el-button>
                </el-form-item>
            <el-form-item style="float:right;margin-bottom:10px;width:100%" class="clearfix">
                <el-button :disabled='TelDisabled' :type="TelprimaryColor" @click="TelresetForm('forgetPass')" style="float:right;margin-right:7px">{{TelVerification}}</el-button>                
            </el-form-item>
            <div v-if="Telblock">
                <el-form-item label="旧密码：" prop="oldpassword" label-width="100px" placeholder="请输入您的旧密码">
                    <el-input v-model="forgetPass.oldpassword"></el-input>
                </el-form-item>
                <el-form-item label="新密码：" prop="newpassword" label-width="100px" placeholder="请输入您的新密码">
                    <el-input v-model="forgetPass.newpassword"></el-input>
                </el-form-item>        
                <el-form-item style="float:right;margin-bottom:0px;width:100%" class="clearfix">
                    <el-button @click="forgetPassresetForm('forgetPass')" style="float:right;">关闭</el-button>                
                    <el-button type="primary" @click="TelsubmitForm('forgetPass')" style="float:right;margin-right:30px">确定</el-button>
                </el-form-item>                
            </div>
            </el-form>
        </el-dialog>

        <!-- 修改密码 -->
        <el-dialog class="bomb" title="安全问题验证" :visible.sync="modifyPasswordPopup" @close='modifyPasscloseDialog("modifyPass")' :close-on-click-modal='false'>
            <el-form :model="modifyPass" :rules="rules" ref="modifyPass" class="demo-ruleForm clearfix">
                <p style="font-weight:700;font-size:15px;">旧问题：</p>                
                <el-form-item label="问题一：" prop="oldSelected1" label-width="100px">
                        <el-input disabled v-model="oldproblemList1"></el-input>
                </el-form-item>
                <el-form-item label="您的回答：" prop="oldAnswer1s" label-width="100px" placeholder="请输入您的回答">
                    <el-input :disabled='oldDisableds' v-model="modifyPass.oldAnswer1s"></el-input>
                </el-form-item>
                <el-form-item label="问题二：" prop="oldSelected2" label-width="100px">
                        <el-input disabled v-model="oldproblemList2"></el-input>
                </el-form-item>
                <el-form-item label="您的回答：" prop="oldAnswer2s" label-width="100px" placeholder="请输入您的回答">
                    <el-input :disabled='oldDisableds' v-model="modifyPass.oldAnswer2s"></el-input>
                </el-form-item>
                <el-form-item  label="问题三：" prop="oldSelected3" label-width="100px">
                        <el-input disabled v-model="oldproblemList3"></el-input>
                </el-form-item>
                <el-form-item label="您的回答：" prop="oldAnswer3s" label-width="100px" placeholder="请输入您的回答">
                    <el-input :disabled='oldDisableds' v-model="modifyPass.oldAnswer3s"></el-input>
                </el-form-item>
                <el-form-item style="float:right;margin-bottom:20px;width:100%" class="clearfix">
                    <el-button :disabled='oldDisableds' :type="primaryColors" @click="Verifications('modifyPass')" style="float:right;">{{VerificationTitles}}</el-button>
                </el-form-item>
                <div v-if="blockBoxs">
                    <el-form-item label="旧密码：" prop="oldpassword" label-width="100px" placeholder="请输入您的旧密码">
                        <el-input v-model="modifyPass.oldpassword"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码：" prop="newpassword" label-width="100px" placeholder="请输入您的新密码">
                        <el-input v-model="modifyPass.newpassword"></el-input>
                    </el-form-item>
                    <el-form-item style="float:right;margin-bottom:0px;width:100%" class="clearfix">
                        <el-button @click="modifyPassresetForm('modifyPass')" style="float:right;">关闭</el-button>                
                        <el-button type="primary" @click="newsubmitForm('modifyPass')" style="float:right;margin-right:30px">确定</el-button>
                    </el-form-item>
                </div>

            </el-form>
        </el-dialog>



        
        <!-- 我的钱包 -->
            <el-dialog title="我的钱包" :visible.sync="MywalletPopup" class="clearfix" :close-on-click-modal='false'>
                <div class="MywalletPopup-top">
                    <p style="font-size:18px;font-weight:700">{{MyMoney.uwLeftMoney}}</p>
                    <p>可用余额（元）</p>
                </div>
                <div class="MoneyRecord clearfix">
                    <div class="MywalletPopup-cont">
                        <p style="font-size:18px;font-weight:700">{{MyMoney.uwDeposit}}</p>
                        <p>冻结的保障金（元）</p>
                    </div>
                    <div class="MywalletPopup-cont">
                        <p style="font-size:18px;font-weight:700">{{MyMoney.uwApplyToCash}}</p>
                        <p>申请提现的金额（元）</p>
                    </div>
                    <div class="MywalletPopup-cont">
                        <p style="font-size:18px;font-weight:700">{{MyMoney.uwAlreadyToCash}}</p>
                        <p>已提现的金额（元）</p>
                    </div>
                    <!-- <div class="MywalletPopup-cont">
                        <p style="font-size:18px;font-weight:700">{{MyMoney.uwAlreadyToCash}}</p>
                        <p>可用余额（元）</p>
                    </div>                    -->
                </div>
                <!-- 缴纳 -->
                <el-dialog class="clearfix" width="600px" title="缴纳保证金" :visible.sync="payMoneyPopup" append-to-body  @close='payMoneyscloseDialog("payMoneys")' :close-on-click-modal='false'>
                    <div class="tieleBox clearfix">
                        <el-form :model="payMoneys" ref="payMoneys" :rules="rules" class="demo-ruleForm">
                            <div class="payMoney-left">
                                <div style="padding-left:15px;margin-bottom:30px;color:#ccc">保障金金额（元）</div>
                                <el-form-item prop="messageMoney" placeholder="请输入金额" label="金额：" label-width="71px" style="width:100%;">
                                    <!-- 输入金额 -->
                                    <el-input v-model.number="payMoneys.messageMoney" style="width:200px;" @focus="focusChecked"></el-input>
                                </el-form-item>
                                <el-form-item style="width:100%;margin-top:5px;padding-left:50px;overflow:hidden">
                                    <el-radio-group v-model="payMoneys.resource" style="margin-left:20px" @change="checkedImg($event)">
                                        <el-radio :label="item.psName" v-for="item in paymentImg" v-bind:key="item.psId">
                                            <img src="../../assets/icon_zhifubao.png" alt="" v-if="item.psName=='支付宝支付'" style="position: absolute;top:-7px;left:20px">
                                            <img src="../../assets/icon_weixin.png" alt="" v-if="item.psName=='微信支付'" style="position: absolute;top:-7px;left:20px">
                                        </el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </div>
                            <div class="payMoney-right">
                                <div class="payMoney-img">
                                    <!-- <img :src="paymentMoneyImg" alt=""> -->
                                    <!-- 展示二维码 -->
                                    <canvas id="canvas"></canvas>
                                </div>
                                <p style="text-align:center;margin-top:20px;margin-bottom:20px;color:#ccc">扫一扫向我付款</p>
                            </div>
                            <!-- <el-form-item style="float:right;margin-bottom:0px;width:100%" class="clearfix">
                                <el-button @click="payMoneysresetForm('payMoneys')" style="float:right">关闭</el-button>                
                                <el-button type="primary" @click="submitpaymentMoney('payMoneys')" style="float:right;margin-right:30px">确定</el-button>
                            </el-form-item> -->
                        </el-form>
                    </div>
                </el-dialog>
                <!-- 解冻 -->
                <el-dialog width="380px" title="解冻保证金" :visible.sync="ThawMoneyPopup" append-to-body  @close='ThawMoneyscloseDialog("ThawMoneys")' :close-on-click-modal='false'>
                    <el-form :model="ThawMoneys" ref="ThawMoneys" :rules="rules" class="demo-ruleForm clearfix">
                        <el-form-item prop="SomMoney" placeholder="请输入金额" label="金额：" label-width="71px" style="width:100%;">
                            <el-input v-model.number="ThawMoneys.SomMoney" style="width:270px;"></el-input>
                        </el-form-item>
                        <el-form-item style="float:right;margin-bottom:0px;width:100%" class="clearfix">
                            <el-button @click="ThawMoneysClick('ThawMoneys')" style="float:right">关闭</el-button>                
                            <el-button type="primary" @click="submitThawMoneysClick('ThawMoneys')" style="float:right;margin-right:30px">确定</el-button>
                        </el-form-item>

                    </el-form>
                </el-dialog>

                <!-- 提现 -->
                <el-dialog width="500px" title="申请提现" :visible.sync="carryMoneyPopup" append-to-body  @close='carryMoneyscloseDialog("carryMoneys")' :close-on-click-modal='false'>
                    <el-form :model="carryMoneys" ref="carryMoneys" :rules="rules" class="demo-ruleForm clearfix">
                        <!-- <p style="font-size:16px;line-height:28px">保障金金额（元）</p> -->
                        <el-form-item prop="utcrMoney" label="金额：" label-width="100px">
                            <el-input v-model.number="carryMoneys.utcrMoney" placeholder="请输入金额"></el-input>
                        </el-form-item>
                        <el-form-item style="height:47px">
                            <el-radio-group v-model="carryMoneys.psId" style="margin-left:20px">
                                <el-radio :label="item.psName" v-for="item in paymentImg" v-bind:key="item.psName" v-bind:value="item.psName" v-if="item.psName=='支付宝支付'">
                                    <img src="../../assets/icon_zhifubao.png" alt="" v-if="item.psName=='支付宝支付'" style="position: absolute;top:-7px;left:20px">
                                    <img src="../../assets/icon_weixin.png" alt="" v-if="item.psName=='微信支付'" style="position: absolute;top:-7px;left:20px">
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item prop="utcrAccount" style="float:left;width:100%" label="收款账号：" label-width="101px">
                            <el-input v-model="carryMoneys.utcrAccount" placeholder="请输入您的收款账号"></el-input>
                        </el-form-item>
                        <el-form-item style="float:right;margin-bottom:0px;width:100%" class="clearfix">
                            <el-button @click="carryMoneysresetForm('carryMoneys')" style="float:right;">关闭</el-button>                
                            <el-button type="primary" @click="submitpayment('carryMoneys')" style="float:right;margin-right:30px">确定</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
                <!-- 记录 -->
                <el-dialog width="600px" title="提现记录" :visible.sync="recordMoneyPopup" append-to-body></el-dialog>

                <!-- 按钮 -->
                <div class="Footer clearfix">
                    <!-- 缴纳 -->
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" style="margin-left:60px;margin-top:20px;width:200px" @click="payMoney">缴纳保障金</el-button>
                    </div>
                    <!-- 解冻 -->
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" style="margin-left:60px;margin-top:20px;width:200px" @click="ThawMoney">解冻保障金</el-button>
                    </div>
                    <!-- 提现 -->
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" style="margin-left:60px;margin-top:20px;width:200px" @click="carryMoney">申请提现</el-button>
                    </div>
                    <!-- 记录 -->
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" style="margin-left:60px;margin-top:20px;width:200px" @click="recordMoney">提现记录</el-button>
                    </div>

                </div>
            </el-dialog>



    </div>
</template>
<script>
    import qs from 'qs';
    import axios from 'axios';
    // 引入二维码插件
    import QRCode from 'qrcode'
    import api from '../../api/api.js'
    export default {
        data() {
            return {
                userInfo:JSON.parse(sessionStorage.getItem('value')),
                forgetPasswordHide:true,


        //   上传图片
        status: 'ready',
        files: [],
        // 是否禁用查看按钮
        StorePicDisabled:false,
        StoreImgVisible:false,
        StorePic:[],
        point: {},
        // uploading: false,
        percent: 0,
        // 删除预览图片数组
        preview:[],
        // 将删除的数据添加到数据
        delFileList:[],

        // 剩余
        mainFileList:[],
        // 添加图片数组
        Imgs:[],

        // 拼接
        Arr:[],


                // 获取所有问题
                problemList1:[],
                problemList2:[],
                problemList3:[],
                oldDisabled:false,
                // 修改密码

                SelectedPopup:false,
                selectedRadio:'1',

                oldDisableds:false,
                oldproblemList1:'',
                oldproblemList2:'',
                oldproblemList3:'',
                // 手机号验证
                TelprimaryColor:'primary',
                TelDisabled:false,
                TelVerification:'验证',
                // 显示
                Telblock:false,

                VerificationTitle:'验证',
                VerificationTitles:'验证',
                primaryColor:'primary',
                primaryColors:'primary',
                // 显示新问题
                blockBox:false,
                blockBoxs:false,


                // 发送按钮倒计时
                buttonName: "获取验证码",  
                isDisabled: false,  
                time: 60,  

            // 输入框的验证信息
                rules: {
                    // 安全中心
                    Selected1: [
                        { required: true, message: '请选择条目一', trigger: 'change' }
                    ],
                    Answer1: [
                        { required: true, message: '请输入您的答案', trigger: 'blur' },
                        { min: 2,  message: '长度至少 2 个字符', trigger: 'blur' }
                    ],
                    Selected2: [
                        { required: true, message: '请选择条目二', trigger: 'change' }
                    ],
                    Answer2: [
                        { required: true, message: '请输入您的答案', trigger: 'blur' },
                        { min: 2,  message: '长度至少 2 个字符', trigger: 'blur' }
                    ],

                    Selected3: [
                        { required: true, message: '请选择条目三', trigger: 'change' }
                    ],
                    Answer3: [
                        { required: true, message: '请输入您的答案', trigger: 'blur' },
                        { min: 2,  message: '长度至少 2 个字符', trigger: 'blur' }
                    ],
                    // 旧问题
                    oldAnswer1: [
                        { required: true, message: '请输入您的答案', trigger: 'blur' },
                        { min: 2,  message: '长度至少 2 个字符', trigger: 'blur' }
                    ],
                    oldAnswer2: [
                        { required: true, message: '请输入您的答案', trigger: 'blur' },
                        { min: 2,  message: '长度至少 2 个字符', trigger: 'blur' }
                    ],
                    oldAnswer3: [
                        { required: true, message: '请输入您的答案', trigger: 'blur' },
                        { min: 2,  message: '长度至少 2 个字符', trigger: 'blur' }
                    ],
                    // 新安全中心
                    newSelected1: [
                        { required: true, message: '请选择条目一', trigger: 'change' }
                    ],
                    newAnswer1: [
                        { required: true, message: '请输入您的答案', trigger: 'blur' },
                        { min: 2,  message: '长度至少 2 个字符', trigger: 'blur' }
                    ],
                    newSelected2: [
                        { required: true, message: '请选择条目二', trigger: 'change' }
                    ],
                    newAnswer2: [
                        { required: true, message: '请输入您的答案', trigger: 'blur' },
                        { min: 2,  message: '长度至少 2 个字符', trigger: 'blur' }
                    ],

                    newSelected3: [
                        { required: true, message: '请选择条目三', trigger: 'change' }
                    ],
                    newAnswer3: [
                        { required: true, message: '请输入您的答案', trigger: 'blur' },
                        { min: 2,  message: '长度至少 2 个字符', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入您的回答', trigger: 'blur' },
                        { min: 4, max: 6, message: '长度在 4 到 6 个字符', trigger: 'blur' }
                    ],
                    // 忘记密码
                    tel: [
                        { required: true, message: '请输入手机号' },
                        { type: 'number', message: '手机号必须为数字' }
                    ],
                    number: [
                        { required: true, message: '请输入验证码' },
                        { type: 'number', message: '验证码必须为数字' }
                    ],
                    // 修改密码
                    oldAnswer1s: [
                        { required: true, message: '请输入您的答案', trigger: 'blur' },
                        { min: 2,  message: '长度至少 2 个字符', trigger: 'blur' }
                    ],
                    oldAnswer2s: [
                        { required: true, message: '请输入您的答案', trigger: 'blur' },
                        { min: 2,  message: '长度至少 2 个字符', trigger: 'blur' }
                    ],
                    oldAnswer3s: [
                        { required: true, message: '请输入您的答案', trigger: 'blur' },
                        { min: 2,  message: '长度至少 2 个字符', trigger: 'blur' }
                    ],
                    oldpassword: [
                        { required: true, message: '请输入您的旧密码', trigger: 'blur' },
                        { min: 2,  message: '长度至少 2 个字符', trigger: 'blur' }
                    ],
                    newpassword: [
                        { required: true, message: '请输入您的新密码', trigger: 'blur' },
                        { min: 2,  message: '长度至少 2 个字符', trigger: 'blur' }
                    ],
                    // 保障金
                    utcrAccount: [
                        { required: true, message: '请输入提现金额' },
                        { required: true, message: '请输入收款账号' }
                    ],
                    utcrMoney: [
                        { required: true, message: '请输入提现账号' },
                        { type: 'number', message: '提现账号必须为数字值' }
                    ],

                    // 我的钱包
                    // 保障金
                    messageMoney: [
                        { required: true, message: '请输入金额'},
                        { type: 'number', message: '金额必须为数字值'}
                    ],


                    // 解冻保障金
                    SomMoney: [
                        { required: true, message: '请输入金额' },
                        { type: 'number', message: '保障金必须为数字值' }
                    ],

                },

            // 弹框数据
                // 账户信息
                accountInfo:{},
                accountInfoDisable:false,
                // 商户信息
                merchantInfos:{
                    name:'王瑞'
                },
                // 安全中心
                SecurityC:{
                    Selected1: '',
                    Answer1:'',
                    Selected2: '',
                    Answer2:'',
                    Selected3: '',
                    Answer3:'',
                },
                // old安全中心
                oldSecurityC:{
                    oldAnswer1:'',
                    oldAnswer2:'',
                    oldAnswer3:'',
                    newSelected1:'',
                    newSelected2:'',
                    newSelected3:'',
                    newAnswer1:'',
                    newAnswer2:'',
                    newAnswer3:'',
                },
                // 忘记密码
                forgetPass:{
                    tel:''
                },
                // 验证码
                CAPTCHA:'',

                // 修改密码
                modifyPass:{
                    oldAnswer1s:'',
                    oldAnswer2s:'',
                    oldAnswer3s:'',
                    oldpassword:'',
                    newpassword:''
                },
                // 我的钱包
                MyMoney:[],
                // 订单号
                orderPayCode:'',
                //支付交易号
                tradeNo:'',
                // 支付方式
                _event:'',
                //二维码码串
                code:'',
                paymentImg:[],

                // 保障金

                payMoneys:{
                    // 输入的保障金金额
                    messageMoney:'',
                    // 付款方式
                    resource: '',
                },
                paymentMoneyImg:"http://cfkjcommon1.oss-cn-beijing.aliyuncs.com/test/common/2.jpg",

                // 解冻保障金
                ThawMoneys:{
                    SomMoney:''
                },


                // 提现
                carryMoneys:{
                    utcrMoney: '',
                    psId: '支付宝支付',
                    utcrAccount: '',
                },
            // 是否显示弹框
                // 账户信息
                accountInformationPopup:false,
                // 商户信息
                merchantInfoPopup:false,
                // 安全中心
                SecurityCenterPopup:false,
                // 安全中心s
                SecurityCenterPopups:false,
                // 忘记密码
                forgetPasswordPopup:false,
                // 忘记密码
                modifyPasswordPopup:false,
                // 我的钱包
                MywalletPopup: false,
                // 我的钱包--缴纳保障金
                payMoneyPopup: false,
                // 我的钱包--解冻保障金
                ThawMoneyPopup: false,
                // 我的钱包--申请提现
                carryMoneyPopup: false,
                // 我的钱包--提现记录
                recordMoneyPopup: false,
                

                // // 系统公告
                // SystemBulletin:false,
                // // 账户信息
                // accountInformation:false,
            }
        },
        methods: {


// ===============================================

        // 清空商户宣传图
        clearStorePics() {
                this.accountInfo.storePics = [];
                this.StorePic = [];
                this.files = [];
                this.StorePicDisabled=true;
        },    

        // 删除预览图片
        handleRemove(file, fileList) {
            // 将删除的添加到数组
            this.delFileList.push(file)
            // console.log(fileList);
            // console.log(file);
            for(var i=0;i<this.accountInfo.storePics.length;i++){
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
            // console.log(file)
            // console.log(fileList)
            // 剩余图片
            this.mainFileList=fileList
            // console.log(this.fileList)
        },


        add() {
            this.$refs.file.click()
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
        removes(index) {
            this.files.splice(index, 1)
            this.StorePic.splice(this.accountInfo.storePics.length + index,1)
        },
        fileChanged() {
            if(4 < this.StorePic.length) {
                    this.$notify.error({
                                title: '失败',
                                message: '添加失败，商户宣传图片最多上传5张！',
                                type: 'error'
                            }); 
                            return;
            }
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
                    this.StorePic.push(item);
                }
            }
            this.StorePicDisabled=false;
            this.$refs.file.value = ''
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


// ===============================================


            getDataList:function(n1){
                this.accountInfo={}
                // console.log(this.userInfo)
                // 获取系统公告列表接口
                axios.post(api.api.url+n1,qs.stringify({
                    uId:this.userInfo.uId,
                    sId:this.userInfo.sId,
                }),{emulateJSON: true},
                {
                headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                }
                ).then(reponse=>{
                    // console.log(reponse.data)
                    if(reponse.data.data!=null){
                        this.accountInfoDisable=false
                        this.accountInfo=reponse.data.data
                        if(reponse.data.data.storePics.length!=0) {
                            this.StorePicDisabled=false;
                            for(let i = 0; i < reponse.data.data.storePics.length; i++) {
                                var item = {name:'',src:''};
                                item.src = reponse.data.data.storePics[i].url;
                                item.name = reponse.data.data.storePics[i].pNo;
                                this.StorePic.push(item);
                            }
                        } else {
                            this.StorePicDisabled=true;
                        }
                    }else{
                        this.accountInfoDisable=true
                        this.$notify.error({
                            title: '错误',
                            message: reponse.data.errorString,
                            type: 'error'
                        });   
                    }
                }) 
            },
            getData:function(){
                axios.post(api.api.url+'msGetStatusOfSafetyQuestions',qs.stringify({
                    uId:this.userInfo.uId,
                }),{emulateJSON: true},
                {
                headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                }
                ).then(reponse=>{
                    // if(reponse.data.data.status=='false'){
                    //    this.forgetPasswordHide=false
                    // }else{
                    //     this.forgetPasswordHide=true
                    // }
                })    

            },

            // 获取所有问题接口
            getProblemData(){
                axios.post(api.api.url+'msGetSafetyQuestionsList',qs.stringify({
                    uId:this.userInfo.uId,
                }),{emulateJSON: true},
                {
                headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                }
                ).then(reponse=>{
                    // console.log(reponse.data.data)
                    // 问题分组problemList
                    for(var i=0;i<reponse.data.data.length;i++){
                        if(reponse.data.data[i].sqPosition==1){
                            this.problemList1.push(reponse.data.data[i])
                        }else if(reponse.data.data[i].sqPosition==2){
                            this.problemList2.push(reponse.data.data[i])
                        }else if(reponse.data.data[i].sqPosition==3){
                            this.problemList3.push(reponse.data.data[i])
                        }
                    }
                })                     
            },

            // 获取以设置的问题   
            setProblemData(){
                axios.post(api.api.url+'msGetSafetyQuestionOfUser',qs.stringify({
                    uId:this.userInfo.uId,
                }),{emulateJSON: true},
                {
                headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                }
                ).then(reponse=>{
                    // console.log(reponse.data.data)
                    this.oldproblemList1=(reponse.data.data[0].sqName)
                    this.oldproblemList2=(reponse.data.data[1].sqName)
                    this.oldproblemList3=(reponse.data.data[2].sqName)
                })
            },

            // 提交问题
            Submission(q1,q2,q3,q4,q5,q6){
                axios.post(api.api.url+'msSetSafetyQuestionForUser',qs.stringify({
                    uId:this.userInfo.uId,
                    firstSqId:q1,
                    firstSqAnswer:q2,
                    secondSqId:q3,
                    secondSqAnswer:q4,
                    thirdSqId:q5,
                    thirdSqAnswer:q6,
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
                                message: '设置成功！',
                                type: 'success'
                            });
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
            },

            // 账户信息按钮
            accountInformation(){
                this.accountInformationPopup=true;
                if(this.userInfo.urName=='个人商户'){
                    this.getDataList('msGetPersonalStoreInfoBySid')
                }else if(this.userInfo.urName=='企业商户'){
                    this.getDataList('msGetCompanyStoreInfoBySid')
                } 
            },

            // 当商户地址失去焦点时的事件
            // http://restapi.amap.com/v3/geocode/geo?address=中华大街信誉楼百货&city=石家庄&output=JSON&key=5171da4ec1beb220053af33e742f7ea0
            blurClick(){
                axios.post('http://restapi.amap.com/v3/geocode/geo',qs.stringify({
                    output:'JSON',
                    key:'5171da4ec1beb220053af33e742f7ea0',
                    city:this.accountInfo.acCity,
                    address:this.accountInfo.sAddress,
                }),{emulateJSON: true},
                {
                headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                }
                ).then(reponse=>{
                    // 获取经纬度
                    console.log(reponse.data.geocodes[0].location)
                    // 更改经纬度
                    this.accountInfo.sLon=(reponse.data.geocodes[0].location).split(',')[0]
                    this.accountInfo.sLat=(reponse.data.geocodes[0].location).split(',')[1]
                }) 
            },


            // 账号信息提交
            submitInfo(accountInfo){
                var Pic,ppic,picData,ppics=''
                var ppTagClassChecked=''
                var AllClassChecked=[]
                var AClassChecked=[]
                var ppIds=''  
                this.Imgs=[]
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
                    const storeAs = api.api.MerchantImg+obj+suffix
                    this.Imgs.push(obj+suffix)
                    client.multipartUpload(storeAs, f).then(function (result){
                        // console.log(result.res.requestUrls)
                    })
                }

                // 当原始数据为空时
                if(this.accountInfo.storePics.length==0){
                    // console.log(234)
                        // 遍历添加的商户主图
                    for(var i=0;i<this.Imgs.length;i++){
                        ppic+='{"pName": "'+this.Imgs[i]+'","pNo": '+i+'},'
                    }
                        let reg=/,$/gi;
                        ppic=ppic.replace(reg,"");
                        ppic=ppic.substring(9)
                        picData='{"pTag": "'+this.accountInfo.pTag+'","pics": ['+ppic+']}'
                        // console.log(picData)                             
                }else{
                    // 如果原始数据不为空时
                        // 如果添加了数据
                    if(this.Imgs.length!=0){
                        // 遍历添加的数据
                        for(var i=0;i<this.Imgs.length;i++){
                            // let a=(this.mainFileList.length)+i
                            // ppics+='{"pName": "'+this.Imgs[i]+'","pNo": '+a+'},'

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
                                    let a=(this.accountInfo.storePics.length)+i
                                    ppics+='{"pName": "'+this.Imgs[i]+'","pNo": '+a+'},'  

                                }
                                // console.log(ppics)
                            } 
                        }
                        // console.log(ppics)
                        // 判断有没有删除
                        if(this.delFileList.length==0){
                            // 如没有删除
                                // 遍历原始数据
                            for(var i=0;i<this.accountInfo.storePics.length;i++){
                                ppic+='{"pName": "'+((this.accountInfo.storePics[i].url).substring(52))+'","pNo": '+this.accountInfo.storePics[i].pNo+'},'
                            }
                            let reg=/,$/gi;
                            ppic=ppic.replace(reg,"");
                            ppic=ppic.substring(9)
                        }else{
                            // 如果有删除遍历剩余
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
                        picData='{"pTag": "'+this.accountInfo.pTag+'","pics": ['+ppics+ppic+']}'
                        // console.log(picData)  
                    }else{
                        // 如果没有添加数据并且删除
                        if(this.delFileList.length!=0){
                            // 遍历剩余数据
                            // console.log(this.mainFileList)
                            if(this.mainFileList.length!=0){
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
                            picData='{"pTag": "'+this.accountInfo.pTag+'","pics": ['+ppic+']}'
                            // console.log(picData) 
                            
                        }else{
                                // 遍历原始数据
                            for(var i=0;i<this.accountInfo.storePics.length;i++){
                                ppic+='{"pName": "'+((this.accountInfo.storePics[i].url).substring(52))+'","pNo": '+this.accountInfo.storePics[i].pNo+'},'
                            }
                            let reg=/,$/gi;
                            ppic=ppic.replace(reg,"");
                            ppic=ppic.substring(9)
                            picData='{"pTag": "'+this.accountInfo.pTag+'","pics": ['+ppics+ppic+']}'
                        }
                    }
                }
                // console.log(picData) 


                if(this.userInfo.urName=='个人商户'){
                    axios.post(api.api.url+'msChangePersonalStoreInfoBySid',qs.stringify({
                        uId:this.userInfo.uId,
                        sId:this.userInfo.sId,
                        sDescribe:this.accountInfo.sDescribe,
                        sTel:this.accountInfo.sTel,
                        sAddress:this.accountInfo.sAddress,
                        sLon:this.accountInfo.sLon,
                        sLat:this.accountInfo.sLat,
                        picData:picData,
                    }),{emulateJSON: true},
                    {
                    headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                    }
                    ).then(reponse=>{
                        if(reponse.data.flag=='true') {
                            if(reponse.data.data.status=='true') {
                                this.accountInformationPopup=false;
                                this.Imgs=[]
                                this.files=[]
                                this.getData()
                                ppic=''
                                ppics=''
                                picData=''
                                this.$notify({
                                    title: '成功',
                                    message: '修改成功！',
                                    type: 'success'
                                });
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
                }else if(this.userInfo.urName=='企业商户'){
                    axios.post(api.api.url+'msChangeCompanyStoreInfoBySid',qs.stringify({
                        uId:this.userInfo.uId,
                        sId:this.userInfo.sId,
                        sDescribe:this.accountInfo.sDescribe,
                        sTel:this.accountInfo.sTel,
                        sAddress:this.accountInfo.sAddress,
                        sLon:this.accountInfo.sLon,
                        sLat:this.accountInfo.sLat,
                        picData:picData,
                    }),{emulateJSON: true},
                    {
                    headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                    }
                    ).then(reponse=>{
                        if(reponse.data.flag=='true') {
                            if(reponse.data.data.status=='true') {
                                this.accountInformationPopup=false;
                                this.Imgs=[]
                                this.files=[]
                                this.getData()
                                ppic=''
                                ppics=''
                                picData=''
                                this.$notify({
                                    title: '成功',
                                    message: '修改成功！',
                                    type: 'success'
                                });
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

            },

            // 安全中心未设置
            SecurityCenter(){
                axios.post(api.api.url+'msGetStatusOfSafetyQuestions',qs.stringify({
                    uId:this.userInfo.uId,
                }),{emulateJSON: true},
                {
                headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                }
                ).then(reponse=>{
                    if(reponse.data.data.status=='false'){
                        this.SecurityCenterPopup=true
                        this.getProblemData()
                    }else{
                        this.SecurityCenterPopups=true
                        this.setProblemData()
                    }
                })                 
            },

            // 安全中心未设置提交答案
            submitAnswer(SecurityC){
                this.$refs[SecurityC].validate((valid) => {
                    if(valid){
                        // console.log(this.SecurityC)
                        this.Submission(this.SecurityC.Selected1,this.SecurityC.Answer1,this.SecurityC.Selected2,this.SecurityC.Answer2,this.SecurityC.Selected3,this.SecurityC.Answer3)
                        this.SecurityCenterPopup=false
                        this.$refs[modifyPass].resetFields();
                    }
                })
            },

            // 安全中心未设置
            // 关闭按钮
            SecurityCresetForm(SecurityC){
                this.$refs[SecurityC].resetFields();
                this.SecurityCenterPopup=false
            },
            // 关闭按钮
            SecurityCcloseDialog(SecurityC){
                this.$refs[SecurityC].resetFields();
                this.SecurityCenterPopup=false
            },




            // 修改安全中---当输入信息有误时，触发input时更改“验证”的状态
            focusClick(){
                this.primaryColor='primary'
                this.VerificationTitle='验证'
            },


            // 验证
            Verification(oldSecurityC){
                this.$refs[oldSecurityC].validate((valid) => {
                    if(valid){
                        axios.post(api.api.url+'msCheckSafetyQuestionOfUser',qs.stringify({
                            uId:this.userInfo.uId,
                            questionData:'{"data": [{"sqAnswer": "'+this.oldSecurityC.oldAnswer1+'","sqPosition": 1}, {"sqAnswer": "'+this.oldSecurityC.oldAnswer2+'","sqPosition": 2}, {"sqAnswer": "'+this.oldSecurityC.oldAnswer3+'","sqPosition": 3}]}'
                        }),{emulateJSON: true},
                        {
                        headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                        }
                        ).then(reponse=>{
                            // console.log(reponse.data.data)
                            if(reponse.data.data.status=='true'){
                                this.getProblemData()
                                this.primaryColor='success'
                                this.VerificationTitle='验证通过'
                                this.oldDisabled=true
                                this.blockBox=true
                            }else{
                                this.primaryColor='danger'
                                this.VerificationTitle='信息有误'
                            }
                        }) 
                    }
                })
            },

            // 修改安全验证
            NewsubmitForm(oldSecurityC){
                this.$refs[oldSecurityC].validate((valid) => {
                    if(valid){
                        // console.log(this.oldSecurityC)
                        this.Submission(this.oldSecurityC.newSelected1,this.oldSecurityC.newAnswer1,this.oldSecurityC.newSelected2,this.oldSecurityC.newAnswer2,this.oldSecurityC.newSelected3,this.oldSecurityC.newAnswer3)
                        this.$refs[oldSecurityC].resetFields();
                        this.SecurityCenterPopups=false
                        this.getData()
                        this.primaryColor='primary'
                        this.VerificationTitle='验证'
                        this.blockBox=false
                        this.oldDisabled=false
                   }
                })
            },

            // 修改安全关闭
            oldSecurityCresetForm(oldSecurityC){
                this.oldSecurityC.oldAnswer1=''
                this.oldSecurityC.oldAnswer2=''
                this.oldSecurityC.oldAnswer3=''
                this.oldDisabled=false
                this.primaryColor='primary'
                this.VerificationTitle='验证'
                this.blockBox=false
                this.oldSecurityC.newAnswer1=''
                this.oldSecurityC.newAnswer2=''
                this.oldSecurityC.newAnswer3=''
                this.$refs[oldSecurityC].resetFields();
                this.SecurityCenterPopups=false                
            },
            // 修改安全关闭
            oldSecurityCcloseDialog(oldSecurityC){
                this.oldSecurityC.oldAnswer1=''
                this.oldSecurityC.oldAnswer2=''
                this.oldSecurityC.oldAnswer3=''
                this.oldDisabled=false
                this.primaryColor='primary'
                this.VerificationTitle='验证'
                this.blockBox=false
                this.oldSecurityC.newAnswer1=''
                this.oldSecurityC.newAnswer2=''
                this.oldSecurityC.newAnswer3=''
                this.$refs[oldSecurityC].resetFields();
                this.SecurityCenterPopups=false                
            },


            // 修改密码
            modifyPassword(){
                this.SelectedPopup=true           
            },

            // 手机号与验证码验证方式
            checkedForm(){
                // console.log(this.selectedRadio)
                if(this.selectedRadio=='2'){
                    this.SelectedPopup=false
                    // 通过验证方式修改密码     获取已经设置的安全问题
                    // 获取以设置的问题                
                    axios.post(api.api.url+'msGetSafetyQuestionOfUser',qs.stringify({
                        uId:this.userInfo.uId,
                    }),{emulateJSON: true},
                    {
                    headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                    }
                    ).then(reponse=>{
                        // console.log(reponse.data.data)
                        if(reponse.data.data==''){
                            this.$notify.error({
                                title: '错误',
                                message: "您还没有设置安全问题！",
                                type: 'error'
                            });
                        }else{
                            this.modifyPasswordPopup=true
                            this.oldproblemList1=(reponse.data.data[0].sqName)
                            this.oldproblemList2=(reponse.data.data[1].sqName)
                            this.oldproblemList3=(reponse.data.data[2].sqName)
                        }
                    })                    
                }else{
                    this.forgetPasswordPopup=true
                    this.SelectedPopup=false
                }
            },

            // 忘记密码
            forgetPassword(){
                this.SelectedPopup=true    
            },

            // 发送按钮倒计时
            sendMsg() {  
                if(this.forgetPass.tel!=''){
                    // 判断输入的手机号是否当前登录的手机号
                    if(this.forgetPass.tel==this.userInfo.account) {
                        // console.log(this.forgetPass)
                    let me = this;  
                    // console.log(this)
                    me.isDisabled = true;  
                     
                    var interval = window.setInterval(function() {  
                        me.buttonName = '(' + me.time + '秒)后重新发送';  
                        --me.time;  
                        if(me.time < 0) {  
                            me.buttonName = "获取验证码";  
                            me.time = 60;  
                            me.isDisabled = false;  
                            window.clearInterval(interval);  
                        }  
                    }, 1000);   
                    axios.post(api.api.url+'getCaptcha',qs.stringify({
                        uTel:this.forgetPass.tel,
                    }),{emulateJSON: true},
                    {
                    headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                    }
                    ).then(reponse=>{
                        // console.log(reponse.data.data.CAPTCHA)
                        this.CAPTCHA=reponse.data.data.CAPTCHA
                    }) 
                    } else {
                        this.$notify.error({
                            title: '失败',
                            message: '输入的手机号非当前登录的账号！！！',
                            type: 'error'
                        });  
                    }
                    
                }else{
                    this.$notify.error({
                        title: '失败',
                        message: '请输入您的手机号！！！',
                        type: 'error'
                    });                    
                }
                
            } ,
            
            // 手机号验证
            TelresetForm(forgetPass){
                this.$refs[forgetPass].validate((valid) => {
                    if(valid){
                        if(this.forgetPass.number==this.CAPTCHA){
                            this.TelprimaryColor='success'
                            this.TelVerification='验证通过'
                            this.TelDisabled=true
                            this.isDisabled=true
                            this.Telblock=true
                        }else{
                            this.TelprimaryColor='danger'
                            this.TelVerification='验证码错误'
                        }
                    }
                })
            },

            // 手机号验证提交
            TelsubmitForm(forgetPass){
                this.$refs[forgetPass].validate((valid) => {
                    if(valid){
                        // console.log(this.forgetPass)
                        axios.post(api.api.url+'msChangePassword',qs.stringify({
                            uId:this.userInfo.uId,
                            oldPassword:this.forgetPass.oldpassword,
                            newPassword:this.forgetPass.newpassword,
                        }),{emulateJSON: true},
                        {
                        headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                        }
                        ).then(reponse=>{
                            // console.log(reponse)
                            if(reponse.data.flag=='true') {
                                if(reponse.data.data.status=='true'){
                                    
                                    this.$notify({
                                        title: '成功',
                                        message: '修改成功！',
                                        type: 'success'
                                    });
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
                            this.forgetPasswordPopup=false
                            this.$refs[forgetPass].resetFields();
                            
                        }) 
                    }
                })
            },

            // 手机号取消验证
            forgetPassresetForm(forgetPass){
                // 忘记密码
                this.forgetPasswordPopup=false
                this.forgetPass.tel=''
                this.forgetPass.number=''
                this.TelDisabled=false
                this.TelprimaryColor='primary'
                this.TelVerification='验证'
                this.Telblock=false
                this.forgetPass.oldpassword=''
                this.forgetPass.newpassword=''
                this.buttonName='获取验证码'
                this.isDisabled=false
                this.$refs[forgetPass].resetFields();
                this.forgetPasswordPopup=false   
                // window.clearInterval(this.interval);
            },

            // 手机号取消验证
            forgetPasscloseDialog(forgetPass){
                // 忘记密码
                this.forgetPasswordPopup=false
                this.forgetPass.tel=''
                this.forgetPass.number=''
                this.TelDisabled=false
                this.TelprimaryColor='primary'
                this.TelVerification='验证'
                this.Telblock=false
                this.forgetPass.oldpassword=''
                this.forgetPass.newpassword=''
                this.buttonName='获取验证码'
                this.isDisabled=false
                this.$refs[forgetPass].resetFields();
                this.forgetPasswordPopup=false   
                // window.clearInterval(this.interval);
            },


            // 安全问题验证
            Verifications(modifyPass){
                this.$refs[modifyPass].validate((valid) => {
                    if(valid){
                        axios.post(api.api.url+'msCheckSafetyQuestionOfUser',qs.stringify({
                            uId:this.userInfo.uId,
                            questionData:'{"data": [{"sqAnswer": "'+this.modifyPass.oldAnswer1s+'","sqPosition": 1}, {"sqAnswer": "'+this.modifyPass.oldAnswer2s+'","sqPosition": 2}, {"sqAnswer": "'+this.modifyPass.oldAnswer3s+'","sqPosition": 3}]}'
                        }),{emulateJSON: true},
                        {
                        headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                        }
                        ).then(reponse=>{
                            // console.log(reponse.data.data)
                            if(reponse.data.data.status=='true'){
                                this.primaryColors='success'
                                this.VerificationTitles='验证通过'
                                this.oldDisableds=true
                                this.blockBoxs=true
                            }else{
                                this.primaryColors='danger'
                                this.VerificationTitles='信息有误'
                            }
                        }) 
                    }
                })
            },
            // 安全问题验证
            newsubmitForm(modifyPass){
                this.$refs[modifyPass].validate((valid) => {
                    if(valid){
                        // console.log(this.modifyPass)
                        axios.post(api.api.url+'msChangePassword',qs.stringify({
                            uId:this.userInfo.uId,
                            oldPassword:this.modifyPass.oldpassword,
                            newPassword:this.modifyPass.newpassword,
                        }),{emulateJSON: true},
                        {
                        headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                        }
                        ).then(reponse=>{
                            // console.log(reponse)
                            if(reponse.data.flag=='true') {
                                if(reponse.data.data.status=='true'){
                                    
                                    this.$notify({
                                        title: '成功',
                                        message: '修改成功！',
                                        type: 'success'
                                    });
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
                            this.$refs[modifyPass].resetFields();
                            this.modifyPasswordPopup=false 
                        }) 
                    }
                })
            },
            // 安全中心关闭
            modifyPassresetForm(modifyPass){
                // 忘记密码
                this.SelectedPopup=false
                this.modifyPasswordPopup=false
                this.modifyPass.oldAnswer1s=''
                this.modifyPass.oldAnswer2s=''
                this.modifyPass.oldAnswer3s=''
                this.oldDisableds=false
                this.modifyPass.oldpassword='' 
                this.modifyPass.newpassword='' 
                this.primaryColors='primary'
                this.VerificationTitles='验证'
                this.blockBoxs=false
                this.$refs[modifyPass].resetFields();
                this.modifyPasswordPopup=false   
            },
            // 安全中心关闭
            modifyPasscloseDialog(modifyPass){
                // 忘记密码
                this.SelectedPopup=false
                this.modifyPasswordPopup=false
                this.modifyPass.oldAnswer1s=''
                this.modifyPass.oldAnswer2s=''
                this.modifyPass.oldAnswer3s=''
                this.oldDisableds=false
                this.modifyPass.oldpassword='' 
                this.modifyPass.newpassword='' 
                this.primaryColors='primary'
                this.VerificationTitles='验证'
                this.blockBoxs=false
                this.$refs[modifyPass].resetFields();
                this.modifyPasswordPopup=false   
            },

            // 我的钱包
            Mywallet(){
                this.MywalletPopup=true
                // 获取我的金额
                axios.post(api.api.url+'msGetMyWallet',qs.stringify({
                    uId:this.userInfo.uId,
                    sId:this.userInfo.sId,
                }),{emulateJSON: true},
                {
                headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                }
                ).then(reponse=>{
                    // console.log(reponse.data.data)
                    this.MyMoney=reponse.data.data
                }) 
                // 获取支付方式
                axios.post(api.api.url+'msGetPayStyleList',qs.stringify({
                    uId:this.userInfo.uId,
                }),{emulateJSON: true},
                {
                headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                }
                ).then(reponse=>{
                    // console.log(reponse.data.data)
                    this.paymentImg=reponse.data.data
                }) 

                // 获取订单号
                axios.post(api.api.url+'getOrderPayCode',qs.stringify({
                    uId:this.userInfo.uId,
                }),{emulateJSON: true},
                {
                headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                }
                ).then(reponse=>{
                    // console.log(reponse.data.data.payCode)
                    this.orderPayCode=reponse.data.data.payCode
                }) 
                
            },

            // 我的钱包--缴纳保障金
            payMoney(){
                this.payMoneyPopup=true
                this.paymentMoneyImg="http://cfkjcommon1.oss-cn-beijing.aliyuncs.com/test/common/2.jpg"
            },

            focusChecked(){
                // 触发焦点时清空数据
                this.payMoneys.resource=''
                this.clearCanvas()
            },

            // 选择支付方式
            checkedImg(event){
                console.log(event)
                this._event=event
                // 判断金额是否为空
                if(this.payMoneys.messageMoney!=''){
                    if(event=='微信支付'){
                        // console.log(this.payMoneys.messageMoney)
                        this.WeChatpayment('wxPayUnifiedOrder')
                    }else if(event=='支付宝支付'){
                        this.WeChatpayment('ailPayUnifiedOrder')
                    }
                    this.myTimesA()
                }else{
                    clearTimeout(window.myTimeOut);
                }
            },

            // 支付方式
            WeChatpayment(m1){
                axios.post(api.api.url+m1,qs.stringify({
                    uId:this.userInfo.uId,
                    // sId:this.userInfo.sId,
                    // 支付订单号
                    payCode:this.orderPayCode,
                    // 支付总金额
                    totalMoney:this.payMoneys.messageMoney,
                    // 订单类型
                    orderType:2,
                    // 平台类型
                    appType:2,
                    // 订单详情数据
                    orderData:'',
                }),{emulateJSON: true},
                {
                headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                }
                ).then(reponse=>{
                    console.log(reponse.data)
                     if(this._event=="微信支付"){
                        this.code=reponse.data.data.code_url
                     }else if(this._event=="支付宝支付"){
                        this.code=reponse.data.data.qr_code
                     }
                }) 
            },

            // 监听支付是否成功
            myTimesA: function() {
                window.myTimeOut=setInterval(() => { 
                    if(this._event=="微信支付"){
                        this.myTimesB('wxPayOrderQuery')
                    }else if(this._event=="支付宝支付"){
                        this.myTimesB('aliPayOrderQuery')
                    }
                }, 2000)
            },
            myTimesB:function(n1){
                axios.post(api.api.url+n1,qs.stringify({
                    uId:this.userInfo.uId,
                    // 支付订单号
                    payCode:this.orderPayCode,
                    //支付交易号
                    tradeNo:this.orderPayCode,
                    // 支付总金额
                    totalMoney:this.payMoneys.messageMoney,
                    // 订单类型
                    orderType:2,
                    // 平台类型
                    appType:2,
                    // 订单详情数据
                    orderData:'{"sId": "'+this.userInfo.sId+'"}',
                }),{emulateJSON: true},
                {
                headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                }
                ).then(reponse=>{
                    if(reponse.data.data.status=='true'){
                        this.Mywallet()
                        var c=document.getElementById("canvas");  
                        var cxt=c.getContext("2d");  
                        cxt.fillStyle="pink";  
                        cxt.beginPath();  
                        cxt.fillRect(0,0,c.width,c.height);  
                        cxt.closePath();  
                        clearTimeout(window.myTimeOut);
                        this._event=''
                        this.payMoneyPopup=false  
                        this.payMoneys.resource=''
                        this.payMoneys.messageMoney=''
                        this.$notify({
                            title: '成功',
                            message: '支付成功！',
                            type: 'success'
                        });   
                    }
                })

            },


            // 选择支付方式后的关闭按钮
            payMoneysresetForm(payMoneys){
                clearTimeout(window.myTimeOut);
                this._event=''
                // 我的钱包--缴纳保障金
                this.clearCanvas()
                this.$refs[payMoneys].resetFields();
                this.payMoneyPopup=false                
            },
            // 选择支付方式后的关闭按钮
            payMoneyscloseDialog(payMoneys){
                clearTimeout(window.myTimeOut);
                this._event=''
                // this.$notify.error({
                //     title: '错误',
                //     message: '您已经取消支付保障金！'
                // }); 
            
                this.clearCanvas()
                // 我的钱包--缴纳保障金
                this.payMoneys.resource=''
                this.$refs[payMoneys].resetFields();
                this.payMoneyPopup=false     
                
                
                
            },

            
            // 我的钱包--解冻保障金
            ThawMoney(){
                this.ThawMoneyPopup=true
            },
            

            // 解冻保障金提交按钮
            submitThawMoneysClick(ThawMoneys){
                this.$refs[ThawMoneys].validate((valid) => {
                    if(valid){
                        axios.post(api.api.url+'msApplyToFreeForDepositRecord',qs.stringify({
                            uId:this.userInfo.uId,
                            sId:this.userInfo.sId,
                            udrMoney:this.ThawMoneys.SomMoney,
                        }),{emulateJSON: true},
                        {
                        headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                        }
                        ).then(reponse=>{
                            // console.log(reponse)
                            if(reponse.data.data.status=='true'){
                                this.$notify({
                                    title: '成功',
                                    message: '成功解冻保障金！',
                                    type: 'success'
                                }); 
                            }else{
                                this.$notify.error({
                                    title: '错误',
                                    message: reponse.data.data.errorString,
                                    type: 'error'
                                });    
                            }
                            this.ThawMoneyPopup=false;
                            this.Mywallet()

                        }) 
                    }
                })
            },
            // 解冻保障金关闭按钮
            ThawMoneysClick(ThawMoneys){
                this.$refs[ThawMoneys].resetFields();
                this.ThawMoneyPopup=false
                this.ThawMoneys.SomMoney=''
            },
            // 解冻保障金关闭按钮
            ThawMoneyscloseDialog(ThawMoneys){
                this.$refs[ThawMoneys].resetFields();
                this.ThawMoneyPopup=false
                this.ThawMoneys.SomMoney=''
            },
            


            // 我的钱包--申请提现
            carryMoney(){
                this.carryMoneyPopup=true
            },
            // 确定提现
            submitpayment(carryMoneys){
                this.$refs[carryMoneys].validate((valid) => {
                    if(valid){
                        var _psId = '';
                        for(var i = 0; i < this.paymentImg.length; i++) {
                            if(this.paymentImg[i].psName==this.carryMoneys.psId) {
                                _psId = this.paymentImg[i].psId;
                            }
                        }
                        axios.post(api.api.url+'msApplyToCash',qs.stringify({
                            uId:this.userInfo.uId,
                            sId:this.userInfo.sId,
                            psId:_psId,
                            utcrMoney:this.carryMoneys.utcrMoney,
                            utcrAccount:this.carryMoneys.utcrAccount,
                        }),{emulateJSON: true},
                        {
                        headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                        }
                        ).then(reponse=>{
                            // console.log(reponse)
                            if(reponse.data.flag=='true') {
                                if(reponse.data.data.status=='true') {
                                    this.carryMoneyPopup=false
                                    this.$refs[carryMoneys].resetFields();
                                    // 获取我的金额
                                    axios.post(api.api.url+'msGetMyWallet',qs.stringify({
                                    uId:this.userInfo.uId,
                                    sId:this.userInfo.sId,
                                    }),{emulateJSON: true},
                                {
                                headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                                }
                                ).then(reponse=>{
                                 // console.log(reponse.data.data)
                                this.MyMoney=reponse.data.data
                                }) 
                                // 获取支付方式
                                axios.post(api.api.url+'msGetPayStyleList',qs.stringify({
                                    uId:this.userInfo.uId,
                                }),{emulateJSON: true},
                                {
                                headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                                }
                                ).then(reponse=>{
                                    // console.log(reponse.data.data)
                                    this.paymentImg=reponse.data.data
                                }) 

                                // 获取订单号
                                axios.post(api.api.url+'getOrderPayCode',qs.stringify({
                                    uId:this.userInfo.uId,
                                }),{emulateJSON: true},
                                {
                                headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",} 
                                }
                                ).then(reponse=>{
                                    // console.log(reponse.data.data.payCode)
                                    this.orderPayCode=reponse.data.data.payCode
                                })
                                    this.$notify({
                                        title: '成功',
                                        message: '申请提现成功!',
                                        type: 'success'
                                    });
                                } else {
                                    this.$notify.error({
                                    title: '错误',
                                    message: reponse.data.data.errorString,
                                    type: 'error'
                                    });
                                }
                            } else {
                                this.$notify.error({
                                    title: '错误',
                                    message: reponse.data.errorString,
                                    type: 'error'
                                
                                });
                            }
                        }) 
                    }
                })
            },
            // 提现关闭按钮
            carryMoneysresetForm(carryMoneys){
                // 我的钱包--申请提现
                this.carryMoneys.utcrAccount=''
                this.carryMoneys.utcrMoney=''
                this.$refs[carryMoneys].resetFields();
                this.carryMoneyPopup=false
            },
            // 提现关闭按钮
            carryMoneyscloseDialog(carryMoneys){
                // 我的钱包--申请提现
                this.carryMoneys.utcrAccount=''
                this.carryMoneys.utcrMoney=''
                this.$refs[carryMoneys].resetFields();
                this.carryMoneyPopup=false
            },
            

            // 我的钱包--提现记录
            recordMoney(){
                this.recordMoneyPopup=true
                this.$router.push('/presentrecord')
            },

            // 取消按钮
            resetForm(){
                // 账户信息
                this.accountInformationPopup=false
                // 修改密码弹框
                this.SelectedPopup=false;
                this.Imgs=[]
                this.files=[]
                this.StorePic = [];
                this.StorePicDisabled = false;
                this.StoreImgVisible = false;
                ppic=''
                ppics=''
                picData=''
                // 商户信息
                this.merchantInfoPopup=false

                // 我的钱包--提现记录
                this.recordMoneyPopup=false
            },
            AccountinfoCloseDialog(accountInfo) {
                // 账户信息
                this.accountInformationPopup=false
                // 修改密码弹框
                this.SelectedPopup=false;
                this.Imgs=[]
                this.files=[]
                this.StorePic = [];
                this.StorePicDisabled = false;
                this.StoreImgVisible = false;
                ppic=''
                ppics=''
                picData=''
                // 商户信息
                this.merchantInfoPopup=false

                // 我的钱包--提现记录
                this.recordMoneyPopup=false
            },

            // 关闭按钮
            closeDialog(){
                // 账户信息
                this.accountInformationPopup=false
                // 商户信息
                this.merchantInfoPopup=false

                // 我的钱包--提现记录
                this.recordMoneyPopup=false
                
            },
            // 清除画布
            clearCanvas(){  
                var c=document.getElementById("canvas");  
                var cxt=c.getContext("2d");  
                
                cxt.fillStyle="pink";  
                cxt.beginPath();  
                cxt.fillRect(0,0,c.width,c.height);  
                cxt.closePath();  
            },

        },

        
    computed: {
    　　newValue() {
    　　　　 return this.code
    　　}
    },

    // 监听输入的金额实时刷新二维码
    watch:{
        newValue(val){
            // console.log(val)
            var canvas = document.getElementById('canvas')
            QRCode.toCanvas(canvas, val, function (error) {
                // console.log(error)
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
    .setaccount{
        width: 100%;
        // height: 400px;
        overflow: hidden;
        .setaccount-first{
            margin: 40px;
            float: left;
            width:170px;
            height: 170px;
            background-color: #213647;
            overflow: hidden;
            .first-img{
                margin: 0 auto;
                width: 55px;
                height: 55px;
                margin-top: 40px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .first-txt{
                margin: 0 auto;
                margin-top: 15px;
                width: 100px;
                font-size: 18px;
                color:#ffffff;
                text-align: center;
            }
        }
    }

    // 修改
    // .Securitymodify{
    //     .el-dialog{
    //         form{
                .el-form-item{
                    float: left;
                    width:50%;
                    input{
                        width:100%
                    }
                }
    //         }
    //     }
    // }
    // 我的钱包
    .MywalletPopup-top{
        width: 100%;
        text-align: center;
    }
    .MywalletPopup-cont{
        float: left;
        width:50%;
        text-align: center;
    }

.MoneyRecord{
    div{
        margin-top: 20px;
    }
}
.Footer{
    // 按钮
    .dialog-footer{
        float: left;
        width: 50%;
    }
}

.tieleBox{
    // height: 250px;
    .payMoney-left{
        float: left;
        width:70%;
        height: 100%;
    }
    .payMoney-right{
        float: left;
        width:30%;
        height: 100%;
        .payMoney-img{
            margin: 0 auto;
            width:150px;
            height: 150px;
            background-color: pink;
        }
    }
}
// 商户封面图片
.coverImg{
    div{
        margin-top: 10px;
        float: left;
        width:100px;
        height: 100px;
        background-color: red;
        img{
            width: 100%;
            height: 100%;
        }
    }
}


// 图片上传
.vue-uploader .file-list {
    padding: 10px 0px;
    padding-left: 111px;
    
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
// .vue-uploader .add {
//     width: 150px;
//     height: 150px;
//     float: left;
//     text-align: center;
//     line-height: 150px;
//     font-size: 30px;
//     cursor: pointer;
//     background: url(../../assets/upImg.png) no-repeat;
//     background-size: 100% 100%;
// }
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

.el-radio:nth-child(2){
    margin-left: 90px;
}

#canvas{width:100%!important;height:100%!important;}


    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input[type="number"]{
        -moz-appearance: textfield;
    }
</style>
