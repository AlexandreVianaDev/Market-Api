//Arquivo que vai conter todas as callbacks utilizadas nos métodos HTTP do Express, essas callbacks terão toda a lógica da aplicação
import express, { Application, json, Request, Response } from "express";
import { market } from "./database";
import { IFoodProduct, IProduct, TProductRequest } from "./interfaces";

export const createProducts = (req: Request, res: Response): Response => {
  const products: TProductRequest[] = req.body;

  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);

  const generateID = () => {
    if (market.length > 0) {
      return market[market.length - 1].id + 1;
    } else {
      return 1;
    }
  };

  const newProducts = products.map((product) => {
    const newProduct: IProduct = {
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
  const id = parseInt(req.params.id);
  const findIndex = market.findIndex((product) => product.id === id);

  if (findIndex === -1) {
    return res.status(404).json({
      error: "Product not found",
    });
  } else {
    return res.json(market[findIndex]);
  }
};

export const updateProduct = (req: Request, res: Response): Response => {
  const newInfos = req.body;
  const findIndex = res.locals.findIndex;

  const product = market[findIndex];
  product.name = newInfos.name;
  product.price = newInfos.price;
  product.weight = newInfos.weight;
  // product.calories = newInfos.calories;

  return res.json(product);
};

// export const updateProduct = (req: Request, res: Response): Response => {
//   const newInfos = req.body;
//   const id = parseInt(req.params.id);

//   const product = market.find((product) => product.id === id);
//   if (product) {
//     product.name = newInfos?.name;
//     product.price = newInfos?.price;
//     product.weight = newInfos?.weight;
//   }

//   return res.json(product);
// };

export const deleteProduct = (req: Request, res: Response): Response => {
  const findIndex = res.locals.findIndex;
  market.splice(findIndex, 1);
  return res.status(204).send();
};
