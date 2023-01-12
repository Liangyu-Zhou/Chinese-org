import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import BigNumber from 'bignumber.js';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { userStatsCollection } from '../../lib/firebase/collections';

type BalanceContext = {
  balance: BigNumber;
  increment: number;
  loading: boolean;
};

export const BalanceContext = createContext<BalanceContext | null>(null);

type BalanceContextProviderProps = {
  children: ReactNode;
};

export function BalanceContextProvider({
  children
}: BalanceContextProviderProps): JSX.Element {
  const BN = BigNumber.clone({ DECIMAL_PLACES: 18 });
  const { address } = useAccount();
  const [balance, setBalance] = useState(BN(0));
  const [tick, setTick] = useState(0);
  const [increment, setIncrement] = useState(0);
  const [loading, setLoading] = useState(true);

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
    if (address && balance.isEqualTo(BN(0))) {
      void getBalance(address).then((balance) => {
        setBalance(BN(balance));
        setLoading(false);
      });
    }
    const timeoutId = setTimeout(() => {
      if (address && tick > 0) {
        setIncrement((increment) => increment + 0.01);
        if (tick % 10 == 0) {
          void getBalance(address).then((balance) => {
            setBalance(BN(balance));
          });
        }
        if (tick % 100 == 0) {
          void updateBalance(address, balance.plus(increment));
          setIncrement(0);
        }
      }
      setTick((tick) => tick + 1);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [tick, address]);

  const value: BalanceContext = {
    balance,
    increment,
    loading
  };
  return (
    <BalanceContext.Provider value={value}>{children}</BalanceContext.Provider>
  );
}

export function useBalance(): BalanceContext {
  const context = useContext(BalanceContext);
  if (!context)
    throw new Error(
      'useBalance must be used within an BalanceContext Provider'
    );

  return context;
}
