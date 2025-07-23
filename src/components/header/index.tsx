'use client';
import Link from 'next/link';
import {
  BsCart3,
  BsClipboard2Data,
  BsHouseDoor,
  BsWrenchAdjustable,
  BsTags,
  BsList,
  BsX,
} from 'react-icons/bs';
import { useState } from 'react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="w-full h-20 bg-[#1e2939] sm:w-64 sm:h-screen relative sm:flex sm:flex-col">
      <div className="my-2 mb-4 text-center flex items-center justify-between gap-2 p-2 sm:justify-center">
        <button className="cursor-pointer sm:hidden z-50" onClick={toggleMenu}>
          {isOpen ? (
            <BsX size={30} className="text-gray-300" />
          ) : (
            <BsList size={30} className="text-gray-300" />
          )}
        </button>
        <Link href="/">
          <h1 className="text-3xl text-white font-bold hover:tracking-wider duration-300">
            Drive<span className="text-blue-400">Os</span>
          </h1>
        </Link>
        <div className="sm:hidden w-[30px]"></div>
      </div>
      <div
        className={`
        fixed top-0 left-0 w-64 h-screen bg-[#1e2939] z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        sm:static sm:translate-x-0 sm:w-auto sm:h-auto sm:block sm:flex-1 sm:overflow-y-auto sm:py-4
      `}
      >
        <nav className="flex flex-col items-center justify-center text-gray-300 font-medium gap-4">
          <Link
            href="/"
            className="w-full flex items-center justify-center p-4 rounded-lg gap-2 hover:bg-gray-700 text-white duration-300"
            onClick={() => setIsOpen(false)}
          >
            <BsHouseDoor size={24} />
            Home
          </Link>
          <Link
            href="/produtos"
            className="w-full flex items-center justify-center p-4 rounded-lg gap-2 hover:bg-gray-700 text-white duration-300"
            onClick={() => setIsOpen(false)}
          >
            <BsTags size={24} />
            Produtos
          </Link>
          <Link
            href="/relatorios"
            className="w-full flex items-center justify-center p-4 rounded-lg gap-2 hover:bg-gray-700 text-white duration-300"
            onClick={() => setIsOpen(false)}
          >
            <BsClipboard2Data size={24} />
            Relatórios
          </Link>
          <Link
            href="/vendas"
            className="w-full flex items-center justify-center p-4 rounded-lg gap-2 hover:bg-gray-700 text-white duration-300"
            onClick={() => setIsOpen(false)}
          >
            <BsCart3 size={24} />
            Vendas
          </Link>
          <Link
            href="/os"
            className="w-full flex items-center justify-center p-4 rounded-lg gap-2 hover:bg-gray-700 text-white duration-300"
            onClick={() => setIsOpen(false)}
          >
            <BsWrenchAdjustable size={24} />
            Ordem de serviços
          </Link>
        </nav>
      </div>
    </header>
  );
}
