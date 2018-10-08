<template>
  <div class="navigation">
    <navtitle></navtitle>
    <el-col :span="4" style="height:100%">
      <el-menu default-active="homepage" theme="dark" class="el-menu-vertical-demo" background-color="#545c64" router text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="homepage">
          <i class="el-icon-menu"></i>
          <span slot="title" index="homepage">首页</span>
        </el-menu-item>

        <el-submenu index="2" v-if="this.userInfo.urName!='系统管理员' && this.userInfo.urName!='系统子管理员'">
          <template slot="title">
            <i class="demandorderhomes"></i>
            <span style="margin-left:33px">需求订单</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="demandorderhome" style="padding-left: 70px">需求订单</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4" v-if="this.userInfo.urName=='企业商户'">
          <template slot="title">
            <i class="mygoodshomes"></i>
            <span style="margin-left:33px">我的商品</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="mygoodshome" style="padding-left: 70px">我的商品</el-menu-item>
            <el-menu-item index="addmygoodshome" style="padding-left: 70px">添加商品</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5" v-if="this.userInfo.urName=='企业商户'">
          <template slot="title">
            <i class="goodsorderhomes"></i>
            <span style="margin-left:33px">商品订单</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="goodsorderhome" style="padding-left: 70px">商品订单</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3" v-if="this.userInfo.urName!='系统管理员'&&this.userInfo.urName!='系统子管理员'">
          <template slot="title">
            <i class="setaccounthomes"></i>
            <span style="margin-left:33px">账号管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="setaccounthome" style="padding-left: 70px">账号管理</el-menu-item>
            <el-menu-item index="myarrange" style="padding-left: 70px">我的安排</el-menu-item>
            <!-- <el-menu-item index="presentrecord">提现记录界面</el-menu-item> -->
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="6" v-if="this.userInfo.urName=='系统管理员' || this.userInfo.urName=='系统子管理员'">
          <template slot="title">
            <i class="merchantmanagehome"></i>
            <span style="margin-left:33px">商户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="merchantmanagehome" style="padding-left: 70px">商户管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="7" v-if="this.userInfo.urName=='系统管理员' || this.userInfo.urName=='系统子管理员'">
          <template slot="title">
            <i class="goodsmangehomes"></i>
            <span style="margin-left:33px">商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="goodsmangehome" style="padding-left: 70px">商品管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="8" v-if="this.userInfo.urName=='系统管理员' || this.userInfo.urName=='系统子管理员'">
          <template slot="title">
            <i class="systemhome"></i>
            <span style="margin-left:33px">系统设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="systembulletin" style="padding-left: 70px">系统公告</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="systemjournal" style="padding-left: 70px">操作日志</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="systemopinion" style="padding-left: 70px">反馈意见</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="systemuser" style="padding-left: 70px">用户管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="systemregionmanage" style="padding-left: 70px">区域管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="systemgoodsclass" style="padding-left: 70px">商品类别</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="systemgoodslist" style="padding-left: 70px">商品属性管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="systemuserdrawing" style="padding-left: 70px">商户提现管理</el-menu-item>
          </el-menu-item-group>          
        </el-submenu>
      </el-menu>
    </el-col>
    <el-col :span="20" style="height: 100%;overflow: auto; ">
      <!-- 填充右侧 -->
      <router-view></router-view>
    </el-col>
  </div>
</template>
<script>
  import navtitle from './navtitle'
  export default {
    data() {
      return {
        userInfo:JSON.parse(sessionStorage.getItem('value')),
      }
    },
    methods: {
    },
    components:{
      // 引入导航
      navtitle:navtitle
    },
    //   钩子函数
    created:function(){

    }
  }
</script>

<style lang="less" scoped>
.navigation{
  height:100%;
  .el-menu-vertical-demo{
    height: 100%;
  }
}

// 管理员
.merchantmanagehome{
  width:14px;
  height: 14px;
}
.merchantmanagehome::before{
  position: absolute;
  content:url(../assets/merchanthome.png);
  top:4px;
  left: 25px;
}
.goodsmangehomes{
  width:14px;
  height: 14px;
}
.goodsmangehomes::before{
  position: absolute;
  content:url(../assets/goodsmangehome.png);
  top:4px;
  left: 25px;
}

.systemhome{
  width:14px;
  height: 14px;
}
.systemhome::before{
  position: absolute;
  content:url(../assets/systemhome.png);
  top:4px;
  left: 25px;
}


// 企业

.demandorderhomes{
  width:14px;
  height: 14px;
}
.demandorderhomes::before{
  position: absolute;
  content:url(../assets/demandorderhomes.png);
  top:4px;
  left: 25px;
}
.mygoodshomes{
  width:14px;
  height: 14px;
}
.mygoodshomes::before{
  position: absolute;
  content:url(../assets/goodsmangehome.png);
  top:4px;
  left: 25px;
}
.goodsorderhomes{
  width:14px;
  height: 14px;
}
.goodsorderhomes::before{
  position: absolute;
  content:url(../assets/demandorderhomes.png);
  top:4px;
  left: 25px;
}
.setaccounthomes{
  width:14px;
  height: 14px;
}
.setaccounthomes::before{
  position: absolute;
  content:url(../assets/setaccounthomes.png);
  top:4px;
  left: 25px;
}
</style>
