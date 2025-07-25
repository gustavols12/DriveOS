import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { error } from 'console';

export async function GET() {
  const produtos = await prisma.produto.findMany();
  return NextResponse.json(produtos);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, cost, price, um } = body;

    if (!name || !cost || !price) {
      return NextResponse.json({ error: 'informe corretamente os dados' });
    }
    const newProduct = await prisma.produto.create({
      data: {
        name: name,
        cost: cost,
        price: price,
        um: um,
      },
    });
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao realizar a requisição' });
  }
}
