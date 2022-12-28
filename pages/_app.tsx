import '@styles/globals.scss';

import { AuthContextProvider } from '@lib/context/auth-context';
import { ThemeContextProvider } from '@lib/context/theme-context';
import { AppHead } from '@components/common/app-head';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, goerli } from 'wagmi/chains';
import { fusion } from '../components/fusion/chain';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

// eslint-disable-next-line @typescript-eslint/ban-types
type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const { chains, provider, webSocketProvider } = configureChains(
  [
    fusion,
    mainnet,
    polygon,
    optimism,
    arbitrum,
    ...(process.env.REACT_APP_ENABLE_TESTNETS === 'true' ? [goerli] : [])
  ],
  [
    alchemyProvider({ apiKey: '_Sh7nSMIHg5SSrr8gszB6ne5zjnXV0yH' }),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'Chinese.org',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider
});

export default function App({
  Component,
  pageProps
}: AppPropsWithLayout): ReactNode {
  const getLayout = Component.getLayout ?? ((page): ReactNode => page);

  return (
    <>
      <AppHead />
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={lightTheme({
            accentColor: '#ff7235',
            accentColorForeground: 'white',
            borderRadius: 'small',
            fontStack: 'system',
            overlayBlur: 'small'
          })}
        >
          <AuthContextProvider>
            <ThemeContextProvider>
              {getLayout(<Component {...pageProps} />)}
            </ThemeContextProvider>
          </AuthContextProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}
