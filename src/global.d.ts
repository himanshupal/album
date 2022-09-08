import { ethers } from 'ethers'
import { formatEther, parseEther } from 'ethers/lib/utils'

declare global {
	interface Window {
		parseEther: typeof parseEther
		formatEther: typeof formatEther
		contract: ethers.Contract
	}
}
