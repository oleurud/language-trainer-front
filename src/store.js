import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let savedUser
let savedCourses
let savedTopics
try {
  if (localStorage) {
    savedUser = JSON.parse(localStorage.getItem('user'))
    savedCourses = JSON.parse(localStorage.getItem('courses')) || []
    savedTopics = JSON.parse(localStorage.getItem('topics')) || []
  }
} catch (error) {
  localStorage.clear()
}

export default new Vuex.Store({
  state: {
    user: savedUser,
    token: localStorage.getItem('token'),
    nextRoute: '/courses',
    courses: savedCourses,
    topics: savedTopics
  },
  mutations: {
    setUser(state, user) {
      if (!user.profile)
        user.profile = {}

      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    logout(state) {
      state.user = null
      state.token = null
      state.nextRoute = null
      state.courses = null
      state.topics = null
      localStorage.clear()
    },
    setNextRoute(state, nextRoute) {
      state.nextRoute = nextRoute
    },
    setCourses(state, courses) {
      state.courses = courses
      localStorage.setItem('courses', JSON.stringify(state.courses))
    },
    setTopics(state, topics) {
      state.topics = topics
      localStorage.setItem('topics', JSON.stringify(state.topics))
    },
  },
  actions: {

  }
})
