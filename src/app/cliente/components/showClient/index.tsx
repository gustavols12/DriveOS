'use client';
import { FaRegEdit } from 'react-icons/fa';
import { BsBoxSeam } from 'react-icons/bs';
import { FiTrash2 } from 'react-icons/fi';
import { ClientProps } from '../../@types';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface listClientProps {
  clients: ClientProps[];
}

export function ListClient({ clients }: listClientProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editEmail, setEditEmail] = useState('');

  const router = useRouter();

  function startEdit(client: ClientProps) {
    setEditingId(client.id);
    setEditName(client.name);
    setEditPhone(client.phone);
    setEditEmail(client.email);
  }
  function cancelEdit() {
    setEditName('');
    setEditPhone('');
    setEditEmail('');
    setEditingId(null);
  }
  async function handleEdit(id: string) {
    try {
      const res = await fetch(`/api/cliente/${id}`, {
        method: 'PUT',

        body: JSON.stringify({
          name: editName,
          phone: editPhone,
          email: editEmail,
        }),
      });

      if (!res.ok) {
        throw new Error('erro ao atualizar cliente');
      }
      toast.success('Cadastro atualizado');
      setEditingId(null);
      router.refresh();
    } catch (error) {
      toast.error('Não foi possivel atualizar');
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`api/cliente/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Erro ao deletar');
      toast.success('Cliente deletado com sucesso!');
      router.refresh();
    } catch (error) {
      toast.error('erro ao deletar cliente');
    }
  }

  return (
    <section className="w-full max-w-7xl mx-auto shadow shadow-gray-300 rounded-xl p-6">
      <div className="flex py-2  gap-2 items-center justify-start">
        <h2 className="text-2xl font-bold text-gray-800 ">Meus Clientes</h2>
        <BsBoxSeam size={24} className="text-gray-800" />
      </div>

      <div className="overflow-x-auto overflow-y-auto max-h-[400px] py-4">
        <table className="w-full text-sm border border-gray-300 mb-4">
          <thead className="bg-gray-100 text-gray-800">
            <tr className="font-semibold">
              <th className="py-4 px-6 border-b text-left">Nome</th>
              <th className="py-4 px-6 border-b text-left">Telefone</th>
              <th className="hidden lg:table-cell py-4 px-6 border-b text-left">
                Email
              </th>
              <th className="py-4 px-6 border-b text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) =>
              editingId === client.id ? (
                <tr key={client.id}>
                  <td className="py-4 px-6 border-b text-left">
                    <input
                      className="w-full p-2 rounded border outline-none"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </td>
                  <td className="py-4 px-6 border-b text-left">
                    <input
                      type="text"
                      className="w-full p-2 rounded border outline-none"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                    />
                  </td>
                  <td className="py-4 px-6 border-b text-left">
                    <input
                      type="email"
                      className="w-full p-2 rounded border outline-none"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                    />
                  </td>

                  <td className="py-4 px-6 border-b text-center">
                    <button
                      onClick={() => handleEdit(client.id)}
                      className="text-green-600 font-bold mr-2"
                    >
                      Salvar
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="text-gray-500 font-bold"
                    >
                      Cancelar
                    </button>
                  </td>
                </tr>
              ) : (
                <tr
                  key={client.id}
                  className="hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="py-4 px-6 border-b text-left">
                    {client.name}
                  </td>
                  <td className="py-4 px-6 border-b text-left">
                    {client.phone}
                  </td>
                  <td className="hidden lg:table-cell py-4 px-6 border-b text-left">
                    {client.email}
                  </td>
                  <td className="py-4 px-6 border-b text-left">
                    <button onClick={() => startEdit(client)}>
                      <FaRegEdit
                        className=" text-gray-600 hover:text-blue-600 transition"
                        size={20}
                      />
                    </button>
                    <button onClick={() => handleDelete(client.id)}>
                      <FiTrash2 size={20} color="red" />
                    </button>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
