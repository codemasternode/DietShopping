import fs from 'fs'
import path from 'path'

export function loadDataFromJSONFile(pathToFile, baseURL = "../data") {
    if (typeof pathToFile !== "string") {
        throw new Error("pathToFile is missing")
    }
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, `${baseURL}/${pathToFile}`), (err, data) => {
            console.log(data, 10)
            if (err || !data) {
                return  reject(err)
            }
            resolve(JSON.parse(data))
        })
    })
}