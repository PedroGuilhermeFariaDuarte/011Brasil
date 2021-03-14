import * as Yup from "yup"

export const ProductSchema = Yup.object().shape({
	march: Yup.string().required("The march of product is required"),
	model: Yup.string().required("The model of product is required"),
	year: Yup.number().required("The year of product is required")
		.positive("The year of product is invalid, only number positive are accepteds")
		.integer("The year of product is not a number")
	,
	manufacturing: Yup.string().required("The manufacturing of product is required"),
	plate: Yup.string().required("The plate of product is required")
		.min(8, "The plate require min 8 characters")
		.max(8, "The plate require max 8 characters")
		.matches(/(-)/, {
			message: "Plate of product is incorrect, XXX-XXXX"
		})
})

export const ProductSchemaGeneral = Yup.object().shape({
	march: Yup.string(),
	model: Yup.string(),
	year: Yup.number()
		.positive("The year of product is invalid, only number positive are accepteds")
		.integer("The year of product is not a number")
	,
	manufacturing: Yup.string(),
	plate: Yup.string()
		.min(8, "The plate require min 8 characters")
		.max(8, "The plate require max 8 characters")
		.matches(/(-)/, "Plate of product is incorrect, XXX-XXXX")
})
