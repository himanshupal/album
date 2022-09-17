import { Breadcrumb, Layout, Menu } from 'antd'
const { Header, Content, Footer } = Layout
import { Link, useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'

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

			{/* <div className={styles.wrapper}>
			<nav className={styles.navbar}>
				<div className={styles.navGroup}>
					<Link to="/" className={styles.navLink}>
						Home
					</Link>
					<Link to="/market" className={styles.navLink}>
						Market
					</Link>
				</div>
				<div className={styles.navGroup}>
					<Link to="/mint" className={styles.navLink}>
						Mint New
					</Link>
				</div>
			</nav>
			<div className={styles.childrenWrapper}>{children}</div>
		</div> */}
		</Layout>
	)
}

export default CustomLayout
