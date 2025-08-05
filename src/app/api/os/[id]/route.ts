import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  const session = await getServerSession(authOptions);
  if (!session || !session.user)
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
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
