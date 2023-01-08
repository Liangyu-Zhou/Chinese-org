import React, { useEffect, useState } from 'react';
import hongbao from '/public/assets/landingpage/redpack/hongbao9.png';
import { HeroIcon } from '@components/ui/hero-icon';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Redpack = () => {
  return (
    <div>
      <div
        className='z-0 h-screen w-full bg-[#00000099] bg-cover bg-center bg-blend-darken'
        style={{ backgroundImage: `url(${hongbao.src})` }}
      >
        <div className='mx-auto flex h-full w-10/12 flex-col justify-center '>
          <p className='py-4 text-6xl font-bold text-white'>
            Claim Your $CHINESE Token
          </p>
          <div className='flex flex-row py-2'>
            <ConnectButton label='SIGN UP' />
            {/* <p className='text-3xl font-bold text-[#f26c4f]'>Sign up</p> */}
            <p className='pl-3 text-3xl text-white'>
              to claim 1,000,000 $CHINESE
            </p>
          </div>
          <div className='flex flex-row items-center py-2'>
            <HeroIcon
              className='h-7 w-7 text-[#f26c4f]'
              iconName='ShareIcon'
              solid={true}
            />
            <p className='pl-3 text-3xl font-bold text-[#f26c4f]'>
              Invite new user
            </p>
            <p className='pl-3 text-3xl text-white'>
              to claim 500,000 $CHINESE
            </p>
          </div>
          <div className='flex flex-row items-center py-2'>
            <HeroIcon
              className='h-7 w-7 text-[#f26c4f]'
              iconName='UserCircleIcon'
              solid={true}
            />
            <p className='pl-3 text-3xl font-bold text-[#f26c4f]'>
              Stay online
            </p>
            <p className='pl-3 text-3xl text-white'>
              to claim 0.01 $CHINESE per SECOND
            </p>
          </div>
          <div className='flex flex-row items-center py-2'>
            <HeroIcon
              className='h-7 w-7 text-[#f26c4f]'
              iconName='PencilSquareIcon'
              solid={true}
            />
            <p className='pl-3 text-3xl font-bold text-[#f26c4f]'>
              Post a tweet
            </p>
            <p className='pl-3 text-3xl text-white'>to claim 200 $CHINESE</p>
          </div>
          <div className='flex flex-row items-center py-2'>
            <HeroIcon
              className='h-7 w-7 text-[#f26c4f]'
              iconName='HeartIcon'
              solid={true}
            />
            <p className='pl-3 text-3xl font-bold text-[#f26c4f]'>
              Like a tweet
            </p>
            <p className='pl-3 text-3xl text-white'>to claim 100 $CHINESE</p>
          </div>
          <div className='flex flex-row items-center py-2'>
            <HeroIcon
              className='h-7 w-7 text-[#f26c4f]'
              iconName='WrenchScrewdriverIcon'
              solid={true}
            />
            <p className='pl-3 text-3xl font-bold text-[#f26c4f]'>
              Mint an NFT
            </p>
            <p className='pl-3 text-3xl text-white'>to claim 1000 $CHINESE</p>
          </div>
          <div className='flex flex-row py-2'>
            <p className='pl-3 text-3xl text-white'>...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Redpack;
