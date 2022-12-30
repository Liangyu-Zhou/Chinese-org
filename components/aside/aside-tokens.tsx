import type { MotionProps } from 'framer-motion';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { Chinese } from '../../lib/contract/contract';
import { BigNumber } from 'ethers';
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
  const [tick, setTick] = useState(0);
  async function getBalance(addr: string) {
    //balanceOf is a promise
    const balanceBN = await Chinese.balanceOf(addr);
    const balance = balanceBN.div(BigNumber.from(e18)).toNumber();
    setBalance(balance);
  }
  useEffect(() => {
    if (address) {
      void getBalance(address);
    }
    const timeoutId = setTimeout(() => {
      if (address) {
        void getBalance(address);
      }
      setTick((tick) => tick + 1);
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [tick, address]);

  return (
    <section
      className={'hover-animation rounded-2xl bg-main-sidebar-background'}
    >
      <div className='ml-5 mr-5 flex flex-row justify-between pt-2 pb-1 text-sm'>
        <p>
          To see your $CHINESE token, import token address
          0xC7B62fbe13A079B0daFF452AFe1E21b843aF1831 to your wallet
        </p>
      </div>

      <div className='ml-5 mr-5 flex flex-row justify-between pt-2 pb-1'>
        <p>$CHINESE Price</p>
        <p>≈$0.00000024 USD</p>
      </div>
      <div className='ml-5 mr-5 flex flex-row justify-between pt-1 pb-2'>
        <p>Your $CHINESE</p>
        <p>
          {balance}≈${(balance * 0.00000024).toFixed(8)} USD
        </p>
      </div>
    </section>
  );
}
