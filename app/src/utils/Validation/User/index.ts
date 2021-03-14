import * as Yup from 'yup'

export function handlerValidationForm(data: any, schema: Yup.AnyObjectSchema, refForm: any) {
	try {
		schema.validate(data, {
			abortEarly: false
		})
			.then((_resolve: any) => {
				// @ts-ignore
				refForm.current.submitForm()
			})
			.catch((error: any) => {
				const validationErrors = {}
				if (error instanceof Yup.ValidationError) {
					error.inner.forEach((err: any) => {
						// @ts-ignore
						validationErrors[ err.path ] = err.message
					})
				}

				handlerSetError(validationErrors, refForm)
			})
	} catch (error) {

	}
}

function handlerSetError(errors: Object, refForm: any) {
	if (Object.getOwnPropertyNames(errors).length > 0) {
		// @ts-ignore
		refForm.current.setErrors(errors)
	}
}
