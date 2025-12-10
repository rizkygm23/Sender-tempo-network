'use client'

import { useConnection, useDisconnect, useSwitchChain } from 'wagmi'
import { tempo } from 'tempo.ts/chains'

export function Account() {
  const account = useConnection()
  const disconnect = useDisconnect()
  const switchChain = useSwitchChain()

  if (!account.address) {
    return (
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Account</h3>
        <p className="text-gray-400">Please connect your wallet</p>
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-4">Account</h3>
      <div className="space-y-4">
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <p className="text-sm text-gray-400 mb-1">Address</p>
          <p className="text-white font-mono text-sm break-all">
            {account.address}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => disconnect.disconnect()}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 font-medium rounded-lg transition-colors duration-200"
          >
            Disconnect
          </button>

          <button
            onClick={() =>
              switchChain.switchChain({
                chainId: tempo.id,
                addEthereumChainParameter: {
                  nativeCurrency: {
                    name: 'USD',
                    decimals: 18,
                    symbol: 'USD',
                  },
                },
              })
            }
            className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 font-medium rounded-lg transition-colors duration-200"
          >
            Add {tempo.name} to Wallet
          </button>
        </div>
      </div>
    </div>
  )
}