import { ipfsBaseUrl } from '@/constants'
import { useWeb3 } from '@/context/web3'
import { useRef, useState } from 'react'
import c from './style.module.scss'
import { Form, Input, Button, Space, Progress } from 'antd'

import 'antd/dist/antd.css'
import { parseEther } from 'ethers/lib/utils'

const Create = () => {
	const { ipfsClient, contract, userAddress } = useWeb3()
	const fileUpload = useRef()

	const [image, setImage] = useState('')
	const [uploadProgress, setUploadProgress] = useState(0)

	const handleUpload = async (e) => {
		try {
			const file = e.target.files?.length ? e.target.files[0] : null
			if (!file) return
			setImage(file)
		} catch (err) {
			console.error('handleUpload:', err)
		}
	}

	const handleSubmit = async ({ title, price, description }) => {
		if (!image) return window.alert('Choose an image first')
		if (!userAddress) return window.alert('Please connect your wallet')

		const imageUploadResponse = await ipfsClient.add(image, {
			progress: (p) => setUploadProgress((p / image.size) * 100),
		})

		console.debug({ imageUploadResponse })

		try {
			const metadataUploadResponse = await ipfsClient.add(
				JSON.stringify({ title, path: imageUploadResponse.path, description })
			)
			console.debug({ metadataUploadResponse })

			const { hash } = await contract.mint(userAddress, metadataUploadResponse.path, parseEther(price))
			window.alert(`Tx ${hash} sent...`)
		} catch (err) {
			window.alert('Please try again...')
			console.error('handleSubmit:', err)
		}
	}

	return (
		<div className={c.wrapper}>
			<Form onFinish={handleSubmit} layout="vertical">
				<input type="file" ref={fileUpload} onChange={handleUpload} accept="image/*" hidden />

				{image && (
					<Form.Item style={{ flexDirection: 'column' }}>
						<img className={c.imagePreview} src={URL.createObjectURL(image)} />
					</Form.Item>
				)}

				<Form.Item>
					<Button htmlType="button" onClick={() => fileUpload.current?.click()}>
						Upload
					</Button>
				</Form.Item>

				<Form.Item label="Title" name="title" required rules={[{ required: true, message: 'Please provide a title!' }]}>
					<Input />
				</Form.Item>

				<Form.Item
					label="Description"
					name="description"
					required
					rules={[{ required: true, message: 'Please provide image description!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Price"
					name="price"
					required
					rules={[{ required: true, message: 'Please input token price in ETH' }]}
				>
					<Input type="number" />
				</Form.Item>

				<Space>
					<Button htmlType="submit">Mint</Button>
					{uploadProgress && <Progress percent={uploadProgress} />}
				</Space>
			</Form>
		</div>
	)
}

export default Create
