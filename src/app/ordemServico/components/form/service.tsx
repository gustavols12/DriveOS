'use client';

interface ServiceProps {
  service: string;
  setService: (value: string) => void;
}

export function Service({ service, setService }: ServiceProps) {
  return (
    <div className="flex flex-col mt-4 mb-2">
      <label htmlFor="service" className="text-gray-700 font-semibold mb-1">
        Serviço realizado*
      </label>
      <textarea
        id="service"
        required
        rows={4}
        value={service}
        onChange={(e) => setService(e.target.value)}
        placeholder="Descrição do serviço"
        className="w-full rounded-md lg:h-40 text-black outline-none border border-gray-300 px-3 py-2 box-border resize-none"
      />
    </div>
  );
}
