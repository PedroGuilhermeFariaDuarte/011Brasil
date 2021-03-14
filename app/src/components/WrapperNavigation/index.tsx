import React, { memo } from 'react'

// Types
import { IWrapperNavigation } from './types'

// Context
import { useGetNavigationContext } from '../../context/Navigation'

// Components
import Product from '../subNavigations/Product'
import Show from '../subNavigations/Show'

// Styles
import { Container } from './styles'

const WrapperNavigation: React.FC<IWrapperNavigation> = () => {
	const { itemFocus, itemID } = useGetNavigationContext()

	return (<Container>
		{
			(itemFocus === true && itemID === 'Product') && (
				<Product>
					<span>Produtos</span>
				</Product>
			)
		}

		{
			(itemFocus === true && itemID === 'All') && (
				<Show>
					<span>Show</span>
				</Show>
			)
		}
	</Container>)
}

export default memo(WrapperNavigation);
