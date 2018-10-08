# administration

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

****

##项目搭建过程

###本项目在基本搭建以外还是用了其他插件

1. element UI 是整个项目的框架，以及页面效果

2. less 是编写css样式

3. axios 用于调用后台接口，

4. qs 解决后台以a=1&b=2的键值对格式编写

5. qrcode 用于实现二维码

6. 有问题可以查看[莫言](https://www.jianshu.com/u/107a960cac9c)

****

###src路径下的项目结构

1. api

    + 请求的域名

    + OSS的参数，以及上传图片的路径等

2. components

    + login.vue 登陆页

    + navigation.vue 首页

    + navtitle.vue 顶部导航

    + auditinfo.vue 当用户未通过审核时，修改的也面

3. page

    + 管理员

       + home.vue 首页

       + merchantmanagehome.vue 商户管理

       + goodsmangehome.vue 商品管理

       + systembulletin.vue 系统公告

       + systemjournal.vue 操作日志

       + systemopinion.vue 反馈意见

       + systemuser.vue 用户管理

       + systemregionmanage.vue 区域管理

       + systemgoodsclass.vue 商品类别

       + systemgoodslist.vue 商品属性管理

       + systemuserdrawing.vue 商品提现管理

    + 企业商户
       + home.vue 首页

       + demandorderhome.vue 需求订单

       + mygoodshome.vue 我的商品

       + addmygoodshome.vue 添加商品

       + goodsorderhome.vue 商品订单

       + setaccounthome.vue 账户管理

       + myarrange.vue 我的安排

    + 个人商户

       + home.vue 首页

       + demandorderhome.vue 需求订单

       + setaccounthome.vue 账户管理

       + myarrange.vue 我的安排

4. router -> index.js 项目路由

5. App.vue 添加了CSS初始化

6. main.js 配置相关文件

7. index.html 引入了oss.js，用于用户上传