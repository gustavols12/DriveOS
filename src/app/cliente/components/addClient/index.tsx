'use client';

import { Input } from '@/components/input';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export function FormClient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const router = useRouter();

  async function handleAddClient(e: FormEvent) {
    e.preventDefault();

    if (!name || !phone || !email) {
      alert('preencha os dados');
      return;
    }

    const res = await fetch('/api/cliente', {
      method: 'POST',
      body: JSON.stringify({ name, email, phone }),
    });

    if (res.ok) {
      alert('Cadastrado com sucesso');
      setName('');
      setPhone('');
      setEmail('');
      router.refresh();
      return;
    }
    alert('deu erro');
  }
  return (
    <form
      onSubmit={handleAddClient}
      className="w-full max-w-7xl mx-auto shadow shadow-gray-300 rounded-xl p-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        + Cadastrar Cliente
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1" htmlFor="name">
            Nome*
          </label>
          <Input
            id="name"
            type="text"
            placeholder="Nome do Cliente..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-700 font-semibold mb-1">
            Email*
          </label>
          <Input
            id="email"
            type="email"
            placeholder="seuEmail@teste.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="text-gray-700 font-semibold mb-1">
            telefone*
          </label>
          <Input
            id="phone"
            type="text"
            placeholder="41 9999-9999"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-start mt-6">
        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-2 px-6 rounded-lg shadow-md cursor-pointer"
        >
          Cadastrar
        </button>
      </div>
    </form>
  );
}
