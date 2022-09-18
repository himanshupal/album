import { toHex } from '@/utils'

export const chainIdLocalStorageKey = 'chain_id'
export const ipfsBaseUrl = 'https://ipfs.io/ipfs'

export const ChainId = {
	POLYGON_TESTNET: toHex(80001),
	GOERLI: toHex(5),
	LOCALHOST: toHex(31337),
}

export const rpcUrls = {
	[ChainId.POLYGON_TESTNET]: [`https://rpc.ankr.com/polygon_mumbai`, `https://rpc-mumbai.maticvigil.com`],
	[ChainId.GOERLI]: [
		`https://eth-goerli.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`,
		`https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`,
		`https://rpc.ankr.com/eth_goerli`,
	],
	[ChainId.LOCALHOST]: ['http://localhost:8545'],
}

export const blockExplorerUrls = {
	[ChainId.POLYGON_TESTNET]: ['https://mumbai.polygonscan.com'],
	[ChainId.GOERLI]: ['https://goerli.etherscan.io/'],
	[ChainId.LOCALHOST]: ['http://etherscan.io/'],
}

export const networkName = {
	[ChainId.POLYGON_TESTNET]: 'Polygon Mumbai',
	[ChainId.GOERLI]: 'Goerli Testnet',
	[ChainId.LOCALHOST]: 'Local Network',
}

export const networkTokenName = {
	[ChainId.POLYGON_TESTNET]: 'Matic',
	[ChainId.GOERLI]: 'Goerli ETH',
	[ChainId.LOCALHOST]: 'TEETH',
}

export const networkToken = {
	[ChainId.POLYGON_TESTNET]: 'MATIC',
	[ChainId.GOERLI]: 'ETH',
	[ChainId.LOCALHOST]: 'ETH',
}
