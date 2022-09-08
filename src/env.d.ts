/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string | boolean | undefined>> {
	readonly VITE_CHAIN_ID: string
	readonly VITE_INFURA_PROJECT_ID: string
	readonly VITE_INFURA_PROJECT_SECRET: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
