// components/os/OsForm.tsx
'use client';

import { ClientProps } from '@/app/cliente/@types';
import { ProductsPros } from '@/app/produtos/@types';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import toast from 'react-hot-toast';

import { DownloadOSButton } from '../downloadButton';
import { Customer } from './customer';
import { Product } from './product';
import { ItemList } from './itemList';
import { Service } from './service';

interface OsProps {
  products: ProductsPros[];
  customers: ClientProps[];
}

export function OsForm({ products, customers }: OsProps) {
  const [customerId, setCustomerId] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<
    ClientProps | undefined
  >();
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [productId, setProductId] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<
    ProductsPros | undefined
  >();
  const [qtde, setQtde] = useState(1);
  const [price, setPrice] = useState('');
  const [listItems, setListItems] = useState<ProductsPros[]>([]);

  const [service, setService] = useState('');

  const componentRef = useRef<HTMLFormElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'Ordem-de-servico',
  });

  useEffect(() => {
    const clienteFiltrado = customers.find((c) => c.id === customerId);
    setSelectedCustomer(clienteFiltrado);
    if (clienteFiltrado) {
      setPhone(clienteFiltrado.phone);
      setEmail(clienteFiltrado.email);
    } else {
      setPhone('');
      setEmail('');
      setPrice('');
    }
  }, [customerId]);

  useEffect(() => {
    const produtoFiltrado = products.find((p) => p.id === productId);
    setSelectedProduct(produtoFiltrado);
    if (produtoFiltrado) setPrice(produtoFiltrado.price);
  }, [productId]);

  function handleAddItemInList(e?: FormEvent) {
    e?.preventDefault();
    if (!selectedProduct) return;
    const exist = listItems.find((item) => item.id === selectedProduct.id);
    if (exist) {
      const novaQtd = parseInt(exist.un) + qtde;
      exist.un = String(novaQtd);
      exist.price = (parseFloat(selectedProduct.price) * novaQtd).toFixed(2);
      setListItems([...listItems]);
    } else {
      setListItems([
        ...listItems,
        {
          id: selectedProduct.id,
          name: selectedProduct.name,
          un: String(qtde),
          price: (parseFloat(selectedProduct.price) * qtde).toFixed(2),
        },
      ]);
    }
  }

  function handleRemoveItem(id: string) {
    setListItems(listItems.filter((item) => item.id !== id));
  }

  async function handleSaveServiceOrder(e: FormEvent) {
    e.preventDefault();
    if (listItems.length === 0 || !customerId || !service) {
      toast.error('Preencha todos os campos da ordem de serviço');
      return;
    }
    try {
      const res = await fetch('/api/os', {
        method: 'POST',
        body: JSON.stringify({ listItems, customerId, service }),
      });
      if (!res.ok) {
        const { error } = await res.json();
        toast.error(error);
        return;
      }
      toast.success('Ordem de serviço salva');
      setCustomerId('');
      setEmail('');
      setPhone('');
      setProductId('');
      setQtde(0);
      setPrice('');
      setService('');
      setListItems([]);
    } catch (error) {
      toast.error('Erro ao salvar ordem de serviço');
    }
  }

  return (
    <form
      ref={componentRef}
      onSubmit={handleSaveServiceOrder}
      className="w-full max-w-7xl mx-auto shadow shadow-gray-300 rounded-xl mt-4 mb-2 p-6"
    >
      <div className="flex items-center justify-end">
        {selectedCustomer && service && listItems.length > 0 && (
          <DownloadOSButton
            customer={selectedCustomer.name}
            service={service}
            products={listItems.map((item) => ({
              name: item.name,
              price: item.price,
            }))}
          />
        )}
      </div>

      <Customer
        customers={customers}
        customerId={customerId}
        setCustomerId={setCustomerId}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
      />

      <Product
        products={products}
        productId={productId}
        setProductId={setProductId}
        price={price}
        setPrice={setPrice}
        qtde={qtde}
        setQtde={setQtde}
      />

      <ItemList
        listItems={listItems}
        handleRemoveItem={handleRemoveItem}
        handleAddItemInList={handleAddItemInList}
      />

      <Service service={service} setService={setService} />

      <button
        type="submit"
        className="w-full mt-4 sm:w-auto bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-2 px-6 rounded-lg shadow-md cursor-pointer"
      >
        Salvar
      </button>
    </form>
  );
}
