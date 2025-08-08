'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ProdutoMaisVendido {
  nome: string;
  quantidade: number;
}

interface Props {
  dados: ProdutoMaisVendido[];
}

const cores = ['#155dfc', '#1e2939', '#002549'];

export function ProdutosMaisVendidos({ dados }: Props) {
  return (
    <Card className="w-full h-96 mt-2">
      <CardHeader>
        <CardTitle className="text-lg text-center">
          Top 3 Produtos Vendidos
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dados}
              dataKey="quantidade"
              nameKey="nome"
              outerRadius={80}
              label
            >
              {dados.map((_, i) => (
                <Cell key={i} fill={cores[i % cores.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
