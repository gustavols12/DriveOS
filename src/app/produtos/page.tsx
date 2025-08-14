import { FormProdutos } from './components/addProduct';
import { Suspense } from 'react';
import { ListProductsServer } from './components/listProductsServer';

export default async function Produtos() {
  return (
    <section className="w-full p-2 lg:p-8 flex flex-col items-center justify-center md:justify-items-start gap-2 ">
      <div className="w-11/12 flex flex-col rounded-lg mt-2 ">
        <FormProdutos />

        <section className="my-8 sm:my-2 ">
          <Suspense
            fallback={
              <div className="text-center ">Carregando produtos...</div>
            }
          >
            <ListProductsServer />
          </Suspense>
        </section>
      </div>
    </section>
  );
}
