'use client';
import { BsTrash2 } from 'react-icons/bs';
import { ServiceOrderProps } from '../../@types';
import toast from 'react-hot-toast';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

interface OrderProps {
  order: ServiceOrderProps[];
}

export function MyOrders({ order }: OrderProps) {
  async function handleDeleteOs(id: string) {
    try {
      const response = await fetch(`/api/os/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        toast.error('Erro ao deletar OS');
        return;
      }
      toast.success('O.S deletada com sucesso');
    } catch (error) {
      toast.error('Erro ao deletar OS');
    }
  }

  const componentRef = useRef<HTMLElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'Ordem-de-servico',
  });
  return (
    <section
      className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 mb-6 px-2 py-2"
      ref={componentRef}
    >
      {order.map((item) => (
        <div
          key={item.id}
          className="w-full bg-white shadow-md rounded-xl p-4 flex flex-col justify-between  hover:shadow-lg transition"
        >
          <div className="space-y-1">
            <p className=" text-gray-500 font-semibold text-lg/7">
              Serviço:
              <span className="text-gray-800 font-bold ml-1">{item.name}</span>
            </p>
            <p className=" text-gray-500 font-semibold text-lg/7">
              Cliente:
              <span className="text-gray-800 font-bold ml-1">
                {item.customer.name}
              </span>
            </p>
            {item.product.map((produto) => (
              <div
                key={produto.id}
                className="flex justify-between items-center  text-gray-800 py-1 border-b border-gray-100 last:border-b-0"
              >
                <p className=" text-gray-500 font-semibold text-lg/7">
                  Produto:{' '}
                  <span className="text-gray-800 font-bold ml-1">
                    {produto.name}
                  </span>
                </p>
                <span className="text-green-600 font-semibold">
                  R$ {produto.price}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg hover:bg-blue-400 transition bg-blue-500 text-white"
            >
              Baixar
            </button>
            <button
              onClick={() => handleDeleteOs(item.id)}
              className="p-2 rounded-full hover:bg-red-100 transition"
            >
              <BsTrash2 size={20} className="text-red-500" />
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
