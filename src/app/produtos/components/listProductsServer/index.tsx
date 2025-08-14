// components/listProductsServer.tsx
import { GetProductData } from '@/utils/getProductData';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ListProducts } from '../listProducts';

export async function ListProductsServer() {
  const session = await getServerSession(authOptions);
  const { products } = await GetProductData();

  if (!session?.user || products.length === 0) {
    return (
      <div className="mt-5 text-center">
        <p className="text-3xl text-gray-800 font-semibold">
          Nenhum produto cadastrado
        </p>
      </div>
    );
  }

  return <ListProducts products={products} />;
}
