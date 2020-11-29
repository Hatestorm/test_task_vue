import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

import cart from '@/store/modules/cart.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    names: null,
    data: {},
    rates: {
      oldRate: null,
      newRate: null
    }
  },
  mutations: {
    setNames (state, names) {
      state.names = names
    },
    setData (state, data) {
      state.data = data
    },
    setRates (state, rates) {
      // присваиваю новый курс и старый для последующего сравнения
      if (state.rates.oldRate === null) {
        state.rates.oldRate = rates
        state.rates.newRate = rates
      } else {
        const oldRates = state.rates.newRate

        state.rates.oldRate = oldRates
        state.rates.newRate = rates
      }
    }
  },
  actions: {
    async fetchData ({ dispatch, commit }) {
      const dataFetch = await fetch('/data/data.json')
      const data = await dataFetch.json()

      // получаю курс доллара
      const rates = await dispatch('exchangeRates')

      commit('setData', data)
      commit('setRates', rates)

      return data
    },
    async fetchNames ({ commit }) {
      const fetchedNames = await fetch('/data/names.json')
      const names = await fetchedNames.json()

      commit('setNames', names)
    },
    exchangeRates () {
      return _.random(20, 80)
    }
  },
  modules: {
    cart
  },
  getters: {
    getNames: s => s.names,
    getData: s => s.data,
    getRates: s => s.rates
  }
})
