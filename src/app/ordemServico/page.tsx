import { prisma } from '@/lib/prisma';
import { OsForm } from './components/form';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { CustomerProps } from '@/utils/customer.type';
import { ProductProps } from '@/utils/product.type';

export default async function Os() {
  const session = await getServerSession(authOptions);
  const customers: CustomerProps[] = await prisma.customer.findMany({
    where: {
      userId: session?.user.id,
    },
  });
  const products: ProductProps[] = await prisma.produto.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <OsForm customers={customers} products={products} />
    </div>
  );
}
