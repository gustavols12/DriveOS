'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BsCart3,
  BsHouseDoor,
  BsWrenchAdjustable,
  BsTags,
  BsList,
  BsX,
  BsFillPersonPlusFill,
} from 'react-icons/bs';
import { MdLogin } from 'react-icons/md';
import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FiLoader } from 'react-icons/fi';
import { FaArrowDown, FaArrowLeft, FaRegUser } from 'react-icons/fa';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const pathname = usePathname();
  const { status, data } = useSession();

  async function handleLogin() {
    await signIn();
  }

  async function handleLogout() {
    await signOut();
  }

  return (
    <header className="w-full h-20 bg-[#1e2939] sm:w-60 sm:h-screen relative sm:flex sm:flex-col  sm:rounded-r-3xl">
      <div className="my-2 flex items-center justify-between p-2 sm:justify-center">
        <button className="cursor-pointer sm:hidden z-50" onClick={toggleMenu}>
          {isOpen ? (
            <BsX size={30} className="text-gray-300" />
          ) : (
            <BsList size={30} className="text-gray-300" />
          )}
        </button>
        <Link href="/">
          <h1 className="text-3xl text-gray-300 font-bold hover:tracking-wider duration-300">
            Drive<span className="text-blue-400">Os</span>
          </h1>
        </Link>
        <div>
          {' '}
          {status === 'unauthenticated' && (
            <button
              className="w-full flex flex-col items-center justify-self-auto p-4 gap-2 text-white cursor-pointer"
              onClick={handleLogin}
            >
              <FaRegUser size={30} className="text-gray-300" />
            </button>
          )}
          {status === 'authenticated' && (
            <button
              className="w-full flex items-center justify-self-auto p-4 gap-2 text-white cursor-pointer"
              onClick={handleLogout}
            >
              <MdLogin size={30} className="text-gray-300" />
            </button>
          )}
          {status === 'loading' && (
            <button className="w-full flex items-center justify-self-auto animate-spin">
              <FiLoader size={30} className="text-gray-300" />
            </button>
          )}
        </div>
      </div>
      <div
        className={`
        fixed top-0 left-0 w-64 h-screen bg-[#1e2939] z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        sm:static sm:translate-x-0 sm:w-auto sm:h-auto sm:block sm:flex-1 sm:overflow-y-auto sm:py-2 py-15
      `}
      >
        <nav className="flex flex-col items-center justify-center text-gray-300 font-medium m-2">
          {data?.user ? (
            <p className="mb-2 font-medium">Olá {data?.user?.name}</p>
          ) : (
            <p className="mb-2 font-medium">Olá visitante</p>
          )}
          <Link
            href="/"
            className={`w-full flex items-center justify-self-auto p-4 rounded-lg gap-2 hover:bg-gray-700 text-white duration-300  ${
              pathname === '/' ? 'bg-[#155dfc]' : 'hover:bg-gray-700'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <BsHouseDoor size={24} />
            Home
          </Link>

          <Link
            href="/produtos"
            className={`w-full flex items-center justify-self-auto p-4 rounded-lg gap-2 hover:bg-gray-700 text-white duration-300  ${
              pathname === '/produtos' ? 'bg-[#155dfc]' : 'hover:bg-gray-700'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <BsTags size={24} />
            Produtos
          </Link>

          <Link
            href="/cliente"
            className={`w-full flex items-center justify-self-auto p-4 rounded-lg gap-2 hover:bg-gray-700 text-white duration-300  ${
              pathname === '/cliente' ? 'bg-[#155dfc]' : 'hover:bg-gray-700'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <BsFillPersonPlusFill size={24} />
            Clientes
          </Link>

          <Link
            href="/vendas"
            className={`w-full flex items-center justify-self-auto p-4 rounded-lg gap-2 hover:bg-gray-700 text-white duration-300  ${
              pathname === '/vendas' ? 'bg-[#155dfc]' : 'hover:bg-gray-700'
            }`}
            onClick={() => setIsOpen(false)}
          >
            <BsCart3 size={24} />
            Vendas
          </Link>

          <div className="w-full flex flex-col">
            <Link
              href="/ordemServico"
              className={`w-full flex items-center justify-between p-4 rounded-lg gap-2 hover:bg-gray-700 text-white duration-300  ${
                pathname === '/ordemServico'
                  ? 'bg-[#155dfc]'
                  : 'hover:bg-gray-700'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex gap-2 items-center justify-start flex-1">
                <BsWrenchAdjustable size={24} />
                serviço
              </div>
              <button onClick={toggleDropdown}>
                {dropdownOpen ? (
                  <FaArrowDown size={18} />
                ) : (
                  <FaArrowLeft size={18} />
                )}
              </button>
            </Link>
            {dropdownOpen && (
              <ul className="pl-10 pt-1 pb-2 text-sm bg-gray-800 rounded-b-lg">
                <li>
                  <Link
                    href="/ordemServico/detalhes"
                    className=" block py-1 px-2 rounded hover:text-white hover:font-bold hover:transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Detalhes
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
