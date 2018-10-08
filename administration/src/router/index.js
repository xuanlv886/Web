import Vue from 'vue'
import Router from 'vue-router'
import navigation from '@/components/navigation'
import login from '@/components/login'
// 商户未通过审核
import auditinfo from '@/components/auditinfo'
// 商户通过审核
import homepage from '@/page/home/homepage'
import demandorderhome from '@/page/demandorder/demandorderhome'
import setaccounthome from '@/page/setaccount/setaccounthome'
import myarrange from '@/page/setaccount/myarrange'
import presentrecord from '@/page/setaccount/presentrecord'
import mygoodshome from '@/page/mygoods/mygoodshome'
import addmygoodshome from '@/page/mygoods/addmygoodshome'
import goodsorderhome from '@/page/goodsorder/goodsorderhome'
import merchantmanagehome from '@/page/merchantmanage/merchantmanagehome'
import goodsmangehome from '@/page/goodsmange/goodsmangehome'
// 系统设置
import systembulletin from '@/page/system/systembulletin'
import systemjournal from '@/page/system/systemjournal'
import systemopinion from '@/page/system/systemopinion'
import systemuser from '@/page/system/systemuser'
import systemregionmanage from '@/page/system/systemregionmanage'
import systemgoodsclass from '@/page/system/systemgoodsclass'
import systemgoodslist from '@/page/system/systemgoodslist'
import systemuserdrawing from '@/page/system/systemuserdrawing'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: '',
      component: login,
    },
    // 商户未通过审核
    {
      path: '/auditinfo',
      name: 'auditinfo',
      component: auditinfo,
    },
    {
      path: '/navigation',
      name: 'navigation',
      component: navigation,
      meta: { allowBack: false },
      children: [
        {
          path: '/',
          name: 'homepage',
          component: homepage
        },
        {
          path: '/homepage',
          name: 'homepage',
          component: homepage
        },
        {
          path: '/demandorderhome',
          name: 'demandorderhome',
          component: demandorderhome
        },
        {
          path: '/setaccounthome',
          name: 'setaccounthome',
          component: setaccounthome
        },
        {
          path: '/myarrange',
          name: 'myarrange',
          component: myarrange
        },
        {
          path: '/presentrecord',
          name: 'presentrecord',
          component: presentrecord
        },
        {
          path: '/mygoodshome',
          name: 'mygoodshome',
          component: mygoodshome
        },
        {
          path: '/addmygoodshome',
          name: 'addmygoodshome',
          component: addmygoodshome
        },
        {
          path: '/goodsorderhome',
          name: 'goodsorderhome',
          component: goodsorderhome
        },
        {
          path: '/merchantmanagehome',
          name: 'merchantmanagehome',
          component: merchantmanagehome
        },
        {
          path: '/goodsmangehome',
          name: 'goodsmangehome',
          component: goodsmangehome
        },
        {
          path: '/systembulletin',
          name: 'systembulletin',
          component: systembulletin
        },
        {
          path: '/systemjournal',
          name: 'systemjournal',
          component: systemjournal
        },
        {
          path: '/systemopinion',
          name: 'systemopinion',
          component: systemopinion
        },
        {
          path: '/systemuser',
          name: 'systemuser',
          component: systemuser
        },
        {
          path: '/systemregionmanage',
          name: 'systemregionmanage',
          component: systemregionmanage
        },
        {
          path: '/systemgoodsclass',
          name: 'systemgoodsclass',
          component: systemgoodsclass
        },
        {
          path: '/systemgoodslist',
          name: 'systemgoodslist',
          component: systemgoodslist
        },
        {
          path: '/systemuserdrawing',
          name: 'systemuserdrawing',
          component: systemuserdrawing
        },
      ]
    }
  ]
})
