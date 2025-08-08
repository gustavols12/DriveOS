import { prisma } from '@/lib/prisma';
import { ProdutosMaisVendidos } from './components/top3Produtos';
import { ProdutoMaisVendido } from './@types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { GraficoVendasPorFaixa } from './components/vendas';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function Dashboard() {
  const session = await getServerSession(authOptions);
  // query de produtos
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

  // query de vendas
  const agora = new Date();
  const primeiroDiaMes = new Date(agora.getFullYear(), agora.getMonth(), 1);
  const ultimoDiaMes = new Date(agora.getFullYear(), agora.getMonth() + 1, 0);

  const vendas = await prisma.sale.findMany({
    where: {
      createdAt: {
        gte: primeiroDiaMes,
        lte: ultimoDiaMes,
      },
    },
    select: {
      createdAt: true,
      total: true,
    },
  });
  const intervaloVendas: Record<string, number> = {
    'Dia: 1 ao 10': 0,
    'Dia: 11 ao 20': 0,
    'Dia: 21 ao 31': 0,
  };

  vendas.forEach(({ createdAt, total }) => {
    if (!createdAt) return;
    const dia = new Date(createdAt).getDate();

    if (dia <= 10) intervaloVendas['Dia: 1 ao 10'] += total;
    else if (dia <= 20) intervaloVendas['Dia: 11 ao 20'] += total;
    else intervaloVendas['Dia: 21 ao 31'] += total;
  });

  const vendasFaixaArray = Object.entries(intervaloVendas).map(
    ([faixa, total]) => ({
      faixa,
      total,
    }),
  );

  const vendasFormatado = vendasFaixaArray.map(({ faixa, total }) => ({
    label: faixa,
    valor: parseFloat(total.toFixed(2)),
  }));

  return (
    <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 items-center justify-center">
      <ProdutosMaisVendidos dados={top3} />

      <Card className="w-full h-96 mt-2">
        <CardHeader>
          <CardTitle>Vendas por Faixa do Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <GraficoVendasPorFaixa data={vendasFormatado} />
        </CardContent>
      </Card>
    </div>
  );
}
