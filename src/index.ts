import express from 'express'
import bodyParser from 'body-parser'
import {productsRoute} from "./routes/products_route";
import {allProductsRoute} from "./routes/prodAll-router";
import {helloRoute} from "./routes/helloRouter";


const port: string | number = process.env.PORT || 3000
const exprApp = express()

exprApp.use(bodyParser({}));
exprApp.use('/products', productsRoute);
exprApp.use('/productsAll', allProductsRoute);
exprApp.use('/hello', helloRoute);


/*start express App*/
exprApp.listen(port, () => {
    console.log(`Example MYapp listening on port ${port}`)
})