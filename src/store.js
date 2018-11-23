import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let savedUser
let savedCourses
let savedTopics
let savedSettings
try {
  if (localStorage) {
    savedUser = JSON.parse(localStorage.getItem('user'))
    savedCourses = JSON.parse(localStorage.getItem('courses')) || []
    savedTopics = JSON.parse(localStorage.getItem('topics')) || []
    savedSettings = JSON.parse(localStorage.getItem('settings')) || {
      sound: true
    }
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
    topics: savedTopics,
    sentences: null,
    settings: savedSettings
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
    setSentences(state, sentences) {
      state.sentences = sentences
    },
    setSettings(state, settings) {
      state.settings = settings
      localStorage.setItem('settings', JSON.stringify(settings))
    }
  },
  getters: {
    getCurrentCouse: state => courseSlug => {
      return state.courses.find(c => c.slug == courseSlug)
    },
    getCurrentTopic: state => topicSlug => {
      return state.topics.find(t => t.slug == topicSlug)
    }
  }
})
