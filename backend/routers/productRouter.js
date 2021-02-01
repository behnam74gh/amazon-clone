import express from "express";
import expressAsyncHandler from "express-async-handler";
import Data from "../Data.js";
import Product from "../models/productModel.js";

const productRouter = express.Router();

//sending all products to frontend
productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

//inserting data into Product(model || table) in database => mongodb
productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await Product.remove({});
    const createdProducts = await Product.insertMany(Data.products);
    res.send({ createdProducts });
  })
);

//products details api => it must be last api..because it has :id ===>(if we have this api with (:id) above the other api's..the route's other api,been like an id for this api )
productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found!" });
    }
  })
);

export default productRouter;
