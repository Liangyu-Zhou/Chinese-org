import type { MotionProps } from 'framer-motion';
import { Button } from '@components/ui/button';
import { useBalance } from '@lib/context/balance-context';

export const variants: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 }
};

type AsideTokensProps = {
  tokenVal?: number;
};

export function AsideTokens({ tokenVal }: AsideTokensProps): JSX.Element {
  const { balance, increment, loading } = useBalance();
  return (
    <section
      className={'hover-animation rounded-2xl bg-main-sidebar-background'}
    >
      <div className='mx-5 mt-4 mb-2 flex items-end  gap-3  border-b pb-1 text-2xl font-bold'>
        <img
          src='/assets/coin2.gif'
          className='h-[50px] w-[50px] rounded-full'
        ></img>
        <p>Login as Mining</p>
      </div>
      <div className='flex flex-row justify-between pl-5 pb-2'>
        <p>balance</p>
      </div>
      <div className='flex items-end justify-between pl-5 pr-5'>
        {loading ? (
          <p className='text-2xl font-bold '>loading balance...</p>
        ) : (
          <p className='text-2xl font-bold '>
            {balance.plus(increment).toFormat(2)}
          </p>
        )}
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
