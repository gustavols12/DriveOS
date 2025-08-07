import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { name, priceConvertido, un, stock } = await req.json();

    if (!name || !un || !priceConvertido || !stock) {
      return NextResponse.json({ error: 'informe corretamente os dados' });
    }
    const newProduct = await prisma.produto.create({
      data: {
        name: name,
        price: priceConvertido,
        un: un,
        stock: stock,
        userId: session.user.id,
      },
    });
    return NextResponse.json({ message: 'Product created successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao realizar a requisição' });
  }
}
