'use client';
import { FiShoppingCart } from 'react-icons/fi';
import { FormEvent, useState, useEffect } from 'react';
import { ProductsPros } from '@/app/produtos/@types';
import { MdRestartAlt } from 'react-icons/md';

interface itemCartProps {
  cartItem: ProductsPros[];
}

export function Cart({ cartItem }: itemCartProps) {
  const [cart, setCart] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [unitPrice, setUnitPrice] = useState(0);
  const [qtd, setQtd] = useState(1);
  const [total, setTotal] = useState(0);

  function handleAddItemCart(e: FormEvent) {
    e.preventDefault();
    setCart(cart + 1);
  }

  useEffect(() => {
    const product = cartItem.find((item) => item.id === selectedProductId);
    if (product) {
      const price = parseFloat(product.price);
      setUnitPrice(price);
      setTotal(qtd * price);
    } else {
      setUnitPrice(0);
    }
  }, [selectedProductId, qtd]);

  function handleRestartCart() {
    setSelectedProductId('');
    setQtd(1);
    setUnitPrice(0);
    setTotal(0);
  }
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      {/* adicionar  */}
      <div className="w-full sm:px-8 flex flex-col items-center sm:items-start mb-8">
        <form
          onSubmit={handleAddItemCart}
          id="FormVenda"
          className=" flex flex-col rounded-xl gap-4 bg-white p-4 shadow-md max-w-2xl"
        >
          <div className="flex items-center justify-between px-2">
            <h2 className="text-gray-800 mb-2 font-semibold">
              + Adicionar produto
            </h2>
            <button type="reset" onClick={handleRestartCart}>
              <MdRestartAlt size={28} className="text-gray-800" />
            </button>
          </div>
          <label
            htmlFor="produto"
            className="text-sm font-medium text-gray-700"
          >
            Produto*
          </label>
          <select
            name="produto"
            id="produto"
            value={selectedProductId}
            className="w-full rounded-lg border border-gray-300 p-2 outline-blue-500"
            onChange={(e) => setSelectedProductId(e.target.value)}
            required
          >
            <option value="">Selecione um produto</option>
            {cartItem.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <div className=" flex flex-col sm:flex-row gap-2">
            <div className="flex-1">
              <label
                htmlFor="qtde"
                className="text-sm font-medium text-gray-700"
              >
                qtde*
              </label>
              <input
                type="number"
                placeholder="quantidade"
                id="qtde"
                value={qtd}
                min={1}
                max={100}
                onChange={(e) => setQtd(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 p-2 outline-blue-500"
                required
              />
            </div>
            <div className=" flex-1">
              <label
                htmlFor="valor"
                className="text-sm font-medium text-gray-700"
              >
                Valor unitário*
              </label>
              <input
                disabled
                value={unitPrice}
                type="number"
                placeholder="0.00"
                id="valor"
                className="w-full rounded-lg border border-gray-300 p-2 outline-blue-500"
              />
            </div>
          </div>
          <label htmlFor="total" className="text-sm font-medium text-gray-700">
            Valor total*
          </label>
          <input
            disabled
            type="number"
            placeholder="0.00"
            id="total"
            className="w-full rounded-lg border border-gray-300 p-2 outline-blue-500"
            value={total.toFixed(2)}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 flex items-center justify-center gap-2"
          >
            <FiShoppingCart size={24} color="white" />
            Adicionar ao carrinho
          </button>
        </form>
      </div>
      {/* finalizar */}
      <div className="w-full sm:px-8 flex flex-col items-center sm:items-start">
        {cart > 0 ? (
          <form
            action=""
            id="FormVenda"
            className=" flex flex-col rounded-xl gap-4 bg-white p-4 shadow-md max-w-2xl"
          >
            <div className="flex gap-2">
              <FiShoppingCart size={24} className="text-gray-800" />
              <h2 className="text-gray-800 mb-2 font-semibold">
                Carrinho ({cart} itens)
              </h2>
            </div>
            <label
              htmlFor="produto"
              className="text-sm font-medium text-gray-700"
            >
              Produto*
            </label>
            <select
              name="produto"
              id="produto"
              className="w-full rounded-lg border border-gray-300 p-2 outline-blue-500"
              required={true}
            >
              <option value="">TESTE</option>
              <option value="">banana</option>
              <option value="">sdasas</option>
              <option value="">TESTE</option>
            </select>
            <div className=" flex flex-col sm:flex-row gap-2">
              <div className="flex-1">
                <label
                  htmlFor="qtde"
                  className="text-sm font-medium text-gray-700"
                >
                  qtde*
                </label>
                <input
                  type="number"
                  placeholder="quantidade"
                  id="qtde"
                  className="w-full rounded-lg border border-gray-300 p-2 outline-blue-500"
                  required={true}
                />
              </div>
              <div className=" flex-1">
                <label
                  htmlFor="valor"
                  className="text-sm font-medium text-gray-700"
                >
                  Valor unitário*
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  id="valor"
                  className="w-full rounded-lg border border-gray-300 p-2 outline-blue-500"
                />
              </div>
            </div>
            <label
              htmlFor="total"
              className="text-sm font-medium text-gray-700"
            >
              Valor total*
            </label>
            <input
              type="number"
              placeholder="0.00"
              id="total"
              className="w-full rounded-lg border border-gray-300 p-2 outline-blue-500"
              required={true}
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 flex items-center justify-center gap-2"
            >
              <FiShoppingCart size={24} color="white" />
              Finalizar carrinho
            </button>
          </form>
        ) : (
          <div className="flex gap-2 pb-8">
            <FiShoppingCart size={24} className="text-gray-800" />
            <h2 className="text-gray-800 mb-2 font-semibold">
              ops seu carrinho está vazio...
            </h2>
          </div>
        )}
      </div>
    </section>
  );
}
