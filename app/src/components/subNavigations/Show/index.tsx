import React, { useEffect, useState, useRef, memo } from 'react'

// Services
import Axios from '../../../services/request';

// Icons
import { SiProducthunt } from 'react-icons/si'
import { IoLogoModelS } from 'react-icons/io'
import {
	MdKeyboardArrowLeft,
	MdToday, MdCreate, MdSearch
} from 'react-icons/md';
import { HiOutlineTemplate } from 'react-icons/hi'

// Components
import { March } from '../../Fields/march'
import { Model } from '../../Fields/model'
import { Plate } from '../../Fields/plate'
import { Year } from '../../Fields/year'
import { Manufacturing } from '../../Fields/manufacturing'
import { Button } from '../../Button'

import Input from '../../Input'

// Types
import { IMyMessage, IProduct } from './types'

// Styles
import {
	Container,
	ContainerHeader,
	ContainerSearch,
	ContainerLocation,
	ContainerButton,
	ContainerProduct,
	ProductsContainer,
	ContainerForm
} from './styles'

// Utils
import { SchemaUserSignUp } from '../../../utils/Schema/Product';
import { handlerValidationForm } from '../../../utils/Validation/User'

// Context
import { useGetNavigationContext } from '../../../context/Navigation'

const Show: React.FC<IMyMessage> = ({ children }) => {
	const [ typeOperation, setTypeOperation ] = useState<Number>(1)
	const [ getForm, setGetForm ] = useState<boolean>(false)
	const [ allProducts, setAllProducts ] = useState<Array<IProduct>>([])
	const [ product, setProduct ] = useState<IProduct>()
	const refForm = useRef(null)
	const { setItemID } = useGetNavigationContext()

	let timeOut: any

	useEffect(() => {
		async function handlerGetAllProducst() {
			try {
				const responseAPI = await Axios.get('product/all/show')

				if (responseAPI.data.code !== 200) console.log(responseAPI.data.message)

				if (allProducts.length > 0) {
					setAllProducts(OldsProducts => [ ...OldsProducts, ...responseAPI.data.data ])
				} else {
					setAllProducts([ ...responseAPI.data.data ])
				}
			} catch (error) {
				console.log(error.message)
			}
		}

		handlerGetAllProducst()
		return () => setAllProducts([])
	}, [])

	useEffect(() => {
		handlerSetForm(getForm)
	}, [ getForm ])

	async function handlerGetProduct(param: string) {
		try {
			const newParam = param.trim()
			const responseAPI = await Axios.get(`product/show/${newParam}`)

			if (responseAPI.data.code !== 200) console.log(responseAPI.data.message)

			if (responseAPI.data.data.length > 0 && allProducts.length > 0) {
				setAllProducts(OldsProducts =>
					[ ...OldsProducts.filter((item: any) => item?.march !== newParam),
					...responseAPI.data.data ].reverse()
				)
			} else if (responseAPI.data.data.length > 0) {
				setAllProducts([ ...responseAPI.data.data ])
			}
		} catch (error) {
			console.log(error.message)
		}
	}

	function handlerSetTypeOperation(type: Number = 1) {
		setTypeOperation(type)
	}

	async function handlerSubmitForm(data: IProduct) {
		try {
			let responseAPI: any

			if (typeOperation === 1) {
				responseAPI = await Axios.put(`product/update/${product?._id} `, data)
			} else if (typeOperation === 2) {
				responseAPI = await Axios.delete(`product/delete/${product?._id}`)
			}

			if (responseAPI.data.code !== 200) {
				alert(responseAPI.data.message)
			}

			if (typeOperation === 2) {
				setAllProducts(OldsProducts =>
					[ ...OldsProducts.filter((item: any) => item?._id !== product?._id) ]
				)
			}

			// @ts-ignore
			refForm?.current?.reset()
			// @ts-ignore
			refForm?.current?.setErrors({})
		} catch (error) {
			console.log(error.message)
		}
	}

	function handlerSetForm(setForm: boolean) {
		if (setForm) {
			document.querySelector('#container-form')?.classList.add('container-form-show')
		} else {
			document.querySelector('#container-form')?.classList.remove('container-form-show')
		}
	}

	function handlerRevertCheckbox(id: string) {
		const optionChecked = document.querySelector(`#${id}`)

		// @ts-ignore
		if (optionChecked.checked === true) {
			// @ts-ignore
			optionChecked.click()
		}
	}

	function handlerVerifyCheckbox(id: string) {
		const optionChecked = document.querySelector(`#${id}`)

		// @ts-ignore
		if (!optionChecked.checked === false) {
			setGetForm(false)
		}
	}

	function debounceFuntion(c: Function, time: number = 200, ...params: any) {
		try {
			if (timeOut) {
				clearTimeout(timeOut)
			}

			timeOut = setTimeout(() => c(...params), time)
		} catch (error) {

		}
	}

	return <>
		<Container>
			<ContainerHeader>
				<div
					id='wrapper_header_icon'
					onClick={() => setItemID('Product')}
				>
					<MdKeyboardArrowLeft />
				</div>
				<span id='wrapper_header_title'>
					{children}
				</span>
			</ContainerHeader>
			<ContainerSearch onSubmit={() => { }}>
				<MdSearch />
				<Input
					name='product_name'
					placeholder='search a product'
					onChange={(event: any) => {
						debounceFuntion(handlerGetProduct, 300, event?.target?.value)
					}}
				/>
			</ContainerSearch>
			<ContainerLocation>
				<ContainerButton>
					<input type='checkbox' name='option-location' id='option-update' />
					<label
						// @ts-ignore
						htmlFor='option-update'
						onClick={() => {
							handlerVerifyCheckbox('option-update')
							handlerRevertCheckbox('option-delete')
							handlerSetTypeOperation()
						}}
					/>
				</ContainerButton>
				<span
					className='describe-option'
				>
					atualizar um produto
				</span>
			</ContainerLocation>
			<ContainerLocation>
				<ContainerButton>
					<input type='checkbox' name='option-location' id='option-delete' />
					<label
						// @ts-ignore
						htmlFor='option-delete'
						onClick={() => {
							handlerVerifyCheckbox('option-delete')
							handlerRevertCheckbox('option-update')
							handlerSetTypeOperation(2)
						}}
					/>
				</ContainerButton>
				<span
					className='describe-option'
				>
					deletar um produto
				</span>
			</ContainerLocation>
			<ContainerProduct>
				{
					allProducts.length > 0 ?
						allProducts.map((item, index) => (
							<ProductsContainer
								onClick={() => {
									setProduct(item)
									setGetForm(!getForm)
								}}
								key={index}
								title={item?.model}
							>
								<SiProducthunt />
								<div id='content'>
									<span
										className='name_product'
									>
										{item?.march}
									</span>
									<span
										className='other'
									>
										{item?.model}
									</span>
								</div>
							</ProductsContainer>)) :
						'Nenhum produto disponivel'
				}
			</ContainerProduct>
		</Container>
		{
			getForm && (
				<ContainerForm
					onSubmit={handlerSubmitForm}
					ref={refForm}
					initialData={product}
				>
					<ContainerHeader>
						<div
							id='wrapper_header_icon'
							onClick={() => setGetForm(!getForm)}
						>
							<MdKeyboardArrowLeft />
						</div>
						<span id='wrapper_header_title'>
							{typeOperation === 1 ? 'Atualizar' : 'Deletar'}
						</span>
					</ContainerHeader>
					<March>
						<SiProducthunt />
						<Input name='march' placeholder='march of product' />
					</March>

					<Model>
						<IoLogoModelS />
						<Input name='model' placeholder='model of product' />
					</Model>

					<Year>
						<MdToday />
						<Input name='year' placeholder='year of product' />
					</Year>

					<Manufacturing>
						<MdCreate />
						<Input name='manufacturing' placeholder='manufacturing of product' />
					</Manufacturing>

					<Plate>
						<HiOutlineTemplate />
						<Input name='plate' placeholder='plate of product' />
					</Plate>

					<Button>
						<button
							type='button'
							onClick={() => {
								// @ts-ignore
								handlerValidationForm(refForm?.current?.getData(), SchemaUserSignUp, refForm)
							}}
						>
							{typeOperation === 1 ? 'atualizar' : 'deletar'}
						</button>
					</Button>
				</ContainerForm>
			)
		}
	</>
}

export default memo(Show)
