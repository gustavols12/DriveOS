"use client";

import { Input } from "@/components/input";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { error } from "console";

export function FormProdutos() {
  const [name, setName] = useState("");
  const [un, setUn] = useState("");
  const [price, setPrice] = useState(1);
  const [stock, setStock] = useState(1);
  const router = useRouter();

  async function handleAddProduct(e: FormEvent) {
    e.preventDefault();

    if (
      name === "" ||
      un === "" ||
      !price ||
      !stock ||
      price < 0 ||
      stock < 0
    ) {
      toast.error("preencha os dados corretamente");
      return;
    }

    try {
      const priceConvertido = price.toString();
      const res = await fetch("/api/produtos", {
        method: "POST",
        body: JSON.stringify({ name, un, priceConvertido, stock }),
      });

      if (!res.ok) {
        toast.error("Erro ao efetuar cadastro");
        return;
      }
      toast.success("cadastro efetuado com sucesso");
      setName("");
      setPrice(1);
      setUn("");
      router.refresh();
    } catch (error) {
      toast.error("Erro ao efetuar cadastro");
    }
  }
  return (
    <form
      id="Cadastro produto"
      onSubmit={handleAddProduct}
      className="w-full max-w-7xl mx-auto shadow shadow-gray-300 rounded-xl p-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        + Cadastrar Produto
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col">
          <label htmlFor="nome" className="text-gray-700 font-semibold mb-1">
            Nome*
          </label>
          <Input
            id="nome"
            required
            type="text"
            placeholder="Nome do produto..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="UN" className="text-gray-700 font-semibold mb-1">
            Unidade de medida*
          </label>
          <Input
            id="UN"
            type="text"
            required
            placeholder="UN"
            value={un}
            onChange={(e) => setUn(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="stock" className="text-gray-700 font-semibold mb-1">
            Estoque*
          </label>
          <Input
            id="stock"
            type="number"
            placeholder="1"
            required
            min={1}
            max={1000}
            value={stock.toString()}
            onChange={(e) => {
              setStock(Number(e.target.value));
            }}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="venda" className="text-gray-700 font-semibold mb-1">
            Valor de venda*
          </label>
          <Input
            id="venda"
            type="number"
            required
            min={1}
            max={100000}
            placeholder="1"
            value={price.toString()}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="flex justify-start mt-6">
        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-2 px-6 rounded-lg shadow-md cursor-pointer"
        >
          Cadastrar
        </button>
      </div>
    </form>
  );
}
