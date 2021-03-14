import { Request, Response, NextFunction } from "express"

// Models
import ModelProduct from "@models/product"

// Logger
import Logger from "@logger/index"

// Utils
import { handlerResponse } from "@utils/Response"

class ProductController {
	async create(request: Request, response: Response, _next: NextFunction) {
		try {
			const product = await ModelProduct.create(request.body)

			if (product)
				handlerResponse(response, 1, 200, "Product create with success", product)
			else
				handlerResponse(response, 1, 500, 'It was not possible create your product', {})

			return;
		} catch (error) {
			Logger.info(`011Brasil API ProductControllerErrorCreate: ${error.message}`)
			handlerResponse(response, 1, 500, error.message, {})
		}
	}

	async show(request: Request, response: Response, _next: NextFunction) {
		try {
			const param = request?.params?.idProduct
			const otherParams = param.length === 24 ? { _id: { $eq: param } } : { march: { $eq: param } }

			const myProduct = await ModelProduct.find({
				$or: [
					otherParams,
					{
						model: { $eq: param }
					},
					{
						manufacturing: { $eq: param }
					},
					{
						plate: { $eq: param }
					},
				]
			})

			if (myProduct.length > 0)
				handlerResponse(response, 1, 200, "Product found with success", myProduct)
			else
				handlerResponse(response, 1, 400, 'It was not possible found your product', [])

			return;
		} catch (error) {
			Logger.info(`011Brasil API ProductControllerErrorIndex: ${error.message}`)
			handlerResponse(response, 1, 500, error.message, {})
		}
	}

	async index(_request: Request, response: Response, _next: NextFunction) {
		try {
			const allProducts = await ModelProduct.find()

			if (allProducts.length > 0)
				handlerResponse(response, 1, 200, "All products found with success", allProducts)
			else
				handlerResponse(response, 1, 500, 'It was not possible found all products', [])

			return;
		} catch (error) {
			Logger.info(`011Brasil API ProductControllerErrorIndex: ${error.message}`)
			handlerResponse(response, 1, 500, error.message, {})
		}
	}

	async delete(request: Request, response: Response, _next: NextFunction) {
		try {
			const deletedProduct = await ModelProduct.findByIdAndDelete(request?.params?.idProduct)

			if (deletedProduct)
				handlerResponse(response, 1, 200, " Product deleted with success", deletedProduct)
			else
				handlerResponse(response, 1, 500, 'It was not possible delete the product', {})

			return;
		} catch (error) {
			Logger.info(`011Brasil API ProductControllerErrorDelete: ${error.message}`)
			handlerResponse(response, 1, 500, error.message, {})
		}
	}

	async update(request: Request, response: Response, _next: NextFunction) {
		try {
			const updateProduct = await ModelProduct.findByIdAndUpdate(request?.params?.idProduct, request.body)

			if (updateProduct)
				handlerResponse(response, 1, 200, " Product updating with success", updateProduct)
			else
				handlerResponse(response, 1, 400, 'It was not possible update the product', {})

			return;
		} catch (error) {
			Logger.info(`011Brasil API ProductControllerErrorUpdate: ${error.message}`)
			handlerResponse(response, 1, 500, error.message, {})
		}
	}
}

export default new ProductController
