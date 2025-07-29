import { prisma } from '@/lib/prisma';
import { FaRegEdit } from 'react-icons/fa';
import { BsBoxSeam } from 'react-icons/bs';
import { FiTrash2 } from 'react-icons/fi';
export async function ListClient() {
  const res = await prisma.customer.findMany();

  return (
    <section className="w-full my-6 px-4 rounded-lg ">
      <div className="flex py-2  gap-2 items-center justify-start">
        <h2 className="text-2xl font-bold text-gray-800 ">Meus Clientes</h2>
        <BsBoxSeam size={24} className="text-gray-800" />
      </div>

      <div className="overflow-x-auto">
        <table className=" w-11/12  text-sm  border border-gray-300  mb-4 py-4">
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
            {res.map((client) => (
              <tr
                key={client.id}
                className="hover:bg-blue-50 transition-colors duration-200"
              >
                <td className="py-4 px-6 border-b text-left">{client.name}</td>
                <td className="py-4 px-6 border-b text-left">{client.phone}</td>
                <td className="hidden lg:table-cell py-4 px-6 border-b text-left">
                  {client.email}
                </td>
                <td className="py-4 px-6 border-b text-left">
                  <button>
                    <FaRegEdit
                      className=" text-gray-600 hover:text-blue-600 transition"
                      size={20}
                    />
                  </button>
                  <button>
                    <FiTrash2 size={20} color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
