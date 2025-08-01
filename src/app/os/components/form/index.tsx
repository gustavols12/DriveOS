'use client';

import { ClientProps } from '@/app/cliente/@types';
import { ProductsPros } from '@/app/produtos/@types';
import { Input } from '@/components/input';
import { FormEvent, useEffect, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';

interface OsProps {
  products: ProductsPros[];
  customers: ClientProps[];
}

export function OsForm({ products, customers }: OsProps) {
  // cliente
  const [clientId, setClientId] = useState('');
  const [selectedClient, setSelectedClient] = useState<
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

  useEffect(() => {
    const clienteFiltrado = customers.find(
      (customer) => customer.id === clientId,
    );

    setSelectedClient(clienteFiltrado);
    if (clienteFiltrado) {
      setPhone(clienteFiltrado.phone);
      setEmail(clienteFiltrado.email);
    } else {
      setPhone('');
      setEmail('');
      setPrice('');
    }
  }, [clientId]);

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
    const productName = products.find(
      (product) => product.id === selectedProduct?.id,
    );
    if (!productName) {
      return;
    }
    const item = {
      name: productName?.name,
      id: productName?.id,
      price: productName?.price,
      un: productName?.un,
    };
    setListItems((prev) => [...prev, item]);
  }
  function handleRemoveItem(id: string) {
    const updateList = listItems.filter((item) => item.id !== id);
    setListItems(updateList);
  }

  return (
    <form className="w-full max-w-7xl mx-auto shadow shadow-gray-300 rounded-xl mt-8 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        + Ordem de Serviço
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1" htmlFor="client">
            Cliente*
          </label>
          <select
            name="client"
            id="client"
            className="w-full py-2 px-2 outline-none border-1 border-gray-300 rounded"
            onChange={(e) => setClientId(e.target.value)}
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
          type="submit"
          className="w-full sm:w-40 sm:h-14 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-2 px-6 rounded-lg shadow-md"
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
          placeholder="Descrição do serviço"
          className="w-full rounded-md  lg:h-40 text-black outline-none border border-gray-300 px-3 py-2 box-border"
        />
      </div>
      <div className="flex justify-start mt-6">
        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-2 px-6 rounded-lg shadow-md cursor-pointer"
        >
          Salvar
        </button>
      </div>
    </form>
  );
}
