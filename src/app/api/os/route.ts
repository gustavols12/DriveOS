import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
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
      { message: 'Erro ao salvar Order de serviço' },
      { status: 500 },
    );
  }
}
