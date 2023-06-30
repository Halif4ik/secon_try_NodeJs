import express, {Request, Response} from 'express'

const exprApp = express()
const port = 3000

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

    arrQueryParams.forEach(function (oneParam,i){
        if(products[0][oneParam]) {
            result = products.find(function (product) {
                return  product[oneParam].includes(reqQueryParam[oneParam]);
            });
        }
    });
    result ? res.send(result) : res.sendStatus(404)
})


exprApp.listen(port, () => {
    console.log(`Example MYapp listening on port ${port}`)
})