import React, { useState, memo } from 'react'

// Icons
import { MdDoneAll, MdCreate } from 'react-icons/md'

// Styles
import {
	Container, ContainerItem,
	ItemContainer
} from './styles'

// Types
import { INavigation } from './types'

// Context
import { useGetNavigationContext } from '../../context/Navigation'

const Navigation: React.FC<INavigation> = () => {
	const { itemFocus, itemID, setItemID } = useGetNavigationContext()
	const [ listItems ] = useState<Array<any>>([
		{
			icon: <MdCreate />,
			name: 'Product'
		},
		{
			icon: <MdDoneAll />,
			name: 'All'
		}
	])

	function handlerSetItemID(nameItem: string) {
		setItemID(nameItem)
	}

	return (<Container>
		{
			itemFocus === true && listItems.length >= 0 && listItems.map((item, index) => itemID === item?.name ?
				(
					<ContainerItem
						onClick={() => handlerSetItemID(item?.name)}
						containerItemSelected={true}
						key={index}
					>
						<ItemContainer
							itemBackgroundColor='var(--icon-container-selected)'
							itemSvgColor='var(--icon-status-selected)'
						>
							{item?.icon}
						</ItemContainer>
					</ContainerItem>
				) :
				(
					<ContainerItem
						onClick={() => handlerSetItemID(item?.name)}
						key={index}
					>
						<ItemContainer>
							{item?.icon}
						</ItemContainer>
					</ContainerItem>
				))
		}
	</Container>)
}

export default memo(Navigation);
