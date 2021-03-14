import { Request, Response, NextFunction } from 'express'
import mongoose from "mongoose"
import { ObjectID } from "mongodb"
import * as Yup from "yup"

// Logger
import Logger from "@logger/index"

// Schemas
import { ProductSchema, ProductSchemaGeneral } from "@schemas/Product"

// Utils
import { handlerResponse } from "@utils/Response"

export async function handlerValidationData(request: Request, response: Response, next: NextFunction) {
	try {
		ProductSchema.validate(request.body, {
			abortEarly: false
		})
			.then(_resolve => {
				next()
			})
			.catch(error => {
				const validationErrors: Object = {}
				if (error instanceof Yup.ValidationError) {
					error.inner.forEach(err => {
						// @ts-ignore
						validationErrors[ err.path ] = err.message
					})
				}

				handlerResponse(response, 1, 400, "ValidationError", validationErrors)
			})
	} catch (error) {
		Logger.error(`011Brasil MiddlewareProductValidationError: ${error.message}`)
	}
}

export async function handlerValidationDataGeneral(request: Request, response: Response, next: NextFunction) {
	try {
		ProductSchemaGeneral.validate(request.body, {
			abortEarly: false
		})
			.then(_resolve => next())
			.catch(error => {
				const validationErrors: Object = {}
				if (error instanceof Yup.ValidationError) {
					error.inner.forEach(err => {
						// @ts-ignore
						validationErrors[ err.path ] = err.message
					})
				}

				handlerResponse(response, 1, 403, "ValidationError", validationErrors)
			})

	} catch (error) {
		Logger.error(`011Brasil MiddlewareProductValidationError: ${error.message}`)
	}
}

export function handlerValidationIDProduct(request: Request, response: Response, next: NextFunction) {
	try {
		if (request.params.idProduct.length !== 24) {
			next()
			return;
		}

		if (mongoose.isValidObjectId(new ObjectID(request?.params?.idProduct).toHexString()) === true) {
			next()
			return;
		}

		handlerResponse(response, 1, 403, "ID of product not valid")
	} catch (error) {
		handlerResponse(response, 1, 500, `011Brasil FatalError: ${error.message}`)
		Logger.error(`011Brasil MiddlewareProductValidationError: ${error.message}`)
	}
}
