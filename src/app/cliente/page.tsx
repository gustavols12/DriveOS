import { FormClient } from './components/addClient';
import { Suspense } from 'react';
import { ListCustomerServer } from './components/listCustomerServer';

export default async function Customer() {
  return (
    <div className="w-full p-2 lg:p-8 flex flex-col items-center justify-center md:justify-items-start gap-2 ">
      <div className="w-11/12 flex flex-col rounded-lg gap-4">
        <FormClient />

        <section className="my-8 sm:my-2 ">
          <Suspense
            fallback={
              <div className="text-center ">Carregando clientes...</div>
            }
          >
            <ListCustomerServer />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
