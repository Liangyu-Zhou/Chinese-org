import { useState, useEffect, useContext, createContext, useMemo } from 'react';
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import {
  usersCollection,
  userStatsCollection,
  userBookmarksCollection
} from '@lib/firebase/collections';
import { getRandomId } from '@lib/random';
import type { ReactNode } from 'react';
import type { WithFieldValue } from 'firebase/firestore';
import type { User } from '@lib/types/user';
import type { Bookmark } from '@lib/types/bookmark';
import type { Stats } from '@lib/types/stats';
import { useAccount, useDisconnect } from 'wagmi';
import { ChineseWithSigner } from '../contract/contract';
import { minifyName } from '../../lib/utils';
import BigNumber from 'bignumber.js';
import { calculateCode } from '@lib/utils';

type AuthContext = {
  user: User | null;
  error: Error | null;
  loading: boolean;
  isAdmin: boolean;
  randomSeed: string;
  userBookmarks: Bookmark[] | null;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContext | null>(null);
const _100In18Decimal = '100000000000000000000';
const _1mIn18Decimal = '1000000000000000000000000';
const _1m = '1000000';
type AuthContextProviderProps = {
  children: ReactNode;
};

async function sendTokenAfterRegistry(toAddr: string) {
  await ChineseWithSigner.transfer(toAddr, _100In18Decimal);
}

export function AuthContextProvider({
  children
}: AuthContextProviderProps): JSX.Element {
  const BN = BigNumber.clone({ DECIMAL_PLACES: 18 });
  const [user, setUser] = useState<User | null>(null);
  const [userBookmarks, setUserBookmarks] = useState<Bookmark[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  useEffect(() => {
    const handleUser = async (address: string): Promise<void> => {
      const userSnapshot = await getDoc(doc(usersCollection, address));
      if (!userSnapshot.exists()) {
        await sendTokenAfterRegistry(address);
        const userData: WithFieldValue<User> = {
          id: address,
          bio: null,
          name: minifyName(address),
          theme: null,
          accent: null,
          website: null,
          location: null,
          photoURL: 'https://loremflickr.com/320/240?lock=4',
          username: address,
          verified: false,
          following: [],
          followers: [],
          createdAt: serverTimestamp(),
          updatedAt: null,
          totalTweets: 0,
          totalPhotos: 0,
          pinnedTweet: null,
          coverPhotoURL: null,
          referralCode: calculateCode(address),
          referredBy: null
        };

        const userStatsData: WithFieldValue<Stats> = {
          likes: [],
          tweets: [],
          updatedAt: null,
          taskFollowOnTwitter: false,
          taskJoinDiscord: false,
          taskJoinTelegram: false,
          taskSubscribeEmail: false,
          balance: BN(_1m).toString()
        };
        try {
          await Promise.all([
            setDoc(doc(usersCollection, address), userData),
            setDoc(doc(userStatsCollection(address), 'stats'), userStatsData)
          ]);
          const newUser = (await getDoc(doc(usersCollection, address))).data();
          setUser(newUser as User);
        } catch (error) {
          setError(error as Error);
        }
      } else {
        const userData = userSnapshot.data();
        setUser(userData);
      }
      try {
        setLoading(false);
      } catch (error) {
        setError(error as Error);
      }
    };

    if (address) {
      void handleUser(address);
    }
  }, [address]);

  useEffect(() => {
    if (!user) return;

    const { id } = user;

    const unsubscribeUser = onSnapshot(doc(usersCollection, id), (doc) => {
      setUser(doc.data() as User);
    });

    const unsubscribeBookmarks = onSnapshot(
      userBookmarksCollection(id),
      (snapshot) => {
        const bookmarks = snapshot.docs.map((doc) => doc.data());
        setUserBookmarks(bookmarks);
      }
    );

    return () => {
      unsubscribeUser();
      unsubscribeBookmarks();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const signOut = () => {
    setLoading(false);
    setUser(null);
    disconnect();
  };
  const isAdmin = false;
  const randomSeed = useMemo(getRandomId, [user?.id]);
  const value: AuthContext = {
    user,
    error,
    loading,
    isAdmin,
    randomSeed,
    userBookmarks,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContext {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error('useAuth must be used within an AuthContextProvider');

  return context;
}
