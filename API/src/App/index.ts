import express, { Express } from "express"
import cors from "cors"

// Routers
import ProductRouters from '@routers/Product'

// Database
import Database from '@database/index'

class App {
	server: Express

	constructor() {
		this.server = express()
		this.init()
	}

	init() {
		this.middlewares()
		this.routers()
		this.database()
	}

	routers() {
		this.server.use([ ProductRouters ])
	}

	database() {
		Database.init()
	}

	middlewares() {
		this.server.use([
			cors({
				origin: '*'
			}),
			express.json()
		])
	}
}

export default new App().server
