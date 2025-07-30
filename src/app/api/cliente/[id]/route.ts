import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    await prisma.customer.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: 'Cliente deletado com sucesso' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao deletar cliente.' },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const body = await req.json();

  const { name, phone, email } = body;
  try {
    const updateClient = await prisma.customer.update({
      where: { id: id },
      data: {
        name,
        phone,
        email,
      },
    });
    return NextResponse.json(updateClient);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar cliente.' },
      { status: 500 },
    );
  }
}
