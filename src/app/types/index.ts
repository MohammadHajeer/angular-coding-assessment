export type Product = {
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  verified: boolean;
}