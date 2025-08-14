import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Dashboard } from '@/components/graficos';
import { DalyCash } from '@/components/dalycash';
import { Suspense } from 'react';
import Loading from './loading';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <section className="w-full p-2 lg:p-8 flex flex-col items-center justify-center gap-2 ">
      <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mt-2">
        Dashboard - Caixa Diário
      </h1>
      <Suspense fallback={<Loading />}>
        <DalyCash />
      </Suspense>

      {session && (
        <Suspense fallback={<Loading />}>
          <Dashboard />
        </Suspense>
      )}
    </section>
  );
}
