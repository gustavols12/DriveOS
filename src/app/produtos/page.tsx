import { Input } from '@/components/input';
import { FormProdutos } from './components/addProduct';
import { ListProducts } from './components/showProducts';

export default function Produtos() {
  return (
    <section className="w-full p-2 lg:p-8 flex flex-col items-center justify-center md:justify-items-start gap-2 ">
      <div className="w-11/12 flex flex-col rounded-lg ">
        <section>
          <FormProdutos />
        </section>
        <section className="my-8">
          <div>
            <ListProducts />
          </div>
        </section>
      </div>
    </section>
  );
}
