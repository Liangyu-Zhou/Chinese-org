import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  doc,
  limit,
  query,
  where,
  orderBy,
  documentId
} from 'firebase/firestore';
import { useAuth } from '@lib/context/auth-context';
import { useCollection } from '@lib/hooks/useCollection';
import { useDocument } from '@lib/hooks/useDocument';
import { usersCollection } from '@lib/firebase/collections';
import { UserCard } from '@components/user/user-card';
import { Loading } from '@components/ui/loading';
import { Error } from '@components/ui/error';
import { variants } from './aside-trends';

export function Suggestions(): JSX.Element {
  const { randomSeed } = useAuth();

  const { data: adminData, loading: adminLoading } = useDocument(
    doc(usersCollection, '0x6Fc5CbF064BD58c6EE985fBE51F7F6F377C97001'),
    { allowNull: true }
  );

  const { data: suggestionsData, loading: suggestionsLoading } = useCollection(
    query(usersCollection, orderBy(documentId()), limit(3)),
    { allowNull: true }
  );

  return (
    <section className='hover-animation rounded-2xl bg-main-sidebar-background'>
      {suggestionsLoading ? (
        <Loading className='flex h-52 items-center justify-center p-4' />
      ) : suggestionsData ? (
        <motion.div className='inner:px-4 inner:py-3' {...variants}>
          <h2 className='text-xl font-bold'>Who to Follow</h2>
          {/* {adminData && <UserCard {...adminData} />} */}
          {suggestionsData?.map((userData) => (
            <UserCard {...userData} key={userData.id} />
          ))}
          <Link href='/People'>
            <a
              className='custom-button accent-tab hover-card block w-full cursor-not-allowed rounded-2xl
                         rounded-t-none text-center text-main-accent'
            >
              Show more
            </a>
          </Link>
        </motion.div>
      ) : (
        <Error />
      )}
    </section>
  );
}
