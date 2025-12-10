'use client'

import { useConnection } from 'wagmi'
import { Hooks } from 'tempo.ts/wagmi'

export function TokenMetadata() {
  const { address } = useConnection()
  const tokenMetadata = Hooks.token.useGetMetadata({
    token: '0x20c0000000000000000000000000000000000001',
  })

  if (!address) {
    return (
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Token Metadata</h3>
        <p className="text-gray-400">Connect wallet to view token metadata</p>
      </div>
    )
  }

  if (tokenMetadata.isLoading) {
    return (
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Token Metadata</h3>
        <div className="flex items-center gap-2 text-gray-400">
          <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading token metadata...
        </div>
      </div>
    )
  }

  if (tokenMetadata.error) {
    return (
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Token Metadata</h3>
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <p className="text-red-300 text-sm">Error loading token metadata</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-4">Token Metadata</h3>
      {tokenMetadata.data && (
        <div className="space-y-3">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-sm text-gray-400 mb-1">Name</p>
            <p className="text-white font-semibold">{tokenMetadata.data.name}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-sm text-gray-400 mb-1">Symbol</p>
            <p className="text-white font-semibold">{tokenMetadata.data.symbol}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <p className="text-sm text-gray-400 mb-1">Decimals</p>
            <p className="text-white font-semibold">{tokenMetadata.data.decimals}</p>
          </div>
        </div>
      )}
    </div>
  )
}