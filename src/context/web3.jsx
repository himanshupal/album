import {
	blockExplorerUrls,
	ChainId,
	chainIdLocalStorageKey,
	networkName,
	networkToken,
	networkTokenName,
	rpcUrls,
} from '@/constants'
import marketplace from '@/deployments/marketplace'
import { toHex } from '@/utils'
import { ethers } from 'ethers'
import { formatEther, parseEther } from 'ethers/lib/utils'
import { create } from 'ipfs-http-client'
import { createContext, useContext, useEffect, useState } from 'react'

const chainIdFromLS = window.localStorage.getItem(chainIdLocalStorageKey)

const chainId = toHex(chainIdFromLS || import.meta.env.VITE_CHAIN_ID || ChainId.GOERLI)
const defaultProvider = new ethers.providers.JsonRpcProvider(rpcUrls[chainId][0])
const defaultContract = new ethers.Contract(marketplace.address[chainId], marketplace.abi, defaultProvider)

const ipfsClient = create({
	host: 'ipfs.infura.io',
	protocol: 'https',
	port: 5001,
	headers: {
		authorization: `Basic ${btoa(
			import.meta.env.VITE_INFURA_PROJECT_ID + ':' + import.meta.env.VITE_INFURA_PROJECT_SECRET
		)}`,
	},
})

const Web3Context = createContext({
	provider: defaultProvider,
	contract: defaultContract,
	ipfsClient,

	connect: () => {},
	userAddress: null,
	signer: null,
	wallet: null,
})

export const useWeb3 = () => useContext(Web3Context)

const Web3Provider = ({ children }) => {
	const [signer, setSigner] = useState(null)
	const [wallet, setWallet] = useState(null)
	const [contract, setContract] = useState(defaultContract)
	const [userAddress, setUserAddress] = useState(null)
	const [provider, setProvider] = useState(defaultProvider)

	const handleAccountChange = ([account]) => setUserAddress(window.ethereum.selectedAddress || account)

	const prepareWallet = async (wallet) => {
		if (wallet.chainId !== chainId) {
			try {
				await window.ethereum.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId }],
				})
				window.localStorage.setItem(chainIdLocalStorageKey, chainId)
			} catch (err) {
				if (err.code === 4902) {
					await window.ethereum.request({
						method: 'wallet_addEthereumChain',
						params: [
							{
								chainId: chainId,
								chainName: networkName[chainId],
								rpcUrls: rpcUrls[chainId],
								blockExplorerUrls: blockExplorerUrls[chainId],
								nativeCurrency: {
									name: networkTokenName[chainId],
									symbol: networkToken[chainId],
									decimals: 18,
								},
							},
						],
					})
					window.localStorage.setItem(chainIdLocalStorageKey, chainId)
				} else {
					console.error('Error switching chains:', err.message)
				}
			}
		}

		const [account] = await window.ethereum.request({
			method: 'eth_requestAccounts',
		})

		const currentAddress = window.ethereum.selectedAddress || account

		setWallet(wallet)
		setUserAddress(currentAddress)
		setProvider(new ethers.providers.Web3Provider(wallet))
	}

	const connect = () => {
		const provider = window.ethereum
		if (!provider) return window.alert('Please install Metamask to use the app!')

		window.parseEther = parseEther
		window.formatEther = formatEther

		prepareWallet(provider)

		const callBack = () => {
			window.ethereum.removeAllListeners('chainChanged')
			window.ethereum.removeAllListeners('accountsChanged')
		}

		window.ethereum.on('chainChanged', () => window.location.reload())
		window.ethereum.on('accountsChanged', handleAccountChange)

		return callBack
	}

	useEffect(() => {
		if (!!userAddress) {
			const signer = provider.getSigner(userAddress)
			setContract(defaultContract.connect(signer))
			window.contract = contract.connect(signer)
			setSigner(signer)
		}
	}, [userAddress, provider])

	// Comment this line to disable automatic popup
	useEffect(() => connect(), [])

	return (
		<Web3Context.Provider value={{ userAddress, wallet, provider, signer, connect, contract, ipfsClient }}>
			{children}
		</Web3Context.Provider>
	)
}

export default Web3Provider
