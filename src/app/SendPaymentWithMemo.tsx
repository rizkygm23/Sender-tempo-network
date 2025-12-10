'use client'

import { Hooks } from 'tempo.ts/wagmi'
import { parseUnits, stringToHex, pad } from 'viem'
import { useConnection } from 'wagmi'
import { useState } from 'react'

export function SendPaymentWithMemo() {
  const sendPayment = Hooks.token.useTransferSync()
  const { address } = useConnection()
  const [amount, setAmount] = useState('100')
  const defaultRecipient = '0xD554D2Bb67bE576913c5B8b0155aE1e2D6C5A496'

  if (!address) {
    return (
      <p className="text-gray-400">Please connect your wallet to send payments</p>
    )
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)

        const recipient = (formData.get('recipient') || defaultRecipient) as `0x${string}`
        const memo = (formData.get('memo') || '') as string
        const amountValue = formData.get('amount') as string || amount

        try {
          sendPayment.mutate({
            amount: parseUnits(amountValue, 6),
            to: recipient,
            token: '0x20c0000000000000000000000000000000000001',
            feeToken: '0x20c0000000000000000000000000000000000001',
            memo: memo ? pad(stringToHex(memo), { size: 32 }) : undefined,
          })
        } catch (error) {
          console.error('Error parsing amount:', error)
        }
      }}
      className="space-y-6"
    >
      {sendPayment.data && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
          <p className="text-green-300 text-sm mb-2">✅ Transaction successful!</p>
          <a
            href={`https://explore.tempo.xyz/tx/${sendPayment.data.receipt.transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline text-sm break-all"
          >
            View transaction on explorer
          </a>
        </div>
      )}

      {sendPayment.error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <p className="text-red-300 text-sm">
            ❌ Error: {sendPayment.error.message || 'Transaction failed'}
          </p>
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="recipient" className="block text-sm font-medium text-gray-300">
          Recipient Address
        </label>
        <input
          type="text"
          name="recipient"
          id="recipient"
          defaultValue={defaultRecipient}
          placeholder="0x..."
          required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-300">
          Amount
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="100"
          min="0"
          step="0.000001"
          required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <p className="text-xs text-gray-500">Enter the amount in tokens (6 decimals)</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="memo" className="block text-sm font-medium text-gray-300">
          Memo (Optional)
        </label>
        <input
          type="text"
          name="memo"
          id="memo"
          placeholder="Optional memo message"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={sendPayment.isPending}
          className="glass-button w-full px-6 py-3 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {sendPayment.isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            'Send Payment'
          )}
        </button>
      </div>
    </form>
  )
}