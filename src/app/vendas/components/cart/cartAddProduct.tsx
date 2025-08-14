'use client';
import { FormEvent } from 'react';
import { ProductsPros } from '@/app/produtos/@types';
import { FiShoppingCart } from 'react-icons/fi';
import { MdRestartAlt } from 'react-icons/md';

interface CartAddProductProps {
  cartItem: ProductsPros[];
  cart: ProductsPros[];
  setCart: (cart: ProductsPros[]) => void;
  selectedProductId: string;
  setSelectedProductId: (id: string) => void;
  qtd: number;
  setQtd: (value: number) => void;
  unitPrice: number;
  total: number;
}

export function CartAddProduct({
  cartItem,
  cart,
  setCart,
  selectedProductId,
  setSelectedProductId,
  qtd,
  setQtd,
  unitPrice,
  total,
}: CartAddProductProps) {
  function handleAddItemCart(e: FormEvent) {
    e.preventDefault();
    const product = cartItem.find((p) => p.id === selectedProductId);
    if (!product) return;

    const existing = cart.find((item) => item.id === selectedProductId);
    if (existing) {
      const updatedCart = cart.map((item) =>
        item.id === selectedProductId
          ? {
              ...item,
              un: (parseInt(item.un) + qtd).toString(),
              price: (parseFloat(item.price) + total).toFixed(2),
            }
          : item,
      );
      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          id: selectedProductId,
          name: product.name,
          un: qtd.toString(),
          price: total.toFixed(2),
        },
      ]);
    }
  }

  function handleRestartCart() {
    setSelectedProductId('');
    setQtd(1);
  }

  return (
    <form
      onSubmit={handleAddItemCart}
      className="flex flex-col gap-4 bg-white p-4 rounded-xl shadow-md"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-gray-800 font-semibold">+ Adicionar produto</h2>
        <button type="button" onClick={handleRestartCart}>
          <MdRestartAlt size={28} className="text-gray-800" />
        </button>
      </div>

      <label htmlFor="produto">Produto*</label>
      <select
        id="produto"
        value={selectedProductId}
        onChange={(e) => setSelectedProductId(e.target.value)}
        className="w-full rounded-lg border p-2"
        required
      >
        <option value="">Selecione um produto</option>
        {cartItem.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <div className="flex gap-2">
        <input
          type="number"
          value={qtd}
          min={1}
          onChange={(e) => setQtd(Number(e.target.value))}
          placeholder="Quantidade"
          className="w-full rounded-lg border p-2"
        />
        <input
          type="number"
          value={unitPrice}
          disabled
          className="w-full rounded-lg border p-2"
        />
      </div>
      <input
        type="number"
        value={total}
        disabled
        className="w-full rounded-lg border p-2"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
      >
        <FiShoppingCart size={24} /> Adicionar ao carrinho
      </button>
    </form>
  );
}
