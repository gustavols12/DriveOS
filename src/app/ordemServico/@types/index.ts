
export interface ServiceOrderProps {
  name: string;
  id: string;
  userId: string | null;
  customerId: string;
  product: Product[];
  customer: {
    id: string;
    name: string;
  };
}

interface Product {
  name: string;
  id: string;
  un: string;
  price: string;
}
