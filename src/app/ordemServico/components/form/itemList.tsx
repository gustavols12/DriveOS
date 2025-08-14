'use client';

import { FiTrash2 } from 'react-icons/fi';
import { ProductsPros } from '@/app/produtos/@types';

interface ItemListProps {
  listItems: ProductsPros[];
  handleRemoveItem: (id: string) => void;
  handleAddItemInList: () => void;
}

export function ItemList({
  listItems,
  handleRemoveItem,
  handleAddItemInList,
}: ItemListProps) {
  return (
    <div className="w-full flex flex-col gap-6 mt-6">
      {listItems.length > 0 && (
        <section className="w-full bg-gray-50 border border-gray-200 rounded-xl p-6 shadow">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Itens adicionados
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {listItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <div>
                  <p className="text-gray-800 font-medium">{item.name}</p>
                  <p className="text-gray-600 text-sm">R$ {item.price}</p>
                </div>
                <button
                  type="button"
                  className="text-red-600 hover:text-red-800 transition"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <button
        onClick={handleAddItemInList}
        type="button"
        className="w-full sm:w-40 bg-blue-600 border-none hover:bg-blue-700 transition-colors text-white font-semibold py-2 px-2 rounded-lg"
      >
        Adicionar
      </button>
    </div>
  );
}
