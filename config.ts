import { createConfig, http } from 'wagmi'
import { tempo } from 'tempo.ts/chains'
import { metaMask } from 'wagmi/connectors'
 
export const config = createConfig({
  chains: [tempo({ feeToken: '0x20c0000000000000000000000000000000000001' })],
  connectors: [metaMask()], 
  multiInjectedProviderDiscovery: true, 
  transports: {
    [tempo.id]: http(),
  },
})