import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user)
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  try {
    const { customerId, service, listItems } = await req.json();

    await prisma.service.create({
      data: {
        name: service,
        customerId,
        userId: session.user.id,
        product: {
          connect: listItems.map((item: { id: string }) => ({ id: item.id })),
        },
      },
    });
    return NextResponse.json({ message: 'Cadastro realizado com sucesso' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao salvar Ordem de serviço' },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'O.S não encontrado' }, { status: 404 });
  }
  try {
    await prisma.service.delete({
      where: { id: id as string },
    });
    return NextResponse.json({
      message: 'Ordem de serviço deletado com sucesso',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao deletar O.S.' },
      { status: 500 },
    );
  }
}
