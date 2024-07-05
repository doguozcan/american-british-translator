const americanOnly = require('./american-only.js')
const americanToBritishSpelling = require('./american-to-british-spelling.js')
const americanToBritishTitles = require('./american-to-british-titles.js')
const britishToAmericanTitles = require('./british-to-american.titles.js')
const britishOnly = require('./british-only.js')

const dictionaryReverser = require('../tools/dictionaryReverser.js')

class Translator {
  americanToBritish(text) {
    let translatedText = text

    // change american only words to english
    // blacktop -> tarmac
    // bleachers -> stands
    // blinders -> blinkers
    for (let [key, value] of Object.entries(americanOnly)) {
      const regex = new RegExp(`\\b${key}\\b`, 'gi')
      translatedText = translatedText.replace(
        regex,
        `<span class="highlight">${value}</span>`
      )
    }

    // change american spelling to british
    // colors -> colours
    // computerize -> computerise
    // defense -> defence
    for (let [key, value] of Object.entries(americanToBritishSpelling)) {
      const regex = new RegExp(`\\b${key}\\b`, 'gi')
      translatedText = translatedText.replace(
        regex,
        `<span class="highlight">${value}</span>`
      )
    }

    // change american titles to british
    // ms. -> ms
    // mx. -> mx
    // dr. -> dr
    for (let [key, value] of Object.entries(americanToBritishTitles)) {
      const regex = new RegExp(`${key}`, 'gi')
      translatedText = translatedText.replace(
        regex,
        `<span class="highlight">${value}</span>`
      )
    }

    // change time
    // 11.42 -> 11.42
    // 06:24 -> 06.24
    translatedText = translatedText.replace(
      /(\d{1,2}):(\d{2})/g,
      `<span class="highlight">${'$1.$2'}</span>`
    )

    return translatedText
  }

  britishToAmerican(text) {
    let translatedText = text

    // reverse the dictionaries
    // make them american to british to british to american
    const britishToAmericanSpelling = dictionaryReverser(
      americanToBritishSpelling
    )

    // change british only words to american
    // bikky -> cookie
    // cash machine -> ATM
    // heath robinson device -> rube goldberg device
    for (let [key, value] of Object.entries(britishOnly)) {
      const regex = new RegExp(`\\b${key}\\b`, 'gi')
      translatedText = translatedText.replace(
        regex,
        `<span class="highlight">${value}</span>`
      )
    }

    // change british spelling to american
    // demonise -> demonize
    // doughnut -> donut
    // draught -> draft
    for (let [key, value] of Object.entries(britishToAmericanSpelling)) {
      const regex = new RegExp(`\\b${key}\\b`, 'gi')
      translatedText = translatedText.replace(
        regex,
        `<span class="highlight">${value}</span>`
      )
    }

    // change british titles to american
    // dr -> Dr.
    // prof -> Prof.
    // mr -> Mr.
    for (let [key, value] of Object.entries(britishToAmericanTitles)) {
      const regex = new RegExp(`\\b${key}\\b`, 'gi')
      translatedText = translatedText.replace(
        regex,
        `<span class="highlight">${value}</span>`
      )
    }

    // change time
    // 11.42 -> 11:42
    // 06.24 -> 06:24
    translatedText = translatedText.replace(
      /(\d{1,2})\.(\d{2})/g,
      `<span class="highlight">${'$1:$2'}</span>`
    )

    return translatedText
  }
}

module.exports = Translator
