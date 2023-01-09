/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  checkUsernameAvailability,
  updateUsername,
  updateReferrerBalance,
  checkReferralCodeExsits
} from '@lib/firebase/utils';
import { useAuth } from '@lib/context/auth-context';
import { useModal } from '@lib/hooks/useModal';
import { isValidUsername } from '@lib/validation';
import { sleep } from '@lib/utils';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import { ToolTip } from '@components/ui/tooltip';
import { Modal } from '@components/modal/modal';
import { UsernameModal } from '@components/modal/username-modal';
import { InputField } from '@components/input/input-field';
import type { FormEvent, ChangeEvent } from 'react';

export function UpdateUsername(): JSX.Element {
  const [nameAlreadySet, setNameAlreadySet] = useState(false);
  const [nameAvailable, setNameAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visited, setVisited] = useState(false);
  const [inputName, setInputName] = useState('');
  const [usernameErrMsg, setUsernameErrMsg] = useState('');
  const [inputCode, setInputCode] = useState('');

  const [codeErrMsg, setCodeErrMsg] = useState('');
  const [codeAvailable, setCodeAvailable] = useState(false);
  const { user, referralCode } = useAuth();
  const { open, openModal, closeModal } = useModal();

  useEffect(() => {
    const checkNameAvailability = async (value: string): Promise<void> => {
      const empty = await checkUsernameAvailability(value);
      if (empty) setNameAvailable(true);
      else {
        setNameAvailable(false);
        setUsernameErrMsg(
          'This username has been taken. Please choose another.'
        );
      }
    };
    const checkCodeExistence = async (code: string): Promise<void> => {
      if (code.length > 0) {
        const empty = await checkReferralCodeExsits(code);
        if (!empty) setCodeAvailable(true);
        else {
          setCodeAvailable(false);
          setCodeErrMsg('Referral code not exsits.');
        }
      }
    };

    if (!visited && (inputName.length > 0 || inputCode.length > 0))
      setVisited(true);

    if (visited) {
      if (usernameErrMsg) setUsernameErrMsg('');

      const error = isValidUsername(user?.username as string, inputName);

      if (error) {
        setNameAvailable(false);
        setUsernameErrMsg(error);
      } else void checkNameAvailability(inputName);
      void checkCodeExistence(inputCode);
    }
  }, [inputName, inputCode]);

  useEffect(() => {
    if (referralCode) {
      setInputCode(referralCode);
    }
    if (!user?.updatedAt) openModal();
    else setNameAlreadySet(true);
  }, []);

  const changeUsername = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!nameAvailable || !codeAvailable) return;

    setLoading(true);

    await sleep(500);

    await updateUsername(user?.id as string, inputName);
    await updateReferrerBalance(referralCode);
    closeModal();

    setLoading(false);

    setInputName('');
    setVisited(false);
    setNameAvailable(false);
    setInputCode('');
    setCodeAvailable(false);

    toast.success('Username updated successfully');
  };

  const cancelUpdateUsername = (): void => {
    closeModal();
    if (!nameAlreadySet) void updateUsername(user?.id as string);
  };

  const handleNameChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void =>
    setInputName(value);

  const handleCodeChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void =>
    setInputCode(value);
  return (
    <>
      <Modal
        modalClassName='flex flex-col gap-6 max-w-xl bg-main-background w-full p-8 rounded-2xl h-[576px]'
        open={open}
        closeModal={cancelUpdateUsername}
      >
        <UsernameModal
          loading={loading}
          available={nameAvailable && codeAvailable}
          alreadySet={nameAlreadySet}
          changeUsername={changeUsername}
          cancelUpdateUsername={cancelUpdateUsername}
        >
          <InputField
            label='Username'
            inputId='username'
            inputValue={inputName}
            errorMessage={usernameErrMsg}
            handleChange={handleNameChange}
          />
          <InputField
            label='ReferralCode'
            inputId='referralCode'
            inputValue={inputCode}
            errorMessage={codeErrMsg}
            handleChange={handleCodeChange}
          />
        </UsernameModal>
      </Modal>
      <Button
        className='dark-bg-tab group relative p-2 hover:bg-light-primary/10
                   active:bg-light-primary/20 dark:hover:bg-dark-primary/10 
                   dark:active:bg-dark-primary/20'
        onClick={openModal}
      >
        <HeroIcon className='h-5 w-5' iconName='SparklesIcon' />
        <ToolTip tip='Change Username' />
      </Button>
    </>
  );
}
