import { toHex } from '@/utils'

export const chainIdLocalStorageKey = 'chain_id'
export const ipfsBaseUrl = 'https://ipfs.infura.io/ipfs'

export const ChainId = {
	POLYGON_TESTNET: toHex(80001),
	GOERLI: toHex(5),
}

export const rpcUrls = {
	[ChainId.POLYGON_TESTNET]: ['https://rpc-mumbai.maticvigil.com'],
	[ChainId.GOERLI]: [`https://eth-goerli.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`],
}

export const blockExplorerUrls = {
	[ChainId.POLYGON_TESTNET]: ['https://mumbai.polygonscan.com'],
	[ChainId.GOERLI]: ['https://goerli.etherscan.io/'],
}

export const networkName = {
	[ChainId.POLYGON_TESTNET]: 'Polygon Mumbai',
	[ChainId.GOERLI]: 'Goerli Testnet',
}

export const networkTokenName = {
	[ChainId.POLYGON_TESTNET]: 'Matic',
	[ChainId.GOERLI]: 'Goerli ETH',
}

export const networkToken = {
	[ChainId.POLYGON_TESTNET]: 'MATIC',
	[ChainId.GOERLI]: 'ETH',
}
