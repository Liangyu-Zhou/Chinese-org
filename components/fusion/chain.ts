import { Chain } from '@wagmi/core';

export const fusion: Chain = {
  id: 32659,
  name: 'Fusion',
  network: 'fusion',
  nativeCurrency: {
    decimals: 18,
    name: 'Fusion',
    symbol: 'FSN'
  },
  rpcUrls: {
    default: { http: ['https://mainnet.fusionnetwork.io'] }
  },
  blockExplorers: {
    etherscan: { name: 'fSNEX', url: 'https://fsnex.com' },
    default: { name: 'fSNEX', url: 'https://fsnex.com' }
  }
};
