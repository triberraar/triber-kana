import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

import Game from '@/components/Game'
import FinishedGame from '@/components/Game/Finished'
import Unimplemented from '@/components/Game/Unimplemented'

import { HOME,
  UNIMPLEMENTED,
  GAME,
  FINISHED_GAME
 } from './constants'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: {
        name: HOME
      }
    },
    {
      path: '/',
      name: HOME,
      component: Home
    },
    {
      path: '/game',
      name: GAME,
      component: Game
    },
    {
      path: '/unimplemented',
      name: UNIMPLEMENTED,
      component: Unimplemented
    },
    {
      path: '/game/finished',
      name: FINISHED_GAME,
      component: FinishedGame
    }
  ]
})
