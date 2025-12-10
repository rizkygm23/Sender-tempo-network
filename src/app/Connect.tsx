'use client'

import { useConnect, useConnectors, useConnection } from 'wagmi'

export function Connect() {
  const connect = useConnect()
  const connectors = useConnectors()
  const { address } = useConnection()

  if (address) {
    return null
  }

  return (
    <div className="glass-panel rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Connect Your Wallet
      </h2>
      <div className="flex flex-wrap gap-3 justify-center">
        {connectors.map((connector) => (
          <button
            key={connector.id}
            onClick={() => connect.connect({ connector })}
            type="button"
            disabled={connect.isPending}
            className="glass-button px-6 py-3 text-white font-semibold rounded-xl text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {connect.isPending ? 'Connecting...' : `Connect ${connector.name}`}
          </button>
        ))}
      </div>
    </div>
  )
}