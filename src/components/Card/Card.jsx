import { useWeb3 } from '@/context/web3'
import { Card, Avatar, Typography, Popconfirm, message } from 'antd'
import { formatEther } from 'ethers/lib/utils'
import { useState } from 'react'

const CustomCard = ({ tokenId, title, description, image, price }) => {
	const { contract } = useWeb3()
	const [showConfirmDialog, setShowConfirmDialog] = useState(false)
	const [loading, setLoading] = useState(false)

	const showConfirm = () => setShowConfirmDialog((s) => !s)

	const initiatePurchase = async () => {
		try {
			setLoading(true)
			const { hash } = await contract.purchase(tokenId, { value: price })
			message.success(`Tx sent for purchase`, hash)
		} catch (err) {
			console.error('initiatePurchase:', err)
			message.error(`There was some error, Please try again`)
		} finally {
			setLoading(false)
			setShowConfirmDialog(false)
		}
	}

	const ConfirmDialog = () => (
		<Popconfirm
			title="Are you sure?"
			open={showConfirmDialog}
			onConfirm={initiatePurchase}
			onCancel={() => setShowConfirmDialog(false)}
			okButtonProps={{ loading }}
		>
			<Typography.Link onClick={showConfirm}>Buy for {formatEther(price)} ETH</Typography.Link>
		</Popconfirm>
	)

	return (
		<Card style={{ width: 300 }} cover={<img src={image} />} actions={[<ConfirmDialog />]}>
			<Card.Meta avatar={<Avatar src={image} />} title={title} description={description} />
		</Card>
	)
}

export default CustomCard
