import Web3Provider from '@/context/web3'
import '@/styles/main.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from '@/components/Header'
import Home from '@/pages/Home'
import Market from '@/pages/Market'
import Mint from '@/pages/Mint'
import View from '@/pages/View'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/market" element={<Market />} />
				<Route path="/mint" element={<Mint />} />
				<Route path="/view" element={<View />} />
			</Routes>
		</BrowserRouter>
	)
}

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Web3Provider>
			<Header>
				<Router />
			</Header>
		</Web3Provider>
	</React.StrictMode>
)
