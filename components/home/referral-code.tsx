/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  UpdateUserAndReferrerBalance,
  checkReferralCodeExsits,
  updateReferredBy
} from '@lib/firebase/utils';
import { useAuth } from '@lib/context/auth-context';
import { useModal } from '@lib/hooks/useModal';
import { sleep } from '@lib/utils';
import { Modal } from '@components/modal/modal';
import { ReferralCodeModal } from '@components/modal/referral-code-modal';
import { InputField } from '@components/input/input-field';

import { usersCollection } from '../../lib/firebase/collections';
import { useCollection } from '@lib/hooks/useCollection';
import { query, where } from 'firebase/firestore';

import type { FormEvent, ChangeEvent } from 'react';
type ReferralCodeProps = {
  referralCode: string | string[] | undefined;
};
export function ReferralCode({ referralCode }: ReferralCodeProps): JSX.Element {
  const [alreadySet, setAlreadySet] = useState(false);
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visited, setVisited] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useAuth();
  const { open, openModal, closeModal } = useModal();
  const { data: referrerData } = useCollection(
    query(usersCollection, where('referralCode', '==', inputValue)),
    { allowNull: true }
  );
  const checkCodeExistence = async (code: string): Promise<void> => {
    if (code.length > 0) {
      const empty = await checkReferralCodeExsits(code);
      if (!empty) setAvailable(true);
      else {
        setAvailable(false);
        setErrorMessage('referral code not exsits.');
      }
    }
  };

  useEffect(() => {
    if (referralCode && typeof referralCode === 'string') {
      setInputValue(referralCode);
      void checkCodeExistence(referralCode);
    }
    if (user?.referredBy == null) openModal();
    else setAlreadySet(true);
  }, []);

  useEffect(() => {
    if (!visited && inputValue.length > 0) setVisited(true);

    if (visited) {
      if (errorMessage) setErrorMessage('');
      void checkCodeExistence(inputValue);
    }
  }, [inputValue]);

  const setReferralCode = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!available) return;
    setLoading(true);
    await sleep(500);

    if (referrerData) {
      await UpdateUserAndReferrerBalance(
        referrerData[0]?.id as string,
        user?.id as string
      );
      await updateReferredBy(user?.id as string, referrerData[0]?.id);
    }

    closeModal();
    setLoading(false);
    setInputValue('');
    setVisited(false);
    setAvailable(false);
    toast.success('Referral code set successfully');
  };

  const cancelSetReferralCode = (): void => {
    closeModal();
    if (!alreadySet) void updateReferredBy(user?.id as string, 'empty');
  };

  const handleChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void =>
    setInputValue(value);

  return (
    <>
      <Modal
        modalClassName='flex flex-col gap-6 max-w-xl bg-main-background w-full p-8 rounded-2xl h-[576px]'
        open={open}
        closeModal={cancelSetReferralCode}
      >
        <ReferralCodeModal
          loading={loading}
          available={available}
          alreadySet={alreadySet}
          setReferralCode={setReferralCode}
          cancelSetReferralCode={cancelSetReferralCode}
        >
          <InputField
            label='referral code'
            inputId='referredBy'
            inputValue={inputValue}
            errorMessage={errorMessage}
            handleChange={handleChange}
            handleKeyboardShortcut={handleChange}
          />
        </ReferralCodeModal>
      </Modal>
      {/* <Button
        className='dark-bg-tab group relative p-2 hover:bg-light-primary/10
                   active:bg-light-primary/20 dark:hover:bg-dark-primary/10 
                   dark:active:bg-dark-primary/20'
        onClick={openModal}
      >
        <HeroIcon className='h-5 w-5' iconName='SparklesIcon' />
        <ToolTip tip='Change Username' />
      </Button> */}
    </>
  );
}
