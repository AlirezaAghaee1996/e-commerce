import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import commentRouter from "./routes/commentRoute.js";
import orderRouter from "./routes/orderRoute.js";
import searchRouter from "./routes/searchRoute.js";
import HandleERROR from "./utils/handleError.js";
import { catchError } from "./utils/catchError.js";
import cartRouter from "./routes/cartRoute.js";
import swaggerJSDoc from "swagger-jsdoc";
import  SwaggerUiOptions  from "swagger-ui-express";
const app = express();


app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
//Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/search", searchRouter);
app.use("/api/v1/cart", cartRouter);

const option={
    definition:{
        openapi:'3.1.0',
        info:{
            title: 'Ecommerce API',
            version:'0.1.0',
            description:"this is class project e-commerce",
        },
        servers: [{url: `http://localhost:3001`}],
         
    },
    apis: ['./routes/*.js']
}
const specs=swaggerJSDoc(option)
app.use('/api-docs',SwaggerUiOptions.serve,SwaggerUiOptions.setup(specs)) 
app.use("*", (req, res, next) => {
    next(new HandleERROR(`can't find ${req.originalUrl} url on server`, 404));
  });
  app.use(catchError);
export default app;
