import { Dialog } from '@headlessui/react';
import { CustomIcon } from '@components/ui/custom-icon';
import { Button } from '@components/ui/button';
import type { ReactNode, FormEvent } from 'react';

type ReferralCodeModalProps = {
  loading: boolean;
  children: ReactNode;
  available: boolean;
  alreadySet: boolean;
  setReferralCode: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  cancelSetReferralCode: () => void;
};

const referralCodeModalData = {
  title: 'Do you have referral code?',
  description:
    'Enter referral code, then you and your referrer can claim extra 50,000 $CHINESE.',
  cancelLabel: "No, I dont' have one"
} as const;

export function ReferralCodeModal({
  loading,
  children,
  available,
  alreadySet,
  setReferralCode: setReferralCode,
  cancelSetReferralCode: cancelSetReferralCode
}: ReferralCodeModalProps): JSX.Element {
  const { title, description, cancelLabel } = referralCodeModalData;

  return (
    <form
      className='flex h-full flex-col justify-between'
      onSubmit={setReferralCode}
    >
      <div className='flex flex-col gap-6'>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <Dialog.Title className='text-2xl font-bold xs:text-3xl sm:text-4xl'>
              {title}
            </Dialog.Title>
            <Dialog.Description className='text-light-secondary dark:text-dark-secondary'>
              {description}
            </Dialog.Description>
          </div>
        </div>
        {children}
      </div>
      <div className='flex flex-col gap-3 inner:py-2 inner:font-bold'>
        <Button
          className='bg-light-primary text-white transition focus-visible:bg-light-primary/90
                     enabled:hover:bg-light-primary/90 enabled:active:bg-light-primary/80 
                     dark:bg-light-border dark:text-light-primary dark:focus-visible:bg-light-border/90 
                     dark:enabled:hover:bg-light-border/90 dark:enabled:active:bg-light-border/75'
          type='submit'
          loading={loading}
          disabled={!available}
        >
          Confirm referral code
        </Button>
        <Button
          className='border border-light-line-reply hover:bg-light-primary/10 focus-visible:bg-light-primary/10
                     active:bg-light-primary/20 dark:border-light-secondary dark:text-light-border 
                     dark:hover:bg-light-border/10 dark:focus-visible:bg-light-border/10 
                     dark:active:bg-light-border/20'
          onClick={cancelSetReferralCode}
        >
          {cancelLabel}
        </Button>
      </div>
    </form>
  );
}
