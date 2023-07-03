import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

const parserMiddleWare = bodyParser({})
const exprApp = express()
exprApp.use(parserMiddleWare);
const port: number = 3000

interface IProduct {
    title: string
    id?: number
}

const products: Array<IProduct> = [{title: 'tomato', id: 1} as IProduct, {title: 'banana', id: 2} as IProduct]

exprApp.get('/productsI/:ID', (req: Request, res: Response) => {
    const reqProdID: string = req.params.ID;
    const result: IProduct | undefined = products.find(function (product) {
        return product.id === +reqProdID;
    });
    result ? res.send(result) : res.sendStatus(404)
});
exprApp.get('/products', (req: Request, res: Response) => {
    const reqQueryParam: Object = req.query;
    const arrQueryParams: string[] = Object.keys(reqQueryParam);
    let result: IProduct | undefined;

    arrQueryParams.forEach(function (oneParam) {
        if (products[0][oneParam]) {
            result = products.find(function (product) {
                return product[oneParam].includes(reqQueryParam[oneParam]);
            });
        }
    });
    result ? res.send(result) : res.sendStatus(404)
});

exprApp.get('/productsAll', (req: Request, res: Response) => {
    products ? res.send(products) : res.sendStatus(404)
})

exprApp.delete('/products/:ID', (req: Request, res: Response) => {
    const uriProdID: string = req.params.ID;
    let findedProduct: IProduct | undefined;

    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +uriProdID) {
            findedProduct = products[i];
            products.splice(i, 1);
            break;
        }
    }
    findedProduct ? res.sendStatus(204) : res.sendStatus(404)
})

exprApp.post('/products', (req: Request, res: Response) => {
    const reqBody: string = req.body.title;
    let newId: number = Math.round(Math.random() * 10) + 3;
    const containsThisId: boolean = products.some(function (product) {
        return product.id === newId;
    });
    let temp:number;
    if (containsThisId) temp = Math.round(Math.random() * (200 + newId)) + newId
    newId = containsThisId ? temp : newId;

    if (reqBody) {
        let newProd: IProduct;
        newProd = {
            title: reqBody,
            id: newId
        }
        products.push(newProd);
        res.status(201).send(newProd);
    } else res.sendStatus(404)
});

exprApp.put('/products/:ID', (req: Request, res: Response) => {
    const iDFromReqParams: string = req.params.ID;
    const titleInBody: string = req.body.title;
    const foundProduct: IProduct | undefined = products.find(function (product) {
        return product.id === +iDFromReqParams;
    });
    if(foundProduct){
        foundProduct.title=titleInBody;
    }
    foundProduct ? res.status(204).send(foundProduct) : res.sendStatus(404)
})

exprApp.listen(port, () => {
    console.log(`Example MYapp listening on port ${port}`)
})