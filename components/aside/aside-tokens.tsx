import type { MotionProps } from 'framer-motion';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { Chinese } from '../../lib/contract/contract';
import Web3 from 'web3';

export const variants: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 }
};

type AsideTokensProps = {
  tokenVal?: number;
};
const e18 = '1000000000000000000';
export function AsideTokens({ tokenVal }: AsideTokensProps): JSX.Element {
  const { address } = useAccount();
  const [balance, setBalance] = useState(0);
  async function getBalance(addr: string) {
    //balanceOf is a promise
    const balanceBN = await Chinese.balanceOf(addr);
    const balance = Web3.utils
      .toBN(balanceBN)
      .div(Web3.utils.toBN(e18))
      .toNumber();
    console.log('enter getBalance, balance:', balance);
    setBalance(balance);
  }
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (address) {
        getBalance(address);
      }
    }, 5000);
    return () => clearTimeout(timeoutId);
  });
  return (
    <section
      className={'hover-animation rounded-2xl bg-main-sidebar-background'}
    >
      <div className='ml-5 mr-5 flex flex-row justify-between pt-2 pb-1'>
        <p>$CHINESE Price</p>
        <p>≈$0.0000002396 USD</p>
      </div>
      <div className='ml-5 mr-5 flex flex-row justify-between pt-1 pb-2'>
        <p>Your $CHINESE</p>
        <p>
          {balance}≈${balance * 0.0000002396} USD
        </p>
      </div>
    </section>
  );
}
