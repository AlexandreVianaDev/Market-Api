import { NextFunction, Request, Response } from "express";
import { market } from "./database";
import { IProduct } from "./interfaces";

export const verifyIfNameExistsPost = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const newProducts = req.body;

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
  const newInfos = req.body;
  // const id = parseInt(req.params.id);
  const findIndex = res.locals.findIndex;

  //  || !newInfos
  if (newInfos.name) {
    if (newInfos.name === market[findIndex].name) {
      return next();
    }

    // const productOnMarket: IProduct | undefined = market.find(
    //   (prod) => prod.id === id
    // );

    // if (productOnMarket) {
    //   if (productOnMarket.name === req.body.name) {
    //     return next();
    //   }

    const productFilter = market.filter((prod) => {
      console.log(prod.name, newInfos.name);
      return prod.name === newInfos.name;
    });
    if (productFilter.length > 0) {
      console.log(req.method, req.body);
      return res.status(409).json({
        error: "Product already registered",
      });
    }
  }

  // }

  //   res.locals.product = productFind
  return next();
};

// export const verifyIfNameExistsPatch = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Response | void => {
//   const newProducts = req.body;

//   if (newProducts.name) {
//     const productFind = market.some((prod) => prod.name == newProducts.name);

//     if (!productFind) {
//       console.log(req.method, req.body);
//       return res.status(409).json({
//         error: "Product already registered",
//       });
//     }
//   }

//   //   res.locals.product = productFind
//   return next();
// };

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
