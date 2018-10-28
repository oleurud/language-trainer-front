import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let savedUser
try {
  if (localStorage) {
    savedUser = JSON.parse(localStorage.getItem('user'))
  }
} catch (error) {
  localStorage.clear()
}

export default new Vuex.Store({
  state: {
    user: savedUser,
    token: localStorage.getItem('token'),
    nextRoute: '/collections',
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
      localStorage.clear()
    },
    setNextRoute(state, nextRoute) {
      state.nextRoute = nextRoute
    }
  },
  actions: {

  }
})
