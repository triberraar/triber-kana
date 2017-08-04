import Vue from 'vue'
import Vuex from 'vuex'

import router from '@/router'
import { FINISHED_GAME } from '@/router/constants'
import initial from './initial'
import { START_GAME, SYMBOL_SELECTED, NEXT_ROUND } from './constants'
import { getGameSymbols } from '@/components/Game/engine'
import { WRITTEN_KANA_TO_SELECT_ROMAJI, WRITTEN_ROMAJI_TO_SELECT_KANA, SPOKEN_TO_SELECT_KANA, RANDOM } from '@/components/Game/constants'

Vue.use(Vuex)

const getRandomMode = () => {
  const arr = [WRITTEN_KANA_TO_SELECT_ROMAJI, WRITTEN_ROMAJI_TO_SELECT_KANA, SPOKEN_TO_SELECT_KANA]
  return arr[Math.floor(Math.random() * arr.length)]
}

export default new Vuex.Store({
  state: {
    ...initial
  },
  mutations: {
    [START_GAME]: (state, { kana, useDigraphs, type, numberOfRounds }) => {
      state.kana = kana
      state.useDigraphs = useDigraphs
      state.type = type
      state.numberOfRounds = numberOfRounds
      state.currentRound = 1
      state.gameSymbols = getGameSymbols({ kana, digraphs: useDigraphs, numberOfSymbols: state.numberOfSymbols })
      state.solved = false
      state.selectedSymbols = []
      state.attempts = [ { kana: state.gameSymbols.question.kana, amount: 0 } ]
      if (state.type === RANDOM) {
        state.mode = getRandomMode()
      } else {
        state.mode = state.type
      }
    },
    [SYMBOL_SELECTED]: (state, {kana, romaji}) => {
      state.attempts[state.currentRound - 1].amount = state.attempts[state.currentRound - 1].amount + 1
      state.selectedSymbols.push({kana, romaji})
      if (state.gameSymbols.question.kana === kana && state.gameSymbols.question.romaji === romaji) {
        state.solved = true
      }
    },
    [NEXT_ROUND]: state => {
      if (state.currentRound === state.numberOfRounds) {
        router.push({ name: FINISHED_GAME })
      } else {
        state.currentRound = state.currentRound + 1
        state.selectedSymbols = []
        state.solved = false
        state.gameSymbols = getGameSymbols({ kana: state.kana, digraphs: state.useDigraphs, numberOfSymbols: state.numberOfSymbols })
        state.attempts.push({ kana: state.gameSymbols.question.kana, amount: 0 })
        if (state.type === RANDOM) {
          state.mode = getRandomMode()
        }
      }
    }
  },
  actions: {
    [SYMBOL_SELECTED]: ({commit, state}, {kana, romaji}) => {
      if (state.solved) { return }
      commit(SYMBOL_SELECTED, {kana, romaji})
      if (state.solved) {
        setTimeout(() => {
          commit(NEXT_ROUND)
        }, 1000)
      }
    }
  },
  getters: {
    gameCanBeStarted: (state) => {
      return !!state.kana && !!state.type && !!state.numberOfRounds
    },
    numberOfSymbols: (state) => {
      return state.numberOfSymbols
    },
    question: state => {
      return state.gameSymbols && state.gameSymbols.question
    },
    answers: state => {
      return state.gameSymbols && state.gameSymbols.answers
    },
    symbolsForRow: state => row => {
      return [...state.gameSymbols.answers].slice(row * 6, (row + 1) * 6)
    },
    selectedSymbols: state => {
      return state.selectedSymbols
    },
    gameResult: state => {
      return { numberOfRounds: state.numberOfRounds, attempts: state.attempts }
    },
    mode: state => {
      return state.mode
    },
    gameFinished: state => {
      return state.numberOfRounds === state.currentRound
    }
  },
  strict: true
})
