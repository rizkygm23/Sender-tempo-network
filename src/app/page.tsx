import { AddFunds } from './addFund'
import { SendPaymentWithMemo } from './SendPaymentWithMemo'
import { TokenMetadata } from './balance'
import { Account } from './Account'
import { Connect } from './Connect'

export default function Home() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white pb-2 tracking-tight">
            Tempo Wallet
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Manage your assets and send payments on the <span className="text-blue-400 font-medium">Tempo network</span> with style.
          </p>
        </div>

        {/* Connect Section */}
        <div className="transform transition-all hover:scale-[1.01] duration-300">
          <Connect />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Card */}
          <div className="glass-panel rounded-2xl p-6 h-full transition-transform hover:-translate-y-1 duration-300">
            <Account />
          </div>

          {/* Token Metadata Card */}
          <div className="glass-panel rounded-2xl p-6 h-full transition-transform hover:-translate-y-1 duration-300">
            <TokenMetadata />
          </div>
        </div>

        {/* Add Funds Section */}
        <div className="glass-panel rounded-2xl p-6 transition-transform hover:-translate-y-1 duration-300">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">🚰</span> Faucet
          </h2>
          <AddFunds />
        </div>

        {/* Send Payment Section */}
        <div className="glass-panel rounded-2xl p-6 transition-transform hover:-translate-y-1 duration-300">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-2xl">💸</span> Send Payment
          </h2>
          <SendPaymentWithMemo />
        </div>

        {/* Footer info or padding */}
        <div className="h-12"></div>
      </div>
    </div>
  )
}