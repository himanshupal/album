import Web3Provider from '@/context/web3'
import '@/styles/main.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import Market from '@/pages/Market'
import Dashboard from '@/pages/Dashboard'
import Mint from '@/pages/Mint'
import View from '@/pages/View'

const Router = () => {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/market" element={<Market />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/mint" element={<Mint />} />
					<Route path="/view" element={<View />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	)
}

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Web3Provider>
			<Router />
		</Web3Provider>
	</React.StrictMode>
)
