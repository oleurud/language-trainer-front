import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'

import Home from '@/components/Home'
import UserData from '@/components/pages/account/UserData'
import ChangePassword from '@/components/pages/account/ChangePassword'
import Courses from '@/components/pages/courses/Courses'
import Course from '@/components/pages/course/Course'

Vue.use(Router)

function requireAuth(to, from, next) {
  if (store.state.user && store.state.token) {
    next()
  } else {
    next('/')
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/account/user',
      name: 'UserData',
      component: UserData,
      beforeEnter: requireAuth
    },
    {
      path: '/account/password',
      name: 'ChangePassword',
      component: ChangePassword,
      beforeEnter: requireAuth
    },
    {
      path: '/courses',
      name: 'Courses',
      component: Courses,
      beforeEnter: requireAuth
    },
    {
      path: '/course/:slug',
      name: 'Course',
      component: Course,
      beforeEnter: requireAuth
    },
  ]
})
