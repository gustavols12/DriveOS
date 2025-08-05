import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  try {
    await prisma.service.delete({
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
