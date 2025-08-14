import { authOptions } from '@/lib/auth';
import { getDailyData } from '@/utils/getDailyData ';
import { getServerSession } from 'next-auth';
import { BsCart3, BsCashCoin, BsGraphUpArrow, BsTags } from 'react-icons/bs';

export async function DalyCash() {
  const session = await getServerSession(authOptions);
  const { produtos, diaFormatado, vendasDiarias } = await getDailyData();
  const totalCaixa = vendasDiarias.reduce((acc, venda) => acc + venda.total, 0);
  return (
    <>
      <section className="w-full grid grid-cols-1 lg:grid-cols-3 items-center justify-center gap-4 my-2 lg:m-4 ">
        {/* caixa */}
        <div className="bg-white w-full h-28 flex items-center justify-between rounded-lg border-l-3 border-l-green-500 shadow-md">
          <div className="px-4 ">
            <p>Caixa diário</p>
            <strong>R$ {session ? totalCaixa.toFixed(2) : 0}</strong>
          </div>
          <div className="mx-4 bg-green-200 rounded-full px-4 py-4 flex items-center justify-center">
            <BsCashCoin size={33} color="green" />
          </div>
        </div>
        {/* vendas */}
        <div className="bg-white w-full h-28 flex items-center justify-between rounded-lg border-l-3 border-l-blue-500 shadow-md">
          <div className="px-4 ">
            <p>Vendas</p>
            <strong>{session ? vendasDiarias.length : 0}</strong>
          </div>
          <div className="mx-4 bg-blue-200 rounded-full px-4 py-4 flex items-center justify-center">
            <BsCart3 size={33} color="blue" />
          </div>
        </div>
        {/* produtos */}
        <div className="bg-white w-full h-28 flex items-center justify-between rounded-lg border-l-3 border-l-purple-500 shadow-md">
          <div className="px-4 ">
            <p>Produtos</p>
            <strong>{session ? produtos.length : 0}</strong>
          </div>
          <div className="mx-4 bg-purple-200 rounded-full px-4 py-4 flex items-center justify-center">
            <BsTags size={33} color="purple" />
          </div>
        </div>
      </section>
      <div className="w-full flex flex-col  justify-start bg-white rounded-lg p-2 shadow-md">
        <div className="flex items-center justify-start gap-2 p-2">
          <BsGraphUpArrow size={30} />
          <h3 className="text-xl">Resumo do dia</h3>
        </div>
        <p className="font-medium text-gray-800">
          <strong className="text-[#4a5565]">Data:</strong> {diaFormatado}
        </p>
        <p className="font-medium text-gray-800">
          <strong className="text-[#4a5565]">Total em Caixa: </strong>
          R$ {session ? totalCaixa.toFixed(2) : 0}
        </p>
        <p className="font-medium text-gray-800">
          <strong className="text-[#4a5565]">Vendas: </strong>{' '}
          {session ? vendasDiarias.length : 0}
        </p>
      </div>
    </>
  );
}
