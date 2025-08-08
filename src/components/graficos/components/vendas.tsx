'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface FaixaVenda {
  label: string;
  valor: number;
}

export function GraficoVendasPorFaixa({ data }: { data: FaixaVenda[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Movimento registrado</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="valor" fill="#1e2939" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
