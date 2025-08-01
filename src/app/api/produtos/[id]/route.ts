import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    await prisma.produto.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao deletar produto.' },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  const body = await req.json();

  const { name, un, price } = body;

  try {
    const updateProduct = await prisma.produto.update({
      where: {
        id: id,
      },
      data: {
        name,
        un,
        price,
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
