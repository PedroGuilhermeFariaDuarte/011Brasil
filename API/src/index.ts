require("dotenv").config()

// App
import App from "@app/index"

// Logger
import Logger from "@logger/index"

App.listen(process.env.API_PORT, () => {
	Logger.info("011Brasil API, online!")
})
