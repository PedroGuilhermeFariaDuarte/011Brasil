import express from "express"

// Controllers
import ProductController from "@controllers/product"

// Middlewares
import {
	handlerValidationData,
	handlerValidationDataGeneral,
	handlerValidationIDProduct
} from "@middlewares/Validation/Product"

const router = express.Router()

router.route("/product/create")
	.post(handlerValidationData, ProductController.create)

router.route("/product/:idProduct")
	.put(handlerValidationIDProduct, handlerValidationDataGeneral, ProductController.update)
	.delete(handlerValidationIDProduct, handlerValidationDataGeneral, ProductController.delete)
	.get(handlerValidationIDProduct, ProductController.show)

router.route("/product/update/:idProduct")
	.put(handlerValidationIDProduct, handlerValidationDataGeneral, ProductController.update)

router.route("/product/delete/:idProduct")
	.delete(handlerValidationIDProduct, handlerValidationDataGeneral, ProductController.delete)

router.route("/product/show/:idProduct")
	.get(handlerValidationIDProduct, ProductController.show)

router.route("/product/all/show")
	.get(ProductController.index)

export default router
