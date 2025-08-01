import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { name, price, un } = await req.json();

    if (!name || !un || !price) {
      return NextResponse.json({ error: 'informe corretamente os dados' });
    }
    const newProduct = await prisma.produto.create({
      data: {
        name: name,
        price: price,
        un: un,
      },
    });
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao realizar a requisição' });
  }
}
