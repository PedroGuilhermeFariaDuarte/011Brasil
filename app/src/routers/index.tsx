import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// Components
import Wrapper from '../components/WrapperRouter'

const Router: React.FC = () => <BrowserRouter>
	<Switch>
		<Route path='/' exact={true} component={Wrapper} />
	</Switch>
</BrowserRouter>

export default Router
