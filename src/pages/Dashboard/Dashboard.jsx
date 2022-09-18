import { useWeb3 } from '@/context/web3'
import { Space, Typography, Divider, Row, Col } from 'antd'
import { formatEther } from 'ethers/lib/utils'
import { useEffect, useMemo, useState } from 'react'
import CustomCard from '@/components/Card/Card'
import { ipfsBaseUrl } from '@/constants'

const Dashboard = () => {
	const { contract, userAddress } = useWeb3()
	const [tokens, setTokens] = useState([])
	const [userEarning, setUserEarning] = useState('-.--')
	const [userTokensCount, setUserTokensCount] = useState('0')

	useEffect(() => {
		const getSalesValue = async () => {
			try {
				const userEarning = await contract.userEarning(userAddress)
				setUserEarning(formatEther(userEarning))
				const userTokensCount = await contract.userTokenCount(userAddress)
				setUserTokensCount(String(userTokensCount))
			} catch (err) {
				console.error(`getSalesValue:`, err)
			}
		}
		if (userAddress) getSalesValue()
	}, [userAddress])

	useEffect(() => {
		const fetchUserTokens = async () => {
			const tokenIds = await Promise.all(
				new Array(+userTokensCount).fill(null).map(async (_, index) => {
					try {
						return await contract.tokenOfOwnerByIndex(userAddress, index)
					} catch (err) {
						console.error(`fetchUserTokens:1`, err)
					}
				})
			)
			const tokens = await Promise.all(
				tokenIds
					.filter((x) => x)
					.map(async (tokenId) => {
						try {
							const tokenURI = await contract.tokenURI(tokenId)
							const tokenPrice = await contract.priceOfToken(tokenId)
							const isOnSale = await contract.isTokenOnSale(tokenId)
							const tokenData = await fetch(tokenURI)
							return { tokenId, price: tokenPrice, isOnSale, ...(await tokenData.json()) }
						} catch (err) {
							console.error('fetchUserTokens:2', err)
						}
					})
			)
			setTokens(tokens)
		}
		if (+userTokensCount) fetchUserTokens()
	}, [userTokensCount])

	const tokenListBrokenToFour = useMemo(
		() =>
			tokens
				.filter((x) => x)
				.reduce(
					(p, c, x = p.length) => (x && p[p.length - 1].length !== 4 ? (p[p.length - 1].push(c), p) : (p.push([c]), p)),
					[]
				),
		[tokens]
	)

	return (
		<Space direction="vertical" style={{ width: '100%' }}>
			<Typography.Title style={{ textAlign: 'center', margin: 'unset' }}>
				Your lifetime sale is <span style={{ color: 'blue' }}>{userEarning}</span> ETH
			</Typography.Title>

			<Divider />

			<Typography.Title style={{ textAlign: 'center', margin: 'unset' }}>Your Tokens</Typography.Title>

			{tokenListBrokenToFour.map((tokenList, index) => (
				<Row key={index} justify="space-evenly">
					{tokenList.map(({ tokenId, title, image, description, price, isOnSale }, id) => (
						<Col key={id} style={{ padding: 8 }}>
							<CustomCard
								title={title}
								price={price}
								tokenId={tokenId}
								image={`${ipfsBaseUrl}/${image}`}
								description={description}
								key={String(id) + index}
								isOnSale={isOnSale}
								purchaseDisabled
							/>
						</Col>
					))}
				</Row>
			))}
		</Space>
	)
}

export default Dashboard
