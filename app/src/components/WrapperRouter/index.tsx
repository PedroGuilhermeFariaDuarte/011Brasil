import React from 'react'

// Pages
import Wrapper from '../Wrapper'

// Pages
import WrapperNavigation from '../WrapperNavigation'

// Components
import Navigation from '../Navigation'

// Context
import NavigationContextProvider from '../../context/Navigation'

const WrapperRouter: React.FC = () => (
	<Wrapper>
		<NavigationContextProvider>
			<Navigation />
			<WrapperNavigation />
		</NavigationContextProvider>
	</Wrapper>
)

export default WrapperRouter
