import { Link } from 'react-router-dom'

const Header = ({ children }) => {
	return (
		<header>
			<div className="children">
				<Link style={{ margin: '0.5rem' }} to="/">
					Home
				</Link>
				<Link style={{ margin: '0.5rem' }} to="/market">
					Market
				</Link>
				<Link style={{ margin: '0.5rem' }} to="/mint">
					Mint
				</Link>
				<Link style={{ margin: '0.5rem' }} to="/view">
					View
				</Link>
			</div>
			{children}
		</header>
	)
}

export default Header
