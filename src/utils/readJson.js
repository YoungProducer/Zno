const fs = require('fs')

export const readJson = (url) => {
  return new Promise((resolve, reject) => {
    fs.readFile(url, 'utf8', (err, jsonString) => {
      if (err) {
        reject("File read failed:", err)
      }
      if (jsonString.length) {
        resolve(JSON.parse(jsonString))
      }
      else resolve([])
    })
  })
}
