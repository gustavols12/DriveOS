'use client';
import { FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { FormEvent, useState, useEffect } from 'react';
import { ProductsPros } from '@/app/produtos/@types';
import { MdRestartAlt } from 'react-icons/md';
import { ClientProps } from '@/app/cliente/@types';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface itemCartProps {
  cartItem: ProductsPros[];
  clients: ClientProps[];
}

export function Cart({ cartItem, clients }: itemCartProps) {
  const router = useRouter();

  // Produto
  const [selectedProductId, setSelectedProductId] = useState('');
  const [unitPrice, setUnitPrice] = useState(0);
  const [qtd, setQtd] = useState(1);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState<ProductsPros[]>([]);
  const [payment, setPayment] = useState('');
  const [installments, setInstallments] = useState(1);

  const totalCarrinho = cart.reduce((acc, item) => {
    const quantidade = parseFloat(item.un);
    const precoUnitario = parseFloat(item.price);
    return acc + quantidade * precoUnitario;
  }, 0);

  // cliente
  const [clientId, setClientId] = useState('');

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

  // funções

  function handleAddItemCart(e: FormEvent) {
    e.preventDefault();

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === selectedProductId,
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        const existingItem = updatedCart[existingItemIndex];

        const newQtd = parseInt(existingItem.un) + qtd;
        const newTotal = parseFloat(existingItem.price) + total;

        updatedCart[existingItemIndex] = {
          ...existingItem,
          un: newQtd.toString(),
          price: newTotal.toFixed(2),
        };

        return updatedCart;
      }

      return [
        ...prevCart,
        {
          name: selectedProductId,
          price: total.toFixed(2),
          un: qtd.toString(),
          id: selectedProductId,
        },
      ];
    });
  }

  function handleRestartCart() {
    setSelectedProductId('');
    setQtd(1);
    setUnitPrice(0);
    setTotal(0);
  }

  function handleDeleteItem(id: string) {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    setSelectedProductId('');
    setQtd(1);
    setUnitPrice(0);
    setTotal(0);
    setPayment('');
  }

  async function handleRegisterSale() {
    if (!payment) {
      toast.error('Selecione uma forma de pagamento');
      return;
    }
    if (!clientId) {
      toast.error('Selecione um cliente');
      return;
    }
    try {
      const items = cart.map((item) => ({
        productId: item.id,
        quantity: parseInt(item.un),
        price: parseFloat(item.price),
      }));
      const res = await fetch('/api/venda', {
        method: 'POST',

        body: JSON.stringify({
          customerId: clientId,
          paymentMethod: payment,
          items,
        }),
      });

      if (!res.ok) {
        toast.error('Erro ao finalizar venda');
        return;
      }
      toast.success('Venda efetuada');
      setCart([]);
      setClientId('');
      setPayment('');
      setInstallments(1);
      setSelectedProductId('');
      setTotal(0);
      setQtd(1);
      router.refresh();
    } catch (error) {
      toast.error('erro ao salvar venda');
    }
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      {/* inicia venda  */}
      <div className="w-full sm:px-8 flex-1 flex-col items-center sm:items-start mb-8">
        {/* cliente */}
        <div className="w-full sm:w-sm px-4 flex flex-col items-center sm:items-start mb-4">
          <label
            htmlFor="cliente"
            className="self-start font-semibold text-gray-800"
          >
            Cliente:
          </label>
          <select
            required
            name="cliente"
            id="cliente"
            onChange={(e) => setClientId(e.target.value)}
            value={clientId}
            className="w-full  rounded-lg border border-gray-300 p-2 outline-blue-500"
          >
            <option value="">selecione um cliente</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        {/* produto */}
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

      {/* finaliza venda */}
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
                <button onClick={() => handleDeleteItem(item.id)}>
                  <FiTrash2 size={28} color="red" />
                </button>
              </div>
            ))}

            {/* payment */}
            <div className="w-full ">
              <select
                className="w-full py-4 outline-none border-1 border-gray-300 rounded"
                required
                onChange={(e) => {
                  const optionPayment = e.target.value;
                  setPayment(optionPayment);
                }}
              >
                <option value="">Selecione uma forma de pagamento</option>
                <option value="Débito">Débito</option>
                <option value="Crédito">Crédito</option>
                <option value="Pix">Pix</option>
              </select>
              {payment === 'Crédito' && (
                <div className="w-full mt-2 ">
                  <select
                    className="w-full py-4 outline-none border-1 border-gray-300 rounded"
                    onChange={(e) => {
                      const parcelas = e.target.value;
                      setInstallments(Number(parcelas));
                    }}
                  >
                    <option value="1">1x sem juros</option>
                    <option value="2">2x sem juros</option>
                    <option value="3">3x sem juros</option>
                  </select>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-gray-800 font-semibold">
                Total da venda:
              </span>
              <div className="flex flex-col gap-2 items-center justify-center">
                <strong className="text-green-500 font-bold text-2xl ">
                  R$ {totalCarrinho.toFixed(2)}
                </strong>
                {payment === 'Crédito' && (
                  <span className="text-sm self-end font-semibold text-gray-800">
                    Em {installments}x no cartão
                  </span>
                )}
              </div>
            </div>
            <button
              type="submit"
              onClick={handleRegisterSale}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 mb-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
            >
              <FiShoppingCart size={24} color="white" />
              Finalizar carrinho
            </button>
          </section>
        ) : (
          <div className="flex gap-2 pb-8 px-4">
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
