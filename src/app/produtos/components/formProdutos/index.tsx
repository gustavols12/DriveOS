'use client';

import { Input } from '@/components/input';
import { FormEvent, useState } from 'react';

export function FormProdutos() {
  const [name, setName] = useState('');
  const [um, setUm] = useState('');
  const [cost, setCost] = useState('');
  const [price, setPrice] = useState('');

  async function handleAddProduct(e: FormEvent) {
    e.preventDefault();

    if (name === '' || cost === '' || um === '' || price === '') {
      alert('preencha os dados');
      return;
    }

    const res = await fetch('/api/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, um, cost, price }),
    });

    if (res.ok) {
      alert('Cadastrado com sucesso');
      setName('');
      setPrice('');
      setUm('');
      setCost('');
      return;
    }
    alert('deu erro');
  }
  return (
    <form
      onSubmit={handleAddProduct}
      className="w-full max-w-7xl shadow-md rounded-lg p-2"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="w-full py-2">
          <label className="text-[#121212] font-medium">Nome*</label>
          <Input
            type="text"
            placeholder="Nome do produto..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-full py-2">
          <label className="text-[#121212] font-medium">
            Unidade de medida*
          </label>
          <Input
            type="text"
            placeholder="UN"
            value={um}
            onChange={(e) => setUm(e.target.value)}
          />
        </div>
        <div className="w-full py-2 ">
          <label className="text-[#121212] font-medium">Valor de custo*</label>
          <Input
            type="number"
            placeholder="0"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
        </div>
        <div className="w-full py-2 ">
          <label className="text-[#121212] font-medium">Valor de venda*</label>
          <Input
            type="number"
            placeholder="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>
      <button className="w-full sm:w-40 mt-4 cursor-pointer p-2 bg-[#155dfc] font-medium text-xl border-none text-white rounded-lg">
        Cadastrar
      </button>
    </form>
  );
}
