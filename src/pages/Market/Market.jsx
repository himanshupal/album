import { useWeb3 } from '@/context/web3'
import { useEffect, useState } from 'react'

const Market = () => {
	const { minter } = useWeb3()
	const [listed, setListed] = useState([])

	useEffect(() => {
		const getListedItems = async () => {
			const list = await minter.fetchItemsListed()
			console.log({ list })
			setListed(list)
		}
		getListedItems()
	}, [])

	return <div className="">Market</div>
}

export default Market
