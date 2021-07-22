import Vue from 'vue'
import Router from 'vue-router'
import player from '@/components/player'
import index from '../components/index'
import teacher from '../components/teacher'
import test from '../components/test'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/player',
      name: 'player',
      component: player
    },
    {
      path: '/',
      name: 'index',
      component: index,
      // children: [
      //   {
      //     path: '/player',
      //     name: 'player',
      //     component: player
      //   }
      // ]
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: teacher
    },
    {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
})
