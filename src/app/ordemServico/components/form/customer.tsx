'use client';

import { ClientProps } from '@/app/cliente/@types';
import { Input } from '@/components/input';

interface CustomerProps {
  customers: ClientProps[];
  customerId: string;
  setCustomerId: (id: string) => void;
  email: string;
  setEmail: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
}

export function Customer({
  customers,
  customerId,
  setCustomerId,
  email,
  setEmail,
  phone,
  setPhone,
}: CustomerProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
      <div className="flex flex-col">
        <label htmlFor="client" className="text-gray-700 font-semibold mb-1">
          Cliente*
        </label>
        <select
          id="client"
          value={customerId}
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
          required
          id="email"
          placeholder="informe o email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="phone" className="text-gray-700 font-semibold mb-1">
          Telefone*
        </label>
        <Input
          required
          id="phone"
          placeholder="informe o telefone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
    </div>
  );
}
