'use client';
import { useState, useEffect } from 'react';
import { ProductsPros } from '@/app/produtos/@types';
import { ClientProps } from '@/app/cliente/@types';
import { CartSummary } from './CartSummary';
import { CartAddProduct } from './cartAddProduct';

interface CartProps {
  cartItem: ProductsPros[];
  clients: ClientProps[];
}

export function Cart({ cartItem, clients }: CartProps) {
  const [cart, setCart] = useState<ProductsPros[]>([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [qtd, setQtd] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [payment, setPayment] = useState('');
  const [installments, setInstallments] = useState(1);
  const [clientId, setClientId] = useState('');

  // Atualiza total unitário e preço do produto selecionado
  useEffect(() => {
    const product = cartItem.find((item) => item.id === selectedProductId);
    if (product) {
      const price = parseFloat(product.price);
      setUnitPrice(price);
      setTotal(qtd * price);
    } else {
      setUnitPrice(0);
      setTotal(0);
    }
  }, [selectedProductId, qtd, cartItem]);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-2">
      <CartAddProduct
        cartItem={cartItem}
        cart={cart}
        setCart={setCart}
        selectedProductId={selectedProductId}
        setSelectedProductId={setSelectedProductId}
        qtd={qtd}
        setQtd={setQtd}
        unitPrice={unitPrice}
        total={total}
      />
      <CartSummary
        cart={cart}
        setCart={setCart}
        clients={clients}
        clientId={clientId}
        setClientId={setClientId}
        payment={payment}
        setPayment={setPayment}
        installments={installments}
        setInstallments={setInstallments}
      />
    </section>
  );
}
