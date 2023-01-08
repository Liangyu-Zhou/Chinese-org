import React, { useEffect, useState } from 'react';
import Hero1 from '/public/assets/landingpage/hero/hero1.webp';
const Hero = () => {
  const [url, setUrl] = useState(Hero1);

  useEffect(() => {
    setUrl(Hero1);
  }, [url]);

  return (
    <div>
      <div
        className='z-0 mt-[-96px] h-screen w-full bg-[#00000099] bg-cover bg-center bg-blend-darken'
        style={{ backgroundImage: `url(${url.src})` }}
      >
        <div className='mx-auto flex h-full w-10/12 flex-col justify-center '>
          <div className='py-20'></div>
          <p className='py-4 text-6xl font-bold text-white'>Bring Together</p>
          <p className='py-4 text-7xl font-bold text-[#f26c4f]'>
            Be Proud of Chinese Art and{' '}
          </p>
          <p className='pb-4 text-7xl font-bold text-[#f26c4f]'>Culture</p>
          <p className='py-4 text-xl font-bold text-white'>
            The 1st NFT Marketplace that we could participate, promote and
            govern culture together for a NATION!
          </p>
          <p className=' text-md py-4 text-white'>
            A SocialFi-driven NFTs Creating and Trading Ecosystem for Chinese
            Culture, Mining the Greatest Value of World-wide Chinese Collection,
            Together!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
