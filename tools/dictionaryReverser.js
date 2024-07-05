const dictionaryReverser = function (dictionary) {
  let reversedDictionary = {}

  for (let key in dictionary) {
    reversedDictionary[dictionary[key]] = key
  }

  return reversedDictionary
}

module.exports = dictionaryReverser
