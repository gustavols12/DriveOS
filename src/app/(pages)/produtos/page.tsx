import { Input } from '@/components/input';
import { FormProdutos } from './components/formProdutos';

export default function Produtos() {
  return (
    <section className="w-full p-2 lg:p-8 flex flex-col items-center justify-center md:justify-items-start gap-2">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#1e2939] my-2">
        Gestão de produtos
      </h1>
      <div className="w-11/12 flex flex-col bg-white rounded-lg ">
        <h3 className="text-[#1e2939] m-2">Cadastrar Produto</h3>
        <div>
          <FormProdutos />
        </div>
      </div>
    </section>
  );
}
