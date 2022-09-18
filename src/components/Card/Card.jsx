import { useWeb3 } from '@/context/web3'
import { Card, Avatar, Typography, Popconfirm, message } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { formatEther } from 'ethers/lib/utils'

const CustomCard = ({ tokenId, title, description, image, price, purchaseDisabled, isOnSale }) => {
	const { contract } = useWeb3()
	const [showConfirmDialog, setShowConfirmDialog] = useState(false)
	const [loading, setLoading] = useState(false)

	const showConfirm = () => setShowConfirmDialog((s) => !s)

	const initiatePurchase = async () => {
		try {
			setLoading(true)
			let hash
			if (purchaseDisabled) {
				console.debug(`listing for sale`)
				;({ hash } = await contract.setTokenSaleStatus(tokenId, !isOnSale))
			} else {
				console.debug(`starting purchase`)
				;({ hash } = await contract.purchase(tokenId, { value: price }))
			}
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
			<Typography.Link onClick={showConfirm}>
				{purchaseDisabled ? (isOnSale ? `Hide from Market` : `List for Sale`) : `Buy for ${formatEther(price)} ETH`}
			</Typography.Link>
		</Popconfirm>
	)

	const EditTokenPrice = () => {
		return (
			<div>
				{`${formatEther(price)} ETH `}
				<EditOutlined />
			</div>
		)
	}

	return (
		<Card
			style={{ width: 300 }}
			cover={<img src={image} />}
			actions={[<ConfirmDialog /> /* ...(purchaseDisabled ? [<EditTokenPrice />] : []) */]}
		>
			<Card.Meta avatar={<Avatar src={image} />} title={title} description={description} />
		</Card>
	)
}

export default CustomCard
