import cn from 'clsx';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import { ToolTip } from '@components/ui/tooltip';
import { MobileSidebar } from '@components/sidebar/mobile-sidebar';
import type { ReactNode } from 'react';
import type { IconName } from '@components/ui/hero-icon';
import { useBalance } from '@lib/context/balance-context';

type HomeHeaderProps = {
  tip?: string;
  title?: string;
  children?: ReactNode;
  iconName?: IconName;
  className?: string;
  disableSticky?: boolean;
  useActionButton?: boolean;
  useMobileSidebar?: boolean;
  action?: () => void;
};

export function MainHeader({
  tip,
  title,
  children,
  iconName,
  className,
  disableSticky,
  useActionButton,
  useMobileSidebar,
  action
}: HomeHeaderProps): JSX.Element {
  const { balance, increment, loading } = useBalance();

  return (
    <header
      className={cn(
        'hover-animation even z-10 bg-main-background/60 px-4 py-2 backdrop-blur-md',
        !disableSticky && 'sticky top-0',
        className ?? 'flex items-center gap-6'
      )}
    >
      {useActionButton && (
        <Button
          className='dark-bg-tab group relative p-2 hover:bg-light-primary/10 active:bg-light-primary/20 
                     dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20'
          onClick={action}
        >
          <HeroIcon
            className='h-5 w-5'
            iconName={iconName ?? 'ArrowLeftIcon'}
          />
          <ToolTip tip={tip ?? 'Back'} />
        </Button>
      )}
      {title && (
        <div className='flex items-end gap-8'>
          {useMobileSidebar && <MobileSidebar />}
          <h2 className='text-xl font-bold' key={title}>
            {title}
          </h2>
          <div className='flex items-end justify-between pl-5 pr-5 lg:hidden'>
            <p className='pr-2'>balance:</p>
            {loading ? (
              <p className='text-2xl font-bold '>loading balance...</p>
            ) : (
              <p className='text-2xl font-bold '>
                {balance.plus(increment).toFormat(2)}
              </p>
            )}
          </div>
        </div>
      )}
      {children}
    </header>
  );
}
