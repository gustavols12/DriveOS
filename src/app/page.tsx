import { BsCashCoin, BsTags, BsCart3, BsGraphUpArrow } from 'react-icons/bs';

export default function Home() {
  return (
    <section className="w-full p-2 lg:p-8 flex flex-col items-center justify-center gap-2">
      <h1 className="text-xl sm:text-3xl font-bold text-[#1e2939]">
        Dashboard - Caixa Diário
      </h1>
      <section className="w-full grid grid-cols-1 lg:grid-cols-3 items-center justify-center gap-4 my-2 lg:m-4 ">
        {/* caixa */}
        <div className="bg-white w-full h-28 flex items-center justify-between rounded-lg border-l-3 border-l-green-500">
          <div className="px-4 ">
            <p>Caixa diário</p>
            <strong>R$ 1.500</strong>
          </div>
          <div className="mx-4 bg-green-200 rounded-full px-4 py-4 flex items-center justify-center">
            <BsCashCoin size={33} color="green" />
          </div>
        </div>
        {/* vendas */}
        <div className="bg-white w-full h-28 flex items-center justify-between rounded-lg border-l-3 border-l-blue-500">
          <div className="px-4 ">
            <p>Vendas</p>
            <strong>0</strong>
          </div>
          <div className="mx-4 bg-blue-200 rounded-full px-4 py-4 flex items-center justify-center">
            <BsCart3 size={33} color="blue" />
          </div>
        </div>
        {/* produtos */}
        <div className="bg-white w-full h-28 flex items-center justify-between rounded-lg border-l-3 border-l-purple-500">
          <div className="px-4 ">
            <p>Produtos</p>
            <strong>0</strong>
          </div>
          <div className="mx-4 bg-purple-200 rounded-full px-4 py-4 flex items-center justify-center">
            <BsTags size={33} color="purple" />
          </div>
        </div>
      </section>
      <div className="w-full flex flex-col  justify-start bg-white rounded-lg p-2">
        <div className="flex items-center justify-start gap-2 p-2">
          <BsGraphUpArrow size={30} />
          <h3 className="text-xl">Resumo do dia</h3>
        </div>
        <p className="font-medium text-[#121212]">
          <strong className="text-[#4a5565]">Data: </strong>
          20/07/2025
        </p>
        <p className="font-medium text-[#121212]">
          <strong className="text-[#4a5565]">Total em Caixa: </strong>
          R$ 0.00
        </p>
        <p className="font-medium text-[#121212]">
          <strong className="text-[#4a5565]">Vendas: </strong>0
        </p>
      </div>
    </section>
  );
}
