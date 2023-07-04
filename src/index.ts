import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import {productsRoute} from "./routes/products_route";
import {allProductsRoute} from "./routes/prodAll-router";

const parserMiddleWare = bodyParser({})
const exprApp = express()
exprApp.use(parserMiddleWare);

exprApp.use('/products',productsRoute);
exprApp.use('/productsAll',allProductsRoute);
const port: number = 3000


/*start express App*/
exprApp.listen(port, () => {
    console.log(`Example MYapp listening on port ${port}`)
})