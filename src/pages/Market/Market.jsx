import CustomCard from '@/components/Card/Card'
import { useEffect, useState } from 'react'
import { useWeb3 } from '@/context/web3'
import { useMemo } from 'react'
import { Row, Col } from 'antd'

const Market = () => {
	const { contract } = useWeb3()
	const [tokenList, setTokenList] = useState([])
	const [totalSupply, setTotalSupply] = useState(0)

	useEffect(() => {
		const getTotalSupply = async () => {
			const totalSupply = await contract.totalSupply()
			setTotalSupply(+totalSupply)
		}
		getTotalSupply()
	}, [])

	useEffect(() => {
		const getTokenDetails = async () => {
			const tokenList = await Promise.all(
				new Array(totalSupply).fill(null).map(async (_, index) => {
					try {
						const tokenId = await contract.tokenByIndex(index)
						const tokenUrl = await contract.tokenURI(tokenId)
						const tokenPrice = await contract.priceOfToken(tokenId)
						const isOnSale = await contract.isTokenOnSale(tokenId)
						const tokenData = await fetch(tokenUrl)
						return { tokenId, price: tokenPrice, isOnSale, ...(await tokenData.json()) }
					} catch (err) {
						console.error('getTokenDetails: index', index, err)
					}
				})
			)
			setTokenList(tokenList)
		}

		if (totalSupply) getTokenDetails()
	}, [totalSupply])

	const tokenListBrokenToFour = useMemo(
		() =>
			tokenList
				.filter((x) => x && x.isOnSale)
				.reduce(
					(p, c, x = p.length) => (x && p[p.length - 1].length !== 4 ? (p[p.length - 1].push(c), p) : (p.push([c]), p)),
					[]
				),
		[tokenList]
	)

	return (
		<div className="">
			{tokenListBrokenToFour.map((tokenList, index) => (
				<Row key={index}>
					{tokenList.map(({ tokenId, title, image, description, price }, id) => (
						<Col style={{ padding: 8 }} key={String(id) + index}>
							<CustomCard
								title={title}
								image={image}
								price={price}
								tokenId={tokenId}
								description={description}
								key={String(id) + index}
							/>
						</Col>
					))}
				</Row>
			))}
		</div>
	)
}

export default Market
