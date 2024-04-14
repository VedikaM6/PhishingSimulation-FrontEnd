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
    // {
    //   path: '/attack-settings',
    //   name: 'AttackSettings',
    //   component: AttackSettings,
    //   props: true
    // },
    // {
    //   path: '/previous-attacks',
    //   name: 'PreviousAttacks',
    //   component: PreviousAttacks,
    //   props: true
    // },
    // {
    //   path: '/email-contents',
    //   name: 'EmailContent',
    //   component: EmailContent,
    //   props: true
    // },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
