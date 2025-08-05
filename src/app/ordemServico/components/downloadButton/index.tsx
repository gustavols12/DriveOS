'use client';

import { BsDownload } from 'react-icons/bs';
import jsPDF from 'jspdf';

interface Product {
  name: string;
  price: string | number;
}

interface DownloadOSButtonProps {
  service: string;
  customer: string | undefined;
  products: Product[];
}

export function DownloadOSButton({
  service,
  customer,
  products,
}: DownloadOSButtonProps) {
  function generatePdf() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Ordem de Serviço', 105, 20, { align: 'center' });

    doc.setLineWidth(0.5);
    doc.line(10, 25, 200, 25);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Serviço: ${service}`, 10, 35);
    doc.text(`Cliente: ${customer}`, 10, 45);

    doc.line(10, 50, 200, 50);

    doc.setFont('helvetica', 'bold');
    doc.text('Produtos:', 10, 60);

    doc.setFont('helvetica', 'normal');
    let y = 70;
    products.forEach((p, index) => {
      const priceNumber =
        typeof p.price === 'number' ? p.price : parseFloat(p.price);
      doc.text(`${index + 1}. ${p.name} - R$ ${priceNumber.toFixed(2)}`, 15, y);
      y += 10;
    });

    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text('Gerado por Drive OS', 105, 285, { align: 'center' });

    doc.save('Ordem_de_Servico.pdf');
  }

  return (
    <button onClick={generatePdf} title="Baixar PDF">
      <BsDownload size={24} />
    </button>
  );
}
