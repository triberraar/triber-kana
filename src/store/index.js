import Vue from 'vue'
import Vuex from 'vuex'

import { START_GAME } from './constants'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {
    [START_GAME]: (state, { type, numberOfRounds }) => {
      state.type = type
      state.numberOfRounds = numberOfRounds
      state.currentRound = 1
    }
  },
  strict: true
})
