import {NextFunction, Request, Response, Router} from "express";
import {productsRepository} from "../repositories/products-repository";
import {checkValidationInMiddleWare,titleValidMiddleware,emailValidMiddleware} from "../midleware/validator";

export const productsRoute = Router({})


productsRoute.post('/', titleValidMiddleware(), emailValidMiddleware(), checkValidationInMiddleWare, (req: Request, res: Response) => {
    const autorHeders: string | undefined = req.headers.authorization;
    if (autorHeders) {
        const cutAuth = autorHeders.substring(autorHeders.indexOf(' ') + 1);
        console.log('cutAuth-', cutAuth);
        console.log(cutAuth === 'aGFsbDoxMjM=');
    }
    const title: string = req.body.title;
    const email: string = req.body.email;
    const newProd = productsRepository.createProduct(title, email);
    newProd ? res.status(201).send(newProd) : res.sendStatus(404)
});

productsRoute.get('/', (req: Request, res: Response) => {
    const title: string | any = req.query.title;
    const foundProd = productsRepository.findByTitle(title);
    foundProd ? res.send(foundProd) : res.sendStatus(404)
});

productsRoute.get('/:ID', (req: Request, res: Response) => {
    const reqProdID: string = req.params.ID;
    const foundProd = productsRepository.getProdBiId(+reqProdID);
    foundProd ? res.send(foundProd) : res.sendStatus(404)
});

productsRoute.delete('/:ID', (req: Request, res: Response) => {
    const uriProdID: string = req.params.ID;
    const findedProduct = productsRepository.deleteProduct(+uriProdID);
    findedProduct ? res.status(204).send(findedProduct) : res.sendStatus(404)
})

productsRoute.put('/:ID', titleValidMiddleware(), (req: Request, res: Response) => {
    const iDFromReqParams: string = req.params.ID;
    const titleInBody: string = req.body.title;
    const isUpdated = productsRepository.updateProduct(titleInBody, +iDFromReqParams)
    if (isUpdated) {
        const updatedProd = productsRepository.findByTitle(iDFromReqParams);
        res.status(204).send(updatedProd);
    } else res.sendStatus(404);
})

