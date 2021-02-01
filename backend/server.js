import express from "express";
import mongoose from "mongoose";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import dotenv from "dotenv";
import OrderRouter from "./routers/orderRouter.js";

//this block of code is necessery to can use from the content in the .env fail.. please, if you use from 'Git'! add it to .gitignore ==> because, it must be hidden for other people
dotenv.config();

const app = express();

//by having this 2 settings(or middlwares) to express: all request that contains data(Post method) will be translated to req.body to your node application .. (we can use from Postman,for test our post data and backend api)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect to database with below code
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost/amazona", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
//connect to database with above code

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", OrderRouter);
//use method is for access to expressRoutes

//home route for server
app.get("/", (req, res) => {
  res.send("Server is Ready for Fucking..");
});

//for catching error in async api=> from expressAsyncHandler
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

//executive server in port 5000
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
