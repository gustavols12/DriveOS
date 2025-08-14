'use client';

import { ProductsPros } from '@/app/produtos/@types';
import { Input } from '@/components/input';

interface ProductProps {
  products: ProductsPros[];
  productId: string;
  setProductId: (id: string) => void;
  price: string;
  setPrice: (value: string) => void;
  qtde: number;
  setQtde: (value: number) => void;
}

export function Product({
  products,
  productId,
  setProductId,
  price,
  setPrice,
  qtde,
  setQtde,
}: ProductProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
      <div className="flex flex-col">
        <label htmlFor="product" className="text-gray-700 font-semibold mb-1">
          Produto*
        </label>
        <select
          id="product"
          value={productId}
          className="w-full py-2 px-2 outline-none border-1 border-gray-300 rounded"
          onChange={(e) => setProductId(e.target.value)}
        >
          <option value="">Selecione o produto</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="price" className="text-gray-700 font-semibold mb-1">
          Preço*
        </label>
        <Input
          required
          id="price"
          placeholder="150,00"
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="qtde" className="text-gray-700 font-semibold mb-1">
          Qtde*
        </label>
        <Input
          required
          id="qtde"
          placeholder="1"
          type="text"
          value={qtde.toString()}
          onChange={(e) => setQtde(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
