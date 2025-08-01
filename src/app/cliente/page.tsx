import { FormClient } from './components/addClient';
import { ListClient } from './components/showClient';
import { prisma } from '@/lib/prisma';

export default async function Customer() {
  const res = await prisma.customer.findMany();

  return (
    <div className="w-full p-2 lg:p-8 flex flex-col items-center justify-center md:justify-items-start gap-2 ">
      <div className="w-11/12 flex flex-col rounded-lg ">
        <FormClient />
        <ListClient clients={res} />
      </div>
    </div>
  );
}
