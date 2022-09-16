import { ipfsBaseUrl } from '@/constants'
import { useWeb3 } from '@/context/web3'
import { useRef, useState } from 'react'
import c from './style.module.scss'

const Create = () => {
	const { ipfsClient, contract, userAddress } = useWeb3()
	const fileUpload = useRef()

	const [name, setName] = useState('')
	const [image, setImage] = useState('')
	const [price, setPrice] = useState('')
	const [description, setDescription] = useState('')

	const [uploadProgress, setUploadProgress] = useState(0)

	const handleUpload = async (e) => {
		if (!userAddress) return window.alert('Please connect wallet first...')

		try {
			const file = e.target.files?.length ? e.target.files[0] : null
			if (!file) return

			const imageUploadResponse = await ipfsClient.add(file, {
				progress: (p) => setUploadProgress((p / file.size) * 100),
			})

			console.debug({ imageUploadResponse })
			setImage(imageUploadResponse.path)
		} catch (err) {
			window.alert('Please try again...')
			console.error('handleUpload:', err)
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!image) return window.alert('Upload the image first...')
		if (!name || !description || !price) return window.alert('Fill all details...')

		try {
			const metadataUploadResponse = await ipfsClient.add(JSON.stringify(name, image, description))
			console.debug({ metadataUploadResponse })

			const { hash } = await contract.mint(userAddress, price,)
			window.alert(`Tx ${hash} sent...`)
		} catch (err) {
			window.alert('Please try again...')
			console.error('handleSubmit:', err)
		}
	}

	return (
		<div className={c.wrapper} onSubmit={handleSubmit}>
			<form>
				<div className="">
					<img src="" />

					<input type="file" ref={fileUpload} onChange={handleUpload} accept="image/*" hidden />
					<button type="button" onClick={() => fileUpload.current?.click()}>
						Upload
					</button>
				</div>

				<div className="">
					<label htmlFor="">Title</label>
					<input required value={name} onChange={({ target }) => setName(target.value)} />
				</div>

				<div className="">
					<label htmlFor="">A little information about it</label>
					<input required value={description} onChange={({ target }) => setDescription(target.value)} />
				</div>

				<div className="">
					<label htmlFor="">Price</label>
					<input required value={price} onChange={({ target }) => setPrice(target.value)} />
				</div>

				<button type="submit">Mint</button>
			</form>
		</div>
	)
}

export default Create
