import { InstagramOutlined, TwitterOutlined, FacebookOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Space, Row, Col, Typography, Form, Input, Button, Divider, Tag } from 'antd'
import styles from './style.module.scss'
import { Link } from 'react-router-dom'
import { Fragment } from 'react'
import 'antd/dist/antd.css'

const Home = () => {
	const subscribe = ({ email }) => {
		console.log(`User ${email} subscribed`)
	}

	return (
		<Fragment>
			<Row align="middle">
				<Col span={12}>
					<Space direction="vertical" align="center" className={styles.space}>
						<Typography.Title>
							<span style={{ color: '#1890ff' }}>NFT</span> MARKETPLACE
						</Typography.Title>
						<div style={{ width: 330, display: 'flex', flexDirection: 'column', gap: 8 }}>
							<Tag>Organized place for your NFTs</Tag>
							<Tag>Multiple Networks supported</Tag>
							<Tag>Secure Transactions on Blockchain</Tag>
							<Tag>Free listing and very low commision for selling</Tag>
							<Button href="/market" style={{ marginTop: 16 }} icon={<ArrowRightOutlined />}>
								Go to Market
							</Button>
						</div>
					</Space>
				</Col>
				<Col span={12}>
					<Space direction="vertical" align="center" className={styles.space}>
						<img src="/placeholder.jpg" style={{ borderRadius: 4 }} />
					</Space>
				</Col>
			</Row>

			<Divider />

			<Row align="middle" justify="center">
				<Col span={8}>
					<Form layout="vertical" onFinish={subscribe}>
						<Form.Item name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
							<Input type="email" placeholder="Enter your email to subscribe" style={{ textAlign: 'center' }} />
						</Form.Item>
						<Form.Item>
							<Button style={{ width: '100%' }} htmlType="submit">
								Subscribe to latest updates
							</Button>
						</Form.Item>
					</Form>
					<div className={styles.icons}>
						<Link to="//instagram.com" target="_blank">
							<InstagramOutlined />
						</Link>
						<Link to="//twitter.com" target="_blank">
							<TwitterOutlined />
						</Link>
						<Link to="//facebook.com" target="_blank">
							<FacebookOutlined />
						</Link>
					</div>
				</Col>
			</Row>

			<Divider />
		</Fragment>
	)
}

export default Home
