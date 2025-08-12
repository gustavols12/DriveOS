import { FiLoader } from 'react-icons/fi';

export default function Loading() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center gap-3">
      <button className=" animate-spin">
        <FiLoader size={30} color="black" />
      </button>
      <h1 className="text-3xl font-bold">Carregando página...</h1>
    </div>
  );
}
