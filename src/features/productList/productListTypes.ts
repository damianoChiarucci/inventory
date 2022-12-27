const category = ["Casa", "Ufficio", "Svago"] as const;
export type Category = typeof category[number];
export const isCategory = (x: any): x is Category => category.includes(x);

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
}
