export interface IProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: "food" | "cleaning";
  expirationDate: string;
}

export type TProductRequest = Omit<IProduct, "id" | "expirationDate">;

export interface ICleaningProduct extends IProduct {}

export interface IFoodProduct extends IProduct {
  calories: number;
}
