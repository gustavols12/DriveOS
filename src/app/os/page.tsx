import { prisma } from '@/lib/prisma';
import { OsForm } from './components/form';

export default async function Os() {
  const customers = await prisma.customer.findMany();
  const products = await prisma.produto.findMany();

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <OsForm customers={customers} products={products} />
    </div>
  );
}
