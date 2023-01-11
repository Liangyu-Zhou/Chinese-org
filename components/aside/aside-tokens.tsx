import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { userStatsCollection } from '../../lib/firebase/collections';
import type { MotionProps } from 'framer-motion';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { Button } from '@components/ui/button';
import BigNumber from 'bignumber.js';

export const variants: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 }
};

type AsideTokensProps = {
  tokenVal?: number;
};
const e18 = '1000000000000000000';
const _0001In18Decimal = '1000000000000000';
export function AsideTokens({ tokenVal }: AsideTokensProps): JSX.Element {
  const BN = BigNumber.clone({ DECIMAL_PLACES: 18 });
  const { address } = useAccount();
  const [BNBalance, setBNBalance] = useState(BN(0));
  const [tick, setTick] = useState(0);
  const [increment, setIncrement] = useState(0);
  async function getBalance(addr: string): Promise<string> {
    const userStatsRef = doc(userStatsCollection(addr), 'stats');
    const userStats = (await getDoc(userStatsRef)).data();
    const balance = userStats?.balance ? userStats?.balance : '0';
    return balance;
  }
  async function updateBalance(addr: string, newBalance: BigNumber) {
    const userStatsRef = doc(userStatsCollection(addr), 'stats');
    await updateDoc(userStatsRef, {
      balance: newBalance.toString(),
      updatedAt: serverTimestamp()
    });
  }

  useEffect(() => {
    if (address && BNBalance.isEqualTo(BN(0))) {
      void getBalance(address).then((balance) => {
        setBNBalance(BN(balance));
      });
    }
    const timeoutId = setTimeout(() => {
      if (address && tick > 0) {
        setIncrement((increment) => increment + 0.001);
        if (tick % 10 == 0) {
          void getBalance(address).then((balance) => {
            setBNBalance(BN(balance));
          });
        }
        if (tick % 100 == 0) {
          void updateBalance(address, BNBalance.plus(increment));
          setIncrement(0);
        }
      }
      setTick((tick) => tick + 1);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [tick, address]);

  return (
    <section
      className={'hover-animation rounded-2xl bg-main-sidebar-background'}
    >
      <div className='mx-5 mt-4 mb-2 flex items-end  gap-3  border-b pb-1 text-2xl font-bold'>
        <img
          src='/assets/data-mining.gif'
          className='h-[50px] w-[50px] rounded-full'
        ></img>
        <p>Login as Mining</p>
      </div>
      <div className='flex flex-row justify-between pl-5 pb-2'>
        <p>balance</p>
      </div>
      <div className='flex items-end justify-between pl-5 pr-5'>
        <p className='text-2xl font-bold '>
          {BNBalance.plus(increment).toFormat(5)}
        </p>
        <p>$CHINESE</p>
      </div>

      <div className='m-5 flex justify-center gap-4'>
        <Button
          className='text-md w-5/12  bg-main-accent py-2
                       font-bold text-white outline-none transition hover:brightness-90 active:brightness-75'
          disabled={true}
        >
          <p className='block'>Withdraw</p>
        </Button>
      </div>
    </section>
  );
}
