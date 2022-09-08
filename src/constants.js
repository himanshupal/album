import { toHex } from '@/utils'

export const chainIdLocalStorageKey = 'chain_id'
export const ipfsBaseUrl = 'https://ipfs.infura.io/ipfs'

export const ChainId = {
	POLYGON_TESTNET: toHex(80001),
}

export const rpcUrls = {
	[ChainId.POLYGON_TESTNET]: ['https://rpc-mumbai.maticvigil.com'],
}

export const blockExplorerUrls = {
	[ChainId.POLYGON_TESTNET]: ['https://mumbai.polygonscan.com'],
}

export const networkName = {
	[ChainId.POLYGON_TESTNET]: 'Polygon Mumbai',
}

export const networkTokenName = {
	[ChainId.POLYGON_TESTNET]: 'Matic',
}

export const networkToken = {
	[ChainId.POLYGON_TESTNET]: 'MATIC',
}
