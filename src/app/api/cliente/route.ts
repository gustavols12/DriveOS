import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
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
      },
    });
    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao realizar a requisição' });
  }
}
