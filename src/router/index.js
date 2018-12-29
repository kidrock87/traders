import Vue from 'vue'
import Router from 'vue-router'
import correlation from '@/components/correlation'
import Signals from '@/components/Signals'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Signals',
      component: Signals
    },
    {
      path: '/signals',
      name: 'Signals',
      component: Signals
    },
    {
      path: '/correlation',
      name: 'correlation',
      component: correlation
    }
  ]
})
