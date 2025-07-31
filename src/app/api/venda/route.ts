import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: Request) {
  const vendas = await prisma.sale.findMany();
  return NextResponse.json(vendas);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { items, customerId, paymentMethod } = body;
    const total = items.reduce(
      (acc: number, item: any) => acc + item.price * item.quantity,
      0,
    );
    const newSale = await prisma.sale.create({
      data: {
        customerId,
        paymentMethod,
        total,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.quantity * item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(newSale);
  } catch (error) {
    console.error('Erro ao salvar venda:', error);
    return NextResponse.json(
      { error: 'Erro ao realizar a requisição' },
      { status: 500 },
    );
  }
}
