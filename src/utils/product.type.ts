export interface ProductProps {
  name: string;
  id: string;
  un: string;
  price: string;
  stock: number | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  userId?: string | null;
  serviceId?: string | null;
}
