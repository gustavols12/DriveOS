'use client';

import { ClientProps } from '@/app/cliente/@types';
import { ProductsPros } from '@/app/produtos/@types';
import { Input } from '@/components/input';
import { FormEvent, useEffect, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import toast from 'react-hot-toast';
import { DownloadOSButton } from '../downloadButton';

interface OsProps {
  products: ProductsPros[];
  customers: ClientProps[];
}

export function OsForm({ products, customers }: OsProps) {
  // cliente
  const [customerId, setCustomerId] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<
    ClientProps | undefined
  >();
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  //   produto
  const [productId, setProductId] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<
    ProductsPros | undefined
  >();
  const [qtde, setQtde] = useState(1);
  const [price, setPrice] = useState('');
  const [listItems, setListItems] = useState<ProductsPros[]>([]);

  // serviço
  const [service, setService] = useState('');

  useEffect(() => {
    const clienteFiltrado = customers.find(
      (customer) => customer.id === customerId,
    );

    setSelectedCustomer(clienteFiltrado);
    if (clienteFiltrado) {
      setPhone(clienteFiltrado.phone);
      setEmail(clienteFiltrado.email);
    } else {
      setPhone('');
      setEmail('');
      setPrice('');
    }
  }, [customerId]);

  useEffect(() => {
    const produtoFiltrado = products.find(
      (product) => product.id === productId,
    );

    setSelectedProduct(produtoFiltrado);
    if (produtoFiltrado) {
      setPrice(produtoFiltrado.price);
    }
  }, [productId]);

  // funções
  function handleAddItemInList(e: FormEvent) {
    e.preventDefault();

    const product = products.find((p) => p.id === selectedProduct?.id);
    if (!product) return;

    setListItems((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) {
        const novaQtd = parseInt(exist.un) + qtde;
        exist.un = String(novaQtd);
        exist.price = (parseFloat(product.price) * novaQtd).toFixed(2);
        return [...prev];
      }

      return [
        ...prev,
        {
          name: product.name,
          id: product.id,
          price: (parseFloat(product.price) * qtde).toFixed(2),
          un: String(qtde),
        },
      ];
    });
  }

  function handleRemoveItem(id: string) {
    const updateList = listItems.filter((item) => item.id !== id);
    setListItems(updateList);
  }

  async function handleSaveServiceOrder(e: FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('/api/os', {
        method: 'POST',
        body: JSON.stringify({
          listItems,
          customerId,
          service,
        }),
      });
      if (!res.ok) {
        toast.error('error salvar ordem de serviço');
        return;
      }

      toast.success('Ordem de serviço salva');
      setCustomerId('');
      setEmail('');
      setListItems([]);
      setPhone('');
      setPrice('');
      setProductId('');
      setQtde(0);
      setService('');
    } catch (error) {
      toast.error('error salvar ordem de serviço');
    }
  }
  // pdf
  const componentRef = useRef<HTMLFormElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'Ordem-de-servico',
  });

  return (
    <form
      ref={componentRef}
      onSubmit={handleSaveServiceOrder}
      className="w-full max-w-7xl mx-auto shadow shadow-gray-300 rounded-xl mt-8 p-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          + Ordem de Serviço
        </h2>
        {selectedCustomer && service && listItems && (
          <DownloadOSButton
            customer={selectedCustomer?.name}
            service={service}
            products={listItems.map((item) => ({
              name: item.name,
              price: item.price,
            }))}
          />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1" htmlFor="client">
            Cliente*
          </label>
          <select
            name="client"
            id="client"
            className="w-full py-2 px-2 outline-none border-1 border-gray-300 rounded"
            onChange={(e) => setCustomerId(e.target.value)}
          >
            <option value="">Selecione o cliente</option>
            {customers.map((customer) => (
              <option value={customer.id} key={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-700 font-semibold mb-1">
            Email*
          </label>

          <Input
            id="email"
            placeholder="informe o email"
            type="email"
            value={email || ''}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="text-gray-700 font-semibold mb-1">
            telefone*
          </label>
          <Input
            id="phone"
            placeholder="informe o telefone"
            type="text"
            value={phone || ''}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* produto */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1" htmlFor="product">
            Produto*
          </label>
          <select
            name="product"
            id="product"
            className="w-full py-2 px-2 outline-none border-1 border-gray-300 rounded"
            onChange={(e) => setProductId(e.target.value)}
          >
            <option value="">Selecione o produto</option>
            {products.map((product) => (
              <option value={product.id} key={product.id}>
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
            id="price"
            placeholder="150,00"
            type="text"
            value={price.toString()}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="qtde" className="text-gray-700 font-semibold mb-1">
            Qtde*
          </label>
          <Input
            id="qtde"
            placeholder="1"
            type="text"
            value={qtde.toString()}
            onChange={(e) => setQtde(Number(e.target.value))}
          />
        </div>
      </div>

      {/* itens */}
      <div className="w-full flex flex-col gap-6 mt-6">
        {listItems.length > 0 && (
          <section className="w-full bg-gray-50 border border-gray-200 rounded-xl p-6 shadow">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Itens adicionados
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {listItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                  <div>
                    <p className="text-gray-800 font-medium">{item.name}</p>
                    <p className="text-gray-600 text-sm">R$ {item.price}</p>
                  </div>
                  <button
                    type="button"
                    className="text-red-600 hover:text-red-800 transition"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        <button
          onClick={handleAddItemInList}
          type="button"
          className="w-full sm:w-40 bg-blue-600 border-none hover:bg-blue-700 transition-colors text-white font-semibold py-2 px-2 rounded-lg"
        >
          Adicionar
        </button>
      </div>

      {/* Serviço */}
      <div className="flex flex-col mt-4 mb-2">
        <label htmlFor="Serviço" className="text-gray-700 font-semibold mb-1">
          Serviço realizado*
        </label>
        <textarea
          name="serviço"
          id="serviço"
          value={service}
          onChange={(e) => setService(e.target.value)}
          placeholder="Descrição do serviço"
          className="w-full rounded-md  lg:h-40 text-black outline-none border border-gray-300 px-3 py-2 box-border resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full mt-4 sm:w-auto bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-2 px-6 rounded-lg shadow-md cursor-pointer"
      >
        Salvar
      </button>
    </form>
  );
}
