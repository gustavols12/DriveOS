'use client';

import { Input } from '@/components/input';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export function FormProdutos() {
  const [name, setName] = useState('');
  const [un, setUn] = useState('');
  const [price, setPrice] = useState('');
  const router = useRouter();

  async function handleAddProduct(e: FormEvent) {
    e.preventDefault();

    if (name === '' || un === '' || price === '') {
      alert('preencha os dados');
      return;
    }

    const res = await fetch('/api/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, un, price }),
    });

    if (res.ok) {
      alert('Cadastrado com sucesso');
      setName('');
      setPrice('');
      setUn('');
      router.refresh();
      return;
    }
    alert('deu erro');
  }
  return (
    <form
      onSubmit={handleAddProduct}
      className="w-full max-w-7xl mx-auto shadow shadow-gray-300 rounded-xl p-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        + Cadastrar Produto
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1" htmlFor="name">
            Nome*
          </label>
          <Input
            type="text"
            placeholder="Nome do produto..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1" htmlFor="un">
            Unidade de medida*
          </label>
          <Input
            type="text"
            placeholder="UN"
            value={un}
            onChange={(e) => setUn(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1" htmlFor="price">
            Valor de venda*
          </label>
          <Input
            type="number"
            placeholder="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-start mt-6">
        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-2 px-6 rounded-lg shadow-md"
        >
          Cadastrar
        </button>
      </div>
    </form>
  );
}
