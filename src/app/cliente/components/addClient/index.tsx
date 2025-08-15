'use client';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import toast from 'react-hot-toast';

export function FormClient() {
  const schema = z.object({
    name: z.string().min(1, 'o nome é obrigatório'),
    email: z.email('Digite um email válido').min(1, 'o email é obrigatório'),
    phone: z.string().refine(
      (value) => {
        return /^(?:\(\d{2}\)\s?)?\d{11}$/.test(value);
      },
      {
        message: 'o numero de telefone deve estar no formato (41)995566353',
      },
    ),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();

  async function handleAddClient(data: FormData) {
    try {
      const res = await fetch('/api/cliente', {
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
        }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        toast.error(error);
        return;
      }
      toast.success('Cadastrado com sucesso');
      reset();
      router.refresh();
    } catch (error) {
      toast.error('Erro ao cadastrar cliente');
    }
  }
  return (
    <form
      onSubmit={handleSubmit(handleAddClient)}
      className="w-full max-w-7xl mx-auto shadow shadow-gray-300 rounded-xl p-6 mb-4"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        + Cadastrar Cliente
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold mb-1" htmlFor="name">
            Nome*
          </label>
          <input
            id="name"
            type="text"
            placeholder="Nome do Cliente..."
            className="w-full rounded-md h-10 text-black outline-none border border-gray-300 px-3 py-2 box-border"
            {...register('name')}
          />
          {errors.name && (
            <p className="text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-700 font-semibold mb-1">
            Email*
          </label>
          <input
            id="email"
            type="email"
            placeholder="seuEmail@teste.com"
            className="w-full rounded-md h-10 text-black outline-none border border-gray-300 px-3 py-2 box-border"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="text-gray-700 font-semibold mb-1">
            telefone*
          </label>
          <input
            id="phone"
            type="text"
            placeholder="41 9999-9999"
            className="w-full rounded-md h-10 text-black outline-none border border-gray-300 px-3 py-2 box-border"
            {...register('phone')}
          />
          {errors.phone && (
            <p className="text-red-500 mt-1">{errors.phone.message}</p>
          )}
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
