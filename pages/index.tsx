import { AuthLayout } from '@components/layout/auth-layout';
import Navbar from '../components/landing_page/NavBar';
import Hero from '../components/landing_page/Hero';
import Redpack from '../components/landing_page/Redpack';
import About from '../components/landing_page/About';
import { useRouter } from 'next/router';
import { useAuth } from '@lib/context/auth-context';

import type { ReactElement, ReactNode } from 'react';

export default function Login(): JSX.Element {
  const {
    query: { referralcode }
  } = useRouter();
  const { setReferralCode } = useAuth();
  setReferralCode(referralcode as string);

  return (
    <div>
      <Navbar></Navbar>
      <Hero></Hero>
      <About></About>
      <Redpack></Redpack>
    </div>
  );
}

Login.getLayout = (page: ReactElement): ReactNode => (
  <AuthLayout>{page}</AuthLayout>
);
