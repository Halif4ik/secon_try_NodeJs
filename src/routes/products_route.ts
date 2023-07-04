import {Request, Response, Router} from "express";

export const productsRoute = Router({})

interface IProduct {
    title?: string
    id?: number
}
const products: Array<IProduct> = [{title: 'tomato', 'id': 1} as IProduct, {title: 'banana', 'id': 2} as IProduct]

productsRoute.get('/:ID', (req: Request, res: Response) => {
    const reqProdID: string = req.params.ID;
    const result: IProduct | undefined = products.find(function (product) {
        return product.id === +reqProdID;
    });
    result ? res.send(result) : res.sendStatus(404)
});

productsRoute.get('/', (req: Request, res: Response) => {
    const reqQueryParam: Object = req.query;
    const arrQueryParams: string[] = Object.keys(reqQueryParam);
    let result: IProduct | undefined;
    console.log('reqQueryParam-', reqQueryParam);

    arrQueryParams.forEach(function (oneParam: string) {
        if (products[0][oneParam]) {
            let quryPar = Array.isArray(reqQueryParam[oneParam]) ? reqQueryParam[oneParam][0] : reqQueryParam[oneParam];
            result = products.find(function (product: IProduct) {
                return product[oneParam].includes(quryPar);
            });
        }
    });
    result ? res.send(result) : res.sendStatus(404)
});

productsRoute.delete('/:ID', (req: Request, res: Response) => {
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

productsRoute.post('/', (req: Request, res: Response) => {
    const reqBody: string = req.body.title;
    let newId: number = Math.round(Math.random() * 10) + 3;
    const containsThisId: boolean = products.some(function (product) {
        return product.id === newId;
    });
    let temp = 0;

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

productsRoute.put('/:ID', (req: Request, res: Response) => {
    const iDFromReqParams: string = req.params.ID;
    const titleInBody: string = req.body.title;
    const foundProduct: IProduct | undefined = products.find(function (product) {
        return product.id === +iDFromReqParams;
    });
    if (foundProduct) {
        foundProduct.title = titleInBody;
    }
    foundProduct ? res.status(204).send(foundProduct) : res.sendStatus(404)
})