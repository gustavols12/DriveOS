'use client';
import { ProductsPros } from '@/app/produtos/@types';
import { ClientProps } from '@/app/cliente/@types';
import { FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface CartSummaryProps {
  cart: ProductsPros[];
  setCart: (cart: ProductsPros[]) => void;
  clients: ClientProps[];
  clientId: string;
  setClientId: (id: string) => void;
  payment: string;
  setPayment: (value: string) => void;
  installments: number;
  setInstallments: (value: number) => void;
}

export function CartSummary({
  cart,
  setCart,
  clients,
  clientId,
  setClientId,
  payment,
  setPayment,
  installments,
  setInstallments,
}: CartSummaryProps) {
  const router = useRouter();
  const totalCarrinho = cart.reduce(
    (acc, item) => acc + parseFloat(item.price),
    0,
  );

  function handleDeleteItem(id: string) {
    setCart(cart.filter((item) => item.id !== id));
  }

  async function handleRegisterSale() {
    if (!payment || !clientId)
      return toast.error('Selecione cliente e forma de pagamento');
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
        const { error } = await res.json();
        toast.error(error);
        return;
      }
      toast.success('Venda efetuada');
      setCart([]);
      setClientId('');
      setPayment('');
      setInstallments(1);
      router.refresh();
    } catch (error) {
      toast.error('Erro ao salvar venda');
    }
  }

  return (
    <section className="flex flex-col gap-4 bg-white p-4 rounded-xl shadow-md">
      {cart.length === 0 ? (
        <p className="text-gray-800">Ops, seu carrinho está vazio...</p>
      ) : (
        <>
          <h2 className="flex items-center gap-2 font-semibold">
            <FiShoppingCart /> Carrinho ({cart.length} itens)
          </h2>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between bg-slate-100 p-2 rounded-lg"
            >
              <div>
                <p>{item.name}</p>
                <span>R$ {item.price} </span>
                <span>Qtde: {item.un}</span>
              </div>
              <button onClick={() => handleDeleteItem(item.id)}>
                <FiTrash2 size={24} color="red" />
              </button>
            </div>
          ))}

          <select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Selecione um cliente</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Forma de pagamento</option>
            <option value="Débito">Débito</option>
            <option value="Crédito">Crédito</option>
            <option value="Pix">Pix</option>
          </select>

          {payment === 'Crédito' && (
            <select
              value={installments}
              onChange={(e) => setInstallments(Number(e.target.value))}
              className="w-full p-2 border rounded-lg"
            >
              <option value={1}>1x sem juros</option>
              <option value={2}>2x sem juros</option>
              <option value={3}>3x sem juros</option>
            </select>
          )}

          <div className="flex justify-between items-center">
            <strong>Total: R$ {totalCarrinho.toFixed(2)}</strong>
            <button
              onClick={handleRegisterSale}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              Finalizar Venda
            </button>
          </div>
        </>
      )}
    </section>
  );
}
