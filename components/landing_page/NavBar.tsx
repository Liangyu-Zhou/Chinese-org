import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className='z-9999 mx-auto flex h-24 w-full items-center justify-between px-4 text-white'>
      <h1 className='w-full text-2xl text-[#F26C4F]'>Chinese.org</h1>
      <ul className='hidden w-full  items-center md:flex'>
        <li className='p-4 text-[#F26C4F]'>HOME</li>
        <li className='p-4'>ABOUT</li>
        <li className='p-4'>FUNCTIONS</li>
        <li className='p-4'>GALLERY</li>
        <li className='p-4'>FAQ</li>
        <li className='whitespace-nowrap p-4'>JOIN US</li>
        <li className='w-[250px] p-4'>
          <ConnectButton label='LogIn / SignUp' />
        </li>
      </ul>

      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          nav
            ? 'fixed left-0 top-0 h-full w-[60%] border-r border-r-gray-900 bg-[#000300] duration-300 ease-in-out'
            : 'fixed left-[-100%]'
        }
      >
        <h1 className='m-4 w-full text-3xl font-bold text-[#F26C4F]'>
          Chinese.org.
        </h1>
        <ul className='p-4 uppercase'>
          <li className='p-4 text-[#F26C4F]'>HOME</li>
          <li className='border-b  border-gray-600 p-4'>ABOUT</li>
          <li className='border-b  border-gray-600 p-4'>FUNCTIONS</li>
          <li className='border-b  border-gray-600 p-4'>GALLERY</li>
          <li className='border-b  border-gray-600 p-4'>FAQ</li>
          <li className='whitespace-nowrap  border-b border-gray-600 p-4'>
            JOIN US
          </li>
          <li className='border-b border-gray-600 p-4'>
            <ConnectButton label='LogIn / SignUp'></ConnectButton>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
