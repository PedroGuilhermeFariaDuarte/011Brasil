import { resolve } from "path"

// Algorithm
import Algorithm from "./App"

// Logger
import Logger from './config/Log'

// Initialize of the Algorithm
new Algorithm().initialize()
  .then((_resolve: any) => {
    Logger.info("----Algorithm was finished----")
    Logger.info(`----Check out the folder ${resolve(__dirname) + '/data'} and open the file 'result.json'----`)
  })
  .catch(reject => {
    Logger.error(`Have a error: ${reject.message}`)
  })
