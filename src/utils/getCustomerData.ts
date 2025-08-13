import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function GetCustomerData() {
  const session = await getServerSession(authOptions);
  const customers = await prisma.customer.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return {
    customers,
  };
}
