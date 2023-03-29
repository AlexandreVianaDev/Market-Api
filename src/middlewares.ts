import { NextFunction, Request, Response } from "express";
import { market } from "./database";
import { IProduct } from "./interfaces";

export const verifyIfNameExistsPost = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const newProducts = req.body;
  console.log(req.body);

  const productFind: IProduct[] = newProducts.filter((product: IProduct) =>
    market.some((prod) => prod.name == product.name)
  );

  if (productFind.length > 0) {
    return res.status(409).json({
      error: "Product already registered",
    });
  }

  return next();

  //   res.locals.product = productFind
};

export const verifyIfNameExistsPatch = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const newProducts = req.body;
  console.log(req.body);

  const productFind = market.some((prod) => prod.name == newProducts.name);

  if (productFind) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  //   res.locals.product = productFind
  return next();
};
