import { useWeb3 } from '@/context/web3'
import { Space, Typography, Divider, Row, Col } from 'antd'
import { formatEther } from 'ethers/lib/utils'
import { useEffect, useMemo, useState } from 'react'
import CustomCard from '@/components/Card/Card'

const Dashboard = () => {
	const { contract, userAddress } = useWeb3()
	const [tokens, setTokens] = useState([])
	const [totalSupply, setTotalSupply] = useState('0')
	const [userEarning, setUserEarning] = useState('-.--')

	useEffect(() => {
		const getSalesValue = async () => {
			const userEarning = await contract.userEarning(userAddress)
			setUserEarning(formatEther(userEarning))
			const totalSupply = await contract.totalSupply()
			setTotalSupply(String(totalSupply))
		}
		getSalesValue()
	}, [])

	useEffect(() => {
		const fetchUserTokens = async () => {
			const tokenIds = await Promise.all(
				new Array(+totalSupply).fill(null).map(async (_, index) => {
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
							const tokenData = await fetch(tokenURI)
							return tokenData.json()
						} catch (err) {
							console.error('fetchUserTokens:2', err)
						}
					})
			)
			setTokens(tokens)
		}
		if (+totalSupply) fetchUserTokens()
	}, [totalSupply])

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
		<Space direction="verical">
			<Typography.Title>Your lifetime sales = {userEarning} ETH</Typography.Title>

			<Divider />

			{tokenListBrokenToFour.map((tokenList, index) => (
				<Row key={index}>
					{tokenList.map(({ tokenId, title, image, description, price }, id) => (
						<Col style={{ padding: 8 }}>
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
		</Space>
	)
}

export default Dashboard
