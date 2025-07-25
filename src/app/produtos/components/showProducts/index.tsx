import { prisma } from '@/lib/prisma';
import { FaRegEdit } from 'react-icons/fa';
import { BsBoxSeam } from 'react-icons/bs';
export async function ListProducts() {
  const res = await prisma.produto.findMany();
  console.log(res);

  return (
    <section className="w-full my-6 px-4 rounded-lg shadow shadow-gray-300">
      <div className="flex py-2 gap-2 items-center justify-start">
        <h2 className="text-2xl font-bold text-gray-800">Meus Produtos</h2>
        <BsBoxSeam size={24} className="text-gray-800" />
      </div>

      <div className="overflow-x-auto shadow-lg py-4">
        <table className="min-w-full text-sm  border border-gray-300 rounded-lg mb-4 py-4">
          <thead className="bg-gray-100 text-gray-800">
            <tr className="font-semibold">
              <th className="py-4 px-6 border-b text-left">Nome</th>
              <th className="py-4 px-6 border-b text-left">
                Unidade de Medida
              </th>
              <th className="py-4 px-6 border-b text-left">Valor de Venda</th>
              <th className="py-4 px-6 border-b text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {res.map((product: any) => (
              <tr
                key={product.id}
                className="hover:bg-blue-50 transition-colors duration-200"
              >
                <td className="py-4 px-6 border-b text-left">{product.name}</td>
                <td className="py-4 px-6 border-b text-left">{product.un}</td>
                <td className="py-4 px-6 border-b text-left">
                  R$ {Number(product.price).toFixed(2)}
                </td>
                <td className="py-4 px-6 border-b text-center">
                  <FaRegEdit
                    className="inline-block cursor-pointer text-gray-600 hover:text-blue-600 transition"
                    size={20}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
