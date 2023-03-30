import { Request, Response } from "express";
import { market } from "./database";
import {
  ICleaningProduct,
  IFoodProduct,
  IProduct,
  TProductRequest,
} from "./interfaces";

export const createProducts = (req: Request, res: Response): Response => {
  const newProductsWithoutId: TProductRequest[] = req.body;

  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);

  const generateID = () => {
    if (market.length > 0) {
      return market[market.length - 1].id + 1;
    } else {
      return 1;
    }
  };

  const newProducts = newProductsWithoutId.map((product) => {
    const newProduct: IProduct | ICleaningProduct | IFoodProduct = {
      id: generateID(),
      ...product,
      expirationDate: date.toLocaleString("pt-BR"),
    };
    market.push(newProduct);
    return newProduct;
  });

  return res.status(201).json({
    total: newProducts.reduce((acc, actualValue) => {
      return acc + actualValue.price;
    }, 0),
    marketProducts: newProducts,
  });
};

export const getProducts = (req: Request, res: Response): Response => {
  return res.json({
    total: market.reduce((acc, actualValue) => {
      return acc + actualValue.price;
    }, 0),
    marketProducts: market,
  });
};

export const getProductById = (req: Request, res: Response): Response => {
  const findIndex: number = res.locals.findIndex;

  if (findIndex === -1) {
    return res.status(404).json({
      error: "Product not found",
    });
  } else {
    return res.json(market[findIndex]);
  }
};

export const updateProduct = (req: Request, res: Response): Response => {
  const newInfos: TProductRequest = req.body;
  const findIndex: number = res.locals.findIndex;

  market[findIndex] = {
    ...market[findIndex],
    ...newInfos,
  };

  return res.json(market[findIndex]);
};

export const deleteProduct = (req: Request, res: Response): Response => {
  const findIndex: number = res.locals.findIndex;
  market.splice(findIndex, 1);
  return res.status(204).send();
};
