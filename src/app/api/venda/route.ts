import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { items, customerId, paymentMethod } = await req.json();

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

    return NextResponse.json({ message: 'sale created successfully' });
  } catch (error) {
    console.error('Erro ao salvar venda:', error);
    return NextResponse.json(
      { error: 'Erro ao realizar a requisição' },
      { status: 500 },
    );
  }
}
