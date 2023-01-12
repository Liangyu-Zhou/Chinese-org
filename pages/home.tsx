import { useState, useEffect } from 'react';
import { useWindow } from '@lib/context/window-context';
import { HomeLayout, ProtectedLayout } from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';
import { MainContainer } from '@components/home/main-container';
import { Input } from '@components/input/input';
import { MainHeader } from '@components/home/main-header';
import type { ReactElement, ReactNode } from 'react';
import { UpdateUsername } from '../components/home/update-username';
import { ReferralCode } from '../components/home/referral-code';
import Switch from 'react-switch';
import { HeroIcon } from '@components/ui/hero-icon';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from '@components/ui/button';
import { toast } from 'react-hot-toast';
import { ToolTip as MyTooltip } from '@components/ui/tooltip';
import { useRouter } from 'next/router';

import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { userStatsCollection } from '@lib/firebase/collections';
import type { Stats } from '@lib/types/stats';
import { useAuth } from '@lib/context/auth-context';
import next from 'next';

export default function Home(): JSX.Element {
  const { isMobile } = useWindow();
  const [followOnTwitter, setFollowOnTwitter] = useState(false);
  const [joinTelegram, setJoinTelegram] = useState(false);
  const [joinDiscord, setJoinDiscord] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState(false);

  const { user } = useAuth();

  const {
    query: { referralcode } //referralcode stands for referral code passed in through route
  } = useRouter();

  async function SetFollowOnTwitter() {
    window.open('http://twitter.com/chinese_org');
    setFollowOnTwitter(true);
    await sendTokenAfterTask();
    if (user) {
      const userStatsRef = doc(userStatsCollection(user.id), 'stats');
      await updateDoc(userStatsRef, {
        taskFollowOnTwitter: true,
        updatedAt: serverTimestamp()
      });
    }
  }

  async function SetJoinTelegram() {
    window.open(' https://t.me/ChineseOfficial');
    setJoinTelegram(true);
    await sendTokenAfterTask();
    if (user) {
      const userStatsRef = doc(userStatsCollection(user.id), 'stats');
      await updateDoc(userStatsRef, {
        taskJoinTelegram: true,
        updatedAt: serverTimestamp()
      });
    }
  }

  async function SetJoinDiscord() {
    window.open(' https://discord.com/invite/chinese');
    setJoinDiscord(true);
    await sendTokenAfterTask();
    if (user) {
      const userStatsRef = doc(userStatsCollection(user.id), 'stats');
      await updateDoc(userStatsRef, {
        taskJoinDiscord: true,
        updatedAt: serverTimestamp()
      });
    }
  }

  async function SetSubscribeEmail() {
    window.open('https://www.w3schools.com');
    setSubscribeEmail(true);
    await sendTokenAfterTask();
    if (user) {
      const userStatsRef = doc(userStatsCollection(user.id), 'stats');
      await updateDoc(userStatsRef, {
        taskSubscribeEmail: true,
        updatedAt: serverTimestamp()
      });
    }
  }

  async function sendTokenAfterTask() {
    if (user) {
      await getDoc(doc(userStatsCollection(user.id), 'stats'));
    }
  }

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_URL);
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

    const setUserReferralLinks = (referralCode: string) => {
      //todo: base64编码
      const url =
        (process.env.NEXT_PUBLIC_URL as string) +
        '?referralcode=' +
        encodeURI(referralCode);
      setRefferalLink(url);
    };
    if (user) {
      void setTask(user.id);
      setRefferalCode(user.username);
      setUserReferralLinks(user.username);
    }
  }, [user]);

  const [checked, setChecked] = useState(false);
  const [referralCode, setRefferalCode] = useState('');
  const [referralLink, setRefferalLink] = useState('');
  const [copied, setCopied] = useState(false);
  return (
    <MainContainer>
      <SEO title='Home / Chinese.org' />
      <MainHeader
        useMobileSidebar
        title='Home'
        className='flex items-center justify-between'
      >
        <UpdateUsername />
        <ReferralCode referralCode={referralcode} />
      </MainHeader>
      {!isMobile && <Input />}
      <section className='bg-main-sidebar-background'>
        <div className='m-3 flex flex-col rounded-xl bg-white shadow-lg hover:shadow-xl'>
          <div className='flex items-center justify-center pt-3'>
            <HeroIcon
              className='h-6 w-6 text-[#f26c4f]'
              iconName='ShareIcon'
              solid={true}
            />
            <p
              className='pl-2 text-2xl text-[#ff7235]'
              id='invite'
              data-tooltip-content='hello world'
            >
              Invite Chinese Compatriots
            </p>
          </div>
          <div className='flex flex-col items-start p-5'>
            <div className='flex flex-wrap'>
              <span>Referral code to share:</span>
            </div>
            <div className='flex items-center'>
              <span className='font-bold text-[#ff7235]'>{referralCode}</span>
              <CopyToClipboard
                text={referralCode}
                onCopy={() => {
                  setCopied(true);
                  toast.success('Copied to clipboard');
                }}
              >
                <Button
                  className='dark-bg-tab group relative p-2 hover:bg-light-primary/10
                   active:bg-light-primary/20 dark:hover:bg-dark-primary/10 
                   dark:active:bg-dark-primary/20'
                >
                  <HeroIcon
                    className='h-4 w-4'
                    iconName='ClipboardDocumentIcon'
                    solid={false}
                  />
                  <MyTooltip tip='Copy' />
                </Button>
              </CopyToClipboard>
            </div>
            <div className='flex flex-wrap'>
              <p>Referral link to share:</p>
            </div>
            <div className='flex flex-wrap items-center'>
              <span className='font-bold text-[#ff7235]'>{referralLink}</span>
              <CopyToClipboard
                text={referralLink}
                onCopy={() => {
                  setCopied(true);
                  toast.success('Copied to clipboard');
                }}
              >
                <Button
                  className='dark-bg-tab group relative p-2 hover:bg-light-primary/10
                   active:bg-light-primary/20 dark:hover:bg-dark-primary/10 
                   dark:active:bg-dark-primary/20'
                >
                  <HeroIcon
                    className='h-4 w-4'
                    iconName='ClipboardDocumentIcon'
                    solid={false}
                  />
                  <MyTooltip tip='Copy' />
                </Button>
              </CopyToClipboard>
            </div>
            <span className='flex flex-wrap'>
              Share to claim 50,000 $CHINESE for every new user
            </span>
          </div>
        </div>

        <div className='mt-0.5 grid h-[600px] grid-cols-2 grid-rows-2 gap-2 bg-main-sidebar-background xs:mt-0'>
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
        </div>
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
