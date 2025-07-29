'use client';

import { Input } from '@/components/input';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export function FormClient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');

  const router = useRouter();

  async function handleAddProduct(e: FormEvent) {
    e.preventDefault();

    if (!name || !phone || !email || !street || !neighborhood || !city) {
      alert('preencha os dados');
      return;
    }

    const res = await fetch('/api/cliente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, phone, street, neighborhood, city }),
    });

    if (res.ok) {
      alert('Cadastrado com sucesso');
      setName('');
      setPhone('');
      setEmail('');
      setStreet('');
      setNeighborhood('');
      setCity('');
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
            placeholder="gustavo@teste.com"
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
            placeholder="41 995566353"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="rua" className="text-gray-700 font-semibold mb-1">
            Rua*
          </label>
          <Input
            id="rua"
            type="text"
            placeholder="Rua são paulo"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="bairro" className="text-gray-700 font-semibold mb-1">
            Bairro*
          </label>
          <Input
            id="bairro"
            type="text"
            placeholder="Jardim boa vista"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="cidade" className="text-gray-700 font-semibold mb-1">
            Cidade*
          </label>
          <Input
            id="cidade"
            type="text"
            placeholder="Curitiba-PR"
            value={city}
            onChange={(e) => setCity(e.target.value)}
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
