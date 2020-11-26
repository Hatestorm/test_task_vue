import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    names: null
  },
  mutations: {
    setError (state, error) {
      state.error = error
    },
    setNames (state, names) {
      state.names = names
    }
  },
  actions: {
    async fetchData () {
      const data = await fetch('/data/data.json')

      return data.json()
    },
    async fetchNames ({ commit }) {
      const fetchedNames = await fetch('/data/names.json')
      const names = await fetchedNames.json()

      commit('setNames', names)
    }
  },
  modules: {
  },
  getters: {
    getNames: s => s.names
  }
})
