'use client';

import { Input } from '@/components/input';
import { FormEvent, useState } from 'react';

export function FormProdutos() {
  const [produto, setProduto] = useState('');
  const [unMedida, setUnMedida] = useState('UN');
  const [custo, setCusto] = useState('0.00');
  const [venda, setVenda] = useState('0.00');

  function handleAddProduct(e: FormEvent) {
    e.preventDefault();
    alert(produto);
    setProduto('');
  }
  return (
    <form
      onSubmit={handleAddProduct}
      className="w-full max-w-7xl shadow-md rounded-lg p-2"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="w-full py-2">
          <label className="text-[#121212] font-medium">Nome*</label>
          <Input
            type="text"
            placeholder="Nome do produto..."
            value={produto}
            onChange={(e) => setProduto(e.target.value)}
          />
        </div>
        <div className="w-full py-2">
          <label className="text-[#121212] font-medium">
            Unidade de medida*
          </label>
          <Input
            type="text"
            placeholder="UN"
            value={unMedida}
            onChange={(e) => setUnMedida(e.target.value)}
          />
        </div>
        <div className="w-full py-2 ">
          <label className="text-[#121212] font-medium">Valor de custo*</label>
          <Input
            type="number"
            placeholder="UN"
            value={custo}
            onChange={(e) => setCusto(e.target.value)}
          />
        </div>
        <div className="w-full py-2 ">
          <label className="text-[#121212] font-medium">Valor de venda*</label>
          <Input
            type="number"
            placeholder="UN"
            value={venda}
            onChange={(e) => setVenda(e.target.value)}
          />
        </div>
      </div>
      <button className="w-full sm:w-24 mt-4 cursor-pointer p-2 bg-[#155dfc] font-medium text-xl border-0 text-white rounded-lg">
        Salvar
      </button>
    </form>
  );
}
