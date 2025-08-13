import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function getDailyData() {
  const produtos = await prisma.produto.findMany();

  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const dia = new Date();
  const diaFormatado = new Intl.DateTimeFormat('pt-BR').format(dia);

  const session = await getServerSession(authOptions);

  const vendasDiarias = await prisma.sale.findMany({
    where: {
      userId: session?.user.id,
      createdAt: {
        gte: start,
        lte: end,
      },
    },
  });

  return {
    produtos,
    diaFormatado,
    session,
    vendasDiarias,
  };
}
