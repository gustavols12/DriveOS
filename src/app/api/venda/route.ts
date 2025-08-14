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

    for (const item of items) {
      const product = await prisma.produto.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        return NextResponse.json(
          { error: `Produto ${item.productId} não encontrado` },
          { status: 404 },
        );
      }

      if (product.stock === null || product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Estoque insuficiente para ${product.name}` },
          { status: 400 },
        );
      }
    }

    // atualiza o estoque
    for (const item of items) {
      await prisma.produto.update({
        where: { id: item.productId },
        data: {
          stock: { decrement: item.quantity },
        },
      });
    }

    // Calcula total
    const total = items.reduce(
      (acc: number, item: any) => acc + item.price * item.quantity,
      0,
    );

    await prisma.sale.create({
      data: {
        userId: session.user.id,
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
