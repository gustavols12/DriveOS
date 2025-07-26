import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { error } from 'console';

export async function GET() {
  const clientes = await prisma.customer.findMany();
  return NextResponse.json(clientes);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, street, neighborhood, city } = body;

    if (!name || !phone || !email || !street || !neighborhood || !city) {
      return NextResponse.json({ error: 'informe corretamente os dados' });
    }
    const newClient = await prisma.customer.create({
      data: {
        name,
        phone,
        email,
        street,
        neighborhood,
        city,
      },
    });
    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao realizar a requisição' });
  }
}
