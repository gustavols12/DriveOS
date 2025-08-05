'use client';
import { FaRegEdit } from 'react-icons/fa';
import { BsBoxSeam } from 'react-icons/bs';
import { FiTrash2 } from 'react-icons/fi';
import { ProductsPros } from '../../@types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ListProps {
  products: ProductsPros[];
}
export function ListProducts({ products }: ListProps) {
  const router = useRouter();
  const [editName, setEditName] = useState('');
  const [editUn, setEditUn] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  function startEdit(product: ProductsPros) {
    setEditingId(product.id);
    setEditName(product.name);
    setEditUn(product.un);
    setEditPrice(product.price.toString());
  }
  function cancelEdit() {
    setEditingId(null);
    setEditName('');
    setEditPrice('');
  }

  async function handleEdit(id: string) {
    try {
      const res = await fetch(`/api/produtos/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: editName,
          un: editUn,
          price: editPrice,
        }),
      });
      if (!res.ok) {
        throw new Error('erro ao atualizar produto');
      }
      alert('Produto atualizado com sucesso!');
      setEditingId(null);
      router.refresh();
    } catch (error) {
      alert('erro ao atualizar');
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/produtos/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Erro ao deletar');
      toast.success('Produto deletado com sucesso!');
      router.refresh();
    } catch (error) {
      toast.error('erro ao deletar produto');
    }
  }

  return (
    <section className="w-full max-w-7xl mx-auto shadow shadow-gray-300 rounded-xl p-6 mt-10">
      <div className="flex py-2  gap-2 items-center justify-start">
        <h2 className="text-2xl font-bold text-gray-800 ">Meus Produtos</h2>
        <BsBoxSeam size={24} className="text-gray-800" />
      </div>

      <div className=" overflow-x-auto py-4">
        <table className=" w-full sm:w-11/12  text-sm  border border-gray-300  mb-4 py-4">
          <thead className="bg-gray-100 text-gray-800">
            <tr className="font-semibold">
              <th className="py-4 px-6 border-b text-left">Nome</th>
              <th className="py-4 px-6 border-b   text-left">Unidade</th>
              <th className="py-4 px-6 border-b text-left">Valor</th>
              <th className="py-4 px-6 border-b text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) =>
              editingId === product.id ? (
                <tr key={product.id}>
                  <td className="py-4 px-6 border-b text-left">
                    <input
                      className="w-full p-2 rounded border outline-none"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </td>
                  <td className="py-4 px-6 border-b text-left">
                    <input
                      className="w-full p-2 rounded border outline-none"
                      value={editUn}
                      onChange={(e) => setEditUn(e.target.value)}
                    />
                  </td>
                  <td className="py-4 px-6 border-b text-left">
                    <input
                      type="number"
                      className="w-full p-2 rounded border outline-none"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                    />
                  </td>
                  <td className="py-4 px-6 border-b text-center">
                    <button
                      onClick={() => handleEdit(product.id)}
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
                  key={product.id}
                  className="hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="py-4 px-6 border-b text-left">
                    {product.name}
                  </td>
                  <td className="py-4 px-6 border-b text-left ">
                    {product.un}
                  </td>
                  <td className="py-4 px-6 border-b text-left">
                    R$ {Number(product.price).toFixed(2)}
                  </td>
                  <td className="py-4 px-6 border-b text-center">
                    <button onClick={() => startEdit(product)}>
                      <FaRegEdit
                        className="text-gray-600 hover:text-blue-600"
                        size={20}
                      />
                    </button>
                    <button onClick={() => handleDelete(product.id)}>
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
