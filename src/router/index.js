import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AttackSettings from '@/components/AttackSettings'
import PreviousAttacks from '@/components/PreviousAttacks'
import EmailContent from '@/components/EmailContent'
import Dashboard from '@/components/Dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
