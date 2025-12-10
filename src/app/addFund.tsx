'use client'

import { Hooks } from 'tempo.ts/wagmi'
import { useConnection } from 'wagmi'

export function AddFunds() {
  const { address } = useConnection()
  const { mutate, isPending, data } = Hooks.faucet.useFundSync()

  return (
    <div>
      <p className="text-gray-400 mb-4">
        Get test tokens from the faucet to start using the Tempo network.
      </p>
      {data && (
        <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
          <p className="text-green-300 text-sm">
            ✅ Funds added successfully!
          </p>
        </div>
      )}
      <button
        onClick={() => {
          if (address) {
            mutate({ account: address })
          }
        }}
        disabled={isPending || !address}
        className="glass-button w-full sm:w-auto px-6 py-3 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Adding Funds...
          </span>
        ) : (
          'Add Funds'
        )}
      </button>
    </div>
  )
}