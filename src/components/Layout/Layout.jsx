import { Layout, Menu } from 'antd'
const { Header, Content } = Layout
import { useNavigate } from 'react-router-dom'

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
	{
		label: 'Dashboard',
		key: '/dashboard',
	},
]

const CustomLayout = ({ children }) => {
	const navigate = useNavigate()

	return (
		<Layout>
			<Header
				style={{
					position: 'fixed',
					zIndex: 1,
					width: '100%',
				}}
			>
				<div className="logo" />
				<Menu
					theme="dark"
					items={links}
					mode="horizontal"
					defaultSelectedKeys={['2']}
					onClick={({ key }) => navigate(key)}
				/>
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
