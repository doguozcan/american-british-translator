'use strict'

const Translator = require('../components/translator.js')

module.exports = function (app) {
  const translator = new Translator()

  app.route('/api/translate').post((req, res) => {
    // get text and locale values from the body
    let { text, locale } = req.body

    // check required values
    if (!locale || text === undefined) {
      return res.json({ error: 'Required field(s) missing' })
    }

    // text should not be empty
    if (text === '') {
      return res.json({ error: 'No text to translate' })
    }

    // validate locale
    if (locale !== 'american-to-british' && locale !== 'british-to-american') {
      return res.json({ error: 'Invalid value for locale field' })
    }

    let translation

    // make translation based on locale
    if (locale === 'american-to-british') {
      translation = translator.americanToBritish(text)
    } else if (locale === 'british-to-american') {
      translation = translator.britishToAmerican(text)
    }

    // if no translation is needed
    if (translation === text) {
      return res.json({ text, translation: 'Everything looks good to me!' })
    }

    // return translation
    return res.json({ text, translation })
  })
}
