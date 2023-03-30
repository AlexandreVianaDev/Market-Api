import { NextFunction, Request, Response } from "express";
import { market } from "./database";
import { TProductRequest } from "./interfaces";

export const verifyIfNameExistsPost = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const newProductsWithoutId: TProductRequest[] = req.body;

  const productFind: TProductRequest[] = newProductsWithoutId.filter(
    (product) => market.some((prod) => prod.name == product.name)
  );

  if (productFind.length > 0) {
    return res.status(409).json({
      error: "Product already registered",
    });
  }

  return next();
};

export const verifyIfNameExistsPatch = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const newInfos: TProductRequest = req.body;

  if (newInfos.name) {
    const productFilter = market.filter((prod) => {
      return prod.name === newInfos.name;
    });

    if (productFilter.length > 0) {
      return res.status(409).json({
        error: "Product already registered",
      });
    }
  }

  return next();
};

export const verifyIfIdExists = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const id = parseInt(req.params.id);
  const findIndex = market.findIndex((product) => product.id === id);

  if (findIndex === -1) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  res.locals.findIndex = findIndex;

  return next();
};
