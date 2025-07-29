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
