import { Suspense } from 'react';
import { ServiceOrder } from './components/serviceOrder';

export default async function Os() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-6">
        + Ordem de Serviço
      </h2>
      <Suspense
        fallback={<div className="text-center ">Carregando O.S ...</div>}
      >
        <ServiceOrder />
      </Suspense>
    </div>
  );
}
