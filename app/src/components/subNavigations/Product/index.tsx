import React, { useRef, memo } from 'react';
import * as Yup from 'yup'

// Services
import Axios from '../../../services/request';

// Icons
import { SiProducthunt } from 'react-icons/si'
import { IoLogoModelS } from 'react-icons/io'
import { MdKeyboardArrowLeft, MdToday, MdCreate } from 'react-icons/md';
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
import { IProduct } from './types';

// Styles
import {
	Container,
	ContainerHeader,
	ContainerProduct,
} from './styles';

// Rules - Context
import { SchemaUserSignUp } from '../../../utils/Schema/Product';

// Utils
import { handlerValidationForm } from "../../../utils/Validation/User"

// Context
import { useGetNavigationContext } from '../../../context/Navigation'

const Product: React.FC<IProduct> = ({ children }) => {
	const refForm = useRef(null)
	const { setItemID } = useGetNavigationContext()

	async function handlerSubmitForm(data: any) {
		try {
			const responseAPI = await Axios.post('product/create', data)

			if (responseAPI.data.code !== 200) {
				alert(responseAPI.data.message)
			}

			// @ts-ignore
			refForm?.current?.reset()
			// @ts-ignore
			refForm?.current?.setErrors({})
		} catch (error) {
			console.log(error.message)
		}
	}

	return (
		<Container>
			<ContainerHeader>
				<div
					id='wrapper_header_icon'
					onClick={() => setItemID("All")}
				>
					<MdKeyboardArrowLeft />
				</div>
				<span id='wrapper_header_title'>
					{children}
				</span>
			</ContainerHeader>

			<ContainerProduct
				onSubmit={handlerSubmitForm}
				ref={refForm}
			>
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
						salvar
					</button>
				</Button>
			</ContainerProduct>
		</Container>
	);
}

export default memo(Product);
