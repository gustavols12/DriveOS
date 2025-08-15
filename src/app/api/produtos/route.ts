import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import next from 'next';
import { error } from 'console';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { name, priceConvertido, un, stock } = await req.json();

    if (!name || !un || !priceConvertido || !stock) {
      return NextResponse.json({ error: 'informe corretamente os dados' });
    }
    const newProduct = await prisma.produto.create({
      data: {
        name: name,
        price: priceConvertido,
        un: un,
        stock: stock,
        userId: session.user.id,
      },
    });
    return NextResponse.json({ message: 'Product created successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao realizar a requisição' });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'não autorizado' }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { error: 'produto não encontrado' },
      { status: 404 },
    );
  }

  const saleItem = await prisma.saleItem.findFirst({
    where: {
      productId: id,
    },
  });
  if (saleItem) {
    return NextResponse.json(
      { error: 'Produto com venda efetuada' },
      { status: 422 },
    );
  }

  try {
    await prisma.produto.delete({
      where: {
        id: id as string,
      },
    });
    return NextResponse.json(
      { message: 'produto deletado com sucesso' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Falha ao deletar produto' },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { error: 'produto não encontrado' },
      { status: 404 },
    );
  }
  const body = await req.json();

  const { name, un, price, stock } = body;

  try {
    const updateProduct = await prisma.produto.update({
      where: {
        id: id as string,
      },
      data: {
        name,
        un,
        price,
        stock,
      },
    });
    return NextResponse.json(updateProduct);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar produto.' },
      { status: 500 },
    );
  }
}
