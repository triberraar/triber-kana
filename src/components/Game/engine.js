import { HIRAGANA_SYMBOLS, HIRAGANA_DIGRAPH_SYMBOLS, HIRAGANA, KATAKANA } from './constants'
import { randomize } from '@/utils'

function getGameSymbols ({ kana, digraphs, numberOfSymbols }) {
  if (kana === HIRAGANA) {
    let input = [...HIRAGANA_SYMBOLS]
    if (digraphs) {
      input = [...input, ...HIRAGANA_DIGRAPH_SYMBOLS]
    }
    const randomized = randomize(input)
    const gameSymbols = randomized.slice(0, numberOfSymbols)
    const question = gameSymbols[0]
    const answers = randomize(gameSymbols)
    return { question, answers }
  } else if (kana === KATAKANA) {
  }
}

export { getGameSymbols }
