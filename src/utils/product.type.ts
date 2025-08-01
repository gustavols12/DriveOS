export interface ProductProps {
  name: string;
  id: string;
  un: string;
  price: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  userId?: string | null;
  serviceId?: string | null;
}
