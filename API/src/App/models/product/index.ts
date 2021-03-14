import mongoose from "mongoose"

const ProductModel = new mongoose.Schema({
	march: {
		type: String,
		require: true
	},
	model: {
		type: String,
		require: true
	},
	year: {
		type: Number,
		require: true
	},
	manufacturing: {
		type: String,
		require: true
	},
	plate: {
		type: String,
		require: true
	},
})

export default mongoose.model("Product", ProductModel)
