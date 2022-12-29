import { useWindow } from '@lib/context/window-context';
import { HomeLayout, ProtectedLayout } from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';
import { MainContainer } from '@components/home/main-container';
import { Input } from '@components/input/input';
import { MainHeader } from '@components/home/main-header';
import { useState, useEffect } from 'react';
import type { ReactElement, ReactNode } from 'react';
import Switch from 'react-switch';
import { Chinese } from '../lib/contract/contract';
import { useAccount } from 'wagmi';
import {
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
  WithFieldValue
} from 'firebase/firestore';
import {
  usersCollection,
  userStatsCollection,
  userBookmarksCollection
} from '@lib/firebase/collections';
import type { Stats } from '@lib/types/stats';

export default function Home(): JSX.Element {
  const { isMobile } = useWindow();
  const [followOnTwitter, setFollowOnTwitter] = useState(false);
  const [joinTelegram, setJoinTelegram] = useState(false);
  const [joinDiscord, setJoinDiscord] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState(false);

  const { address } = useAccount();

  async function SetFollowOnTwitter() {
    sendTokenAfterTask();
    window.open('http://twitter.com/chinese_org');
    setFollowOnTwitter(true);
    if (address) {
      const userStatsRef = doc(userStatsCollection(address), 'stats');
      await updateDoc(userStatsRef, {
        taskFollowOnTwitter: true,
        updatedAt: serverTimestamp()
      });
    }
  }

  async function SetJoinTelegram() {
    window.open(' https://t.me/ChineseOfficial');
    setJoinTelegram(true);
    sendTokenAfterTask();
    if (address) {
      const userStatsRef = doc(userStatsCollection(address), 'stats');
      await updateDoc(userStatsRef, {
        taskJoinTelegram: true,
        updatedAt: serverTimestamp()
      });
    }
  }

  async function SetJoinDiscord() {
    sendTokenAfterTask();
    window.open(' https://discord.com/invite/chinese');
    setJoinDiscord(true);
    if (address) {
      const userStatsRef = doc(userStatsCollection(address), 'stats');
      await updateDoc(userStatsRef, {
        taskJoinDiscord: true,
        updatedAt: serverTimestamp()
      });
    }
  }

  async function SetSubscribeEmail() {
    sendTokenAfterTask();
    window.open('https://www.w3schools.com');
    setSubscribeEmail(true);
    if (address) {
      const userStatsRef = doc(userStatsCollection(address), 'stats');
      await updateDoc(userStatsRef, {
        taskSubscribeEmail: true,
        updatedAt: serverTimestamp()
      });
    }
  }

  const _100In18Decimal = '100000000000000000000';
  async function sendTokenAfterTask() {
    const balance = await Chinese.transfer(address, _100In18Decimal);
  }

  useEffect(() => {
    const setTask = async (address: string) => {
      const userStats = (
        await getDoc(doc(userStatsCollection(address), 'stats'))
      ).data();
      const stats = userStats as Stats;
      if (stats.taskFollowOnTwitter) {
        setFollowOnTwitter(true);
      }
      if (stats.taskJoinTelegram) {
        setJoinTelegram(true);
      }
      if (stats.taskJoinDiscord) {
        setJoinDiscord(true);
      }
      if (stats.taskSubscribeEmail) {
        setSubscribeEmail(true);
      }
    };

    if (address) {
      setTask(address);
    }
  }, [address]);

  const [checked, setChecked] = useState(false);
  return (
    <MainContainer>
      <SEO title='Home / Chinese.org' />
      <MainHeader
        useMobileSidebar
        title='Home'
        className='flex items-center justify-between'
      >
        {/* <UpdateUsername /> username is wallet address, can't change */}
      </MainHeader>
      {!isMobile && <Input />}
      <section className='mt-0.5 grid h-[500px] grid-cols-2 grid-rows-2 gap-4 bg-main-sidebar-background xs:mt-0'>
        <button
          className="ml-1 flex flex-col items-center bg-[url('/assets/memo3.jpg')] bg-contain bg-no-repeat"
          onClick={SetFollowOnTwitter}
          disabled={followOnTwitter}
        >
          <h1 className='mt-7 mb-5 font-mono text-2xl italic'>Task1</h1>
          <div className='flex flex-row'>
            <p className=' mr-2 font-mono italic'>Follow Chinese.org on</p>
            <img
              className='mr-4 w-[30px] rounded'
              src='/assets/twitter-avatar.jpg'
            ></img>
          </div>
          <p className='mt-4 font-mono italic'>to get 100 $CHINESE token !</p>
          <Switch
            className='mt-10 ml-[-10px]'
            uncheckedIcon={false}
            onChange={setChecked}
            checked={followOnTwitter}
          ></Switch>
        </button>

        <button
          className="ml-1 flex flex-col items-center bg-[url('/assets/memo3.jpg')] bg-contain bg-no-repeat"
          onClick={SetJoinTelegram}
          disabled={joinTelegram}
        >
          <h1 className='mt-7 mb-5 font-mono text-2xl italic'>Task2</h1>
          <div className='flex flex-row'>
            <p className=' mr-2 font-mono italic'>Join Chinese.org in</p>
            <img
              className='mr-4 w-[30px] rounded'
              src='/assets/telegram.png'
            ></img>
          </div>
          <p className='mt-4 font-mono italic'>to get 100 $CHINESE token !</p>
          <Switch
            className='mt-10 ml-[-10px]'
            uncheckedIcon={false}
            onChange={setChecked}
            checked={joinTelegram}
          ></Switch>
        </button>

        <button
          className="ml-1 flex flex-col items-center bg-[url('/assets/memo3.jpg')] bg-contain bg-no-repeat"
          onClick={SetJoinDiscord}
        >
          <h1 className='mt-7 mb-5 font-mono text-2xl italic'>Task3</h1>
          <div className='flex flex-row'>
            <p className=' mr-2 font-mono italic'>Join Chinese.org in</p>
            <img
              className='mr-4 w-[30px] rounded'
              src='/assets/discord.png'
            ></img>
          </div>
          <p className='mt-4 font-mono italic'>to get 100 $CHINESE token !</p>
          <Switch
            className='mt-10 ml-[-10px]'
            uncheckedIcon={false}
            onChange={setChecked}
            checked={joinDiscord}
          ></Switch>
        </button>

        <button
          className="ml-1 flex flex-col items-center bg-[url('/assets/memo3.jpg')] bg-contain bg-no-repeat"
          onClick={SetSubscribeEmail}
        >
          <h1 className='mt-7 mb-5 font-mono text-2xl italic'>Task4</h1>
          <div className='flex flex-row'>
            <p className='mr-2 font-mono italic'>Subscribe newsletter</p>
            <img
              className='mr-4 w-[30px] rounded'
              src='/assets/email.png'
            ></img>
          </div>
          <p className='mt-4 font-mono italic'>to get 100 $CHINESE token !</p>
          <Switch
            className='mt-10 ml-[-10px]'
            uncheckedIcon={false}
            onChange={setChecked}
            checked={subscribeEmail}
          ></Switch>
        </button>

        {/* {loading ? (
          <Loading className='mt-5' />
        ) : !data ? (
          <Error message='Something went wrong' />
        ) : (
          <>
            <AnimatePresence mode='popLayout'>
              {data.map((tweet) => (
                <Tweet {...tweet} key={tweet.id} />
              ))}
            </AnimatePresence>
            <LoadMore />
          </>
        )} */}
      </section>
    </MainContainer>
  );
}

Home.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <HomeLayout>{page}</HomeLayout>
    </MainLayout>
  </ProtectedLayout>
);
