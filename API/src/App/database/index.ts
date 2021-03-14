import mongoose from "mongoose"

// Logger
import Logger from "@logger/index"

class Database {
	username: string | undefined
	password: string | undefined
	database: string | undefined
	host: string | undefined

	constructor(username = process.env.DATABASE_USERNAME,
		password = process.env.DATABASE_PASSWORD,
		database = process.env.DATABASE_DATABASENAME,
		host = process.env.DATABASE_HOST) {
		this.username = username
		this.password = password
		this.database = database
		this.host = host
	}

	init() {
		try {
			mongoose.connect(`mongodb://${this.host}/${this.database}?retryWrites=true&w=majority`, {
				useNewUrlParser: true,
				useFindAndModify: true,
				useUnifiedTopology: true
			})
				.then(_resolve => {
					Logger.info("011Brasil ApiWarningDatabase: Database connected with success!")
					this.monitoring()
				})
				.catch(error => {
					Logger.error(`011Brasil ApiErrorDatabase: ${error.message}`)
				})
		} catch (error) {
			Logger.error(`011Brasil ApiError: ${error.message}`)
		}
	}

	monitoring() {
		try {
			mongoose.connection.on("connecting", (resolve) => {
				Logger.warn(`011Brasil ApiMonitoringDatabase: ${resolve.message || 'starts the connection with database server!'}`)
			})

			mongoose.connection.on("disconnecting", (resolve) => {
				Logger.warn(`011Brasil ApiMonitoringDatabase: ${resolve.message || 'The api disconnecting with success!'}`)
			})

			mongoose.connection.on("disconnected", (error) => {
				Logger.warn(`011Brasil ApiMonitoringDatabase: ${error.message}`)
			})

			mongoose.connection.on("reconnected", (resolve) => {
				Logger.warn(`011Brasil ApiMonitoringDatabase: ${resolve.message || 'The api reconnected with success'}`)
			})

			mongoose.connection.on("error", (error) => {
				Logger.warn(`011Brasil ApiMonitoringDatabase: ${error.message}`)
			})
		} catch (error) {
			Logger.warn(`011Brasil ApiError: ${error.message}`)
		}
	}
}

export default new Database()
