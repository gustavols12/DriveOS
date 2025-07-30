'use client';
import { FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { FormEvent, useState, useEffect } from 'react';
import { ProductsPros } from '@/app/produtos/@types';
import { MdRestartAlt } from 'react-icons/md';

interface itemCartProps {
  cartItem: ProductsPros[];
}

export function Cart({ cartItem }: itemCartProps) {
  const [selectedProductId, setSelectedProductId] = useState('');
  const [unitPrice, setUnitPrice] = useState(0);
  const [qtd, setQtd] = useState(1);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState<ProductsPros[]>([]);

  const totalCarrinho = cart.reduce((acc, item) => {
    const quantidade = parseFloat(item.un);
    const precoUnitario = parseFloat(item.price);
    return acc + quantidade * precoUnitario;
  }, 0);

  function handleAddItemCart(e: FormEvent) {
    e.preventDefault();
    setCart((prevCart) => [
      ...prevCart,
      {
        name: selectedProductId,
        price: total.toString(),
        un: qtd.toString(),
        id: selectedProductId,
      },
    ]);
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
      <div className="w-full sm:px-8 flex-1 flex-col items-center sm:items-start mb-8">
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
      <div className="w-full sm:px-8 flex-1 flex-col items-center sm:items-start">
        {cart.length > 0 ? (
          <section className=" w-full flex flex-col rounded-xl gap-4 bg-white p-4 shadow-md max-w-2xl">
            <div className="flex gap-2 pb-8">
              <FiShoppingCart size={24} className="text-gray-800" />
              <h2 className="text-gray-800 mb-2 font-semibold">
                Carrinho ({cart.length} itens)
              </h2>
            </div>
            {cart.map((item) => (
              <div
                key={item.id}
                className="w-full rounded-lg bg-slate-100 flex items-center justify-between px-4 py-2"
              >
                <div className="flex text-start flex-col">
                  <p>
                    {cartItem.find((p) => p.id === item.id)?.name ||
                      'Produto desconhecido'}
                  </p>

                  <span className="text-gray-800 font-semibold">
                    R$ {item.price}
                  </span>
                  <span className="text-gray-800 font-semibold">
                    Qtde: {item.un}
                  </span>
                </div>
                <FiTrash2 size={28} color="red" />
              </div>
            ))}
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-gray-800 font-semibold">
                Total da venda:
              </span>
              <strong className="text-green-500">
                R$ {totalCarrinho.toFixed(2)}
              </strong>
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 flex items-center justify-center gap-2"
            >
              <FiShoppingCart size={24} color="white" />
              Finalizar carrinho
            </button>
          </section>
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
