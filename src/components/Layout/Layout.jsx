import { useNavigate } from 'react-router-dom'
import { Layout, Menu, Button, Typography, Space } from 'antd'
import { useWeb3 } from '@/context/web3'
import styles from './styles.module.scss'

const { Header, Content } = Layout

const links = [
	{
		label: 'Home',
		key: '/',
	},
	{
		label: 'Mint',
		key: '/mint',
	},
	{
		label: 'Market',
		key: '/market',
	},
]

const CustomLayout = ({ children }) => {
	const { userAddress, connect } = useWeb3()
	const navigate = useNavigate()

	return (
		<Layout>
			<Header className={styles.header}>
				<Menu
					style={{ flex: 1 }}
					theme="dark"
					items={[
						...links,
						...(userAddress
							? [
									{
										label: 'Dashboard',
										key: '/dashboard',
									},
							  ]
							: []),
					]}
					mode="horizontal"
					// defaultSelectedKeys={['2']}
					onClick={({ key }) => navigate(key)}
				/>
				<Button onClick={connect}>
					{userAddress ? 'Connected with ' + userAddress.slice(0, 7) + '...' : `Connect`}
				</Button>
			</Header>
			<Content
				className="site-layout"
				style={{
					padding: '0 50px',
					marginTop: 64,
				}}
			>
				<div
					className="site-layout-background"
					style={{
						padding: 24,
						minHeight: 380,
					}}
				>
					{children}
				</div>
			</Content>
		</Layout>
	)
}

export default CustomLayout
