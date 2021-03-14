import { Response } from "express"
import { Document } from "mongoose"

// Logger
import Logger from "@logger/index"

export function handlerResponse(response: Response, typeResponse: number = 0, codeStatus: number, message: string = "", data: Object | Array<Object | Document> | null = []) {
	try {
		if (typeResponse === 0)
			Logger.info(`011Brail UtilsResponseWarning: ${message}`)
		else if (typeResponse === 1)
			response.json({
				code: codeStatus,
				message: message ?? 'UtilsResponse',
				data: data
			})
	} catch (error) {
		Logger.error(`011Brasil UtilsResponseError: ${error.message}`)
	}
}
