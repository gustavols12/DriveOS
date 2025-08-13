import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function GetProductData() {
  const session = await getServerSession(authOptions);
  const products = await prisma.produto.findMany({
    where: {
      userId: session?.user.id,
    },
  });
  return {
    products,
  };
}
