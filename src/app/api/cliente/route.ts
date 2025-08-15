import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'não autorizado' }, { status: 401 });
  }
  try {
    const { name, phone, email } = await req.json();

    if (!name || !phone || !email) {
      return NextResponse.json({ error: 'informe corretamente os dados' });
    }
    const newClient = await prisma.customer.create({
      data: {
        name,
        phone,
        email,
        userId: session.user.id,
      },
    });
    return NextResponse.json({ message: 'Cliente cadastrado com sucesso' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Falha ao cadastrar cliente' },
      { status: 500 },
    );
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
      { error: 'Cliente não encontrado' },
      { status: 404 },
    );
  }
  const findSale = await prisma.sale.findFirst({
    where: {
      customerId: id,
    },
  });
  if (findSale) {
    return NextResponse.json(
      { error: 'Cliente com venda registrada' },
      { status: 422 },
    );
  }

  try {
    await prisma.customer.delete({
      where: {
        id: id as string,
      },
    });
    return NextResponse.json(
      { message: 'Cliente deletado com sucesso' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Falha ao deletar cliente' },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);

  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json(
      { error: 'Cliente não encontrado' },
      { status: 404 },
    );
  }
  const body = await req.json();

  const { name, phone, email } = body;
  try {
    const updateClient = await prisma.customer.update({
      where: { id: id as string },
      data: {
        name,
        phone,
        email,
      },
    });
    return NextResponse.json(
      { message: 'Cadastro atualizado' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar cliente.' },
      { status: 500 },
    );
  }
}
