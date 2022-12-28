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

type AuthContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({
  children
}: AuthContextProviderProps): JSX.Element {
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
        const userData: WithFieldValue<User> = {
          id: address,
          bio: null,
          name: address,
          theme: null,
          accent: null,
          website: null,
          location: null,
          photoURL: 'https://picsum.photos/id/237/200/300',
          username: address,
          verified: false,
          following: [],
          followers: [],
          createdAt: serverTimestamp(),
          updatedAt: null,
          totalTweets: 0,
          totalPhotos: 0,
          pinnedTweet: null,
          coverPhotoURL: null
        };

        const userStatsData: WithFieldValue<Stats> = {
          likes: [],
          tweets: [],
          updatedAt: null
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
