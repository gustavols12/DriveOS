import { prisma } from '@/lib/prisma';
import { ProdutosMaisVendidos } from './components/top3Produtos';
import { ProdutoMaisVendido } from './@types';

export async function Dashboard() {
  const produtosVendidos = await prisma.saleItem.groupBy({
    by: ['productId'],
    _sum: {
      quantity: true,
    },
    orderBy: {
      _sum: {
        quantity: 'desc',
      },
    },
    take: 3,
    where: {},
  });
  const produtosIds = produtosVendidos.map((p) => p.productId);
  const produtos = await prisma.produto.findMany({
    where: { id: { in: produtosIds } },
  });
  const top3: ProdutoMaisVendido[] = produtosVendidos.map((pv) => {
    const prod = produtos.find((p) => p.id === pv.productId);
    return {
      nome: prod?.name || 'Produto desconhecido',
      quantidade: pv._sum.quantity ?? 0,
    };
  });
  return <ProdutosMaisVendidos dados={top3} />;
}
