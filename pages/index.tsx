import { AuthLayout } from '@components/layout/auth-layout';
import Navbar from '../components/landing_page/NavBar';
import Hero from '../components/landing_page/Hero';
import Redpack from '../components/landing_page/Redpack';
import About from '../components/landing_page/About';
import type { ReactElement, ReactNode } from 'react';

export default function Login(): JSX.Element {
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
