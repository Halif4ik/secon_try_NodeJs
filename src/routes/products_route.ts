import {Request, Response, Router} from "express";
import {productsRepository} from "../repositories/products-repository";

export const productsRoute = Router({})

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

productsRoute.post('/', (req: Request, res: Response) => {
    const title: string = req.body.title;
    const newProd = productsRepository.createProduct(title);
    newProd ? res.status(201).send(newProd) : res.sendStatus(404)
});

productsRoute.put('/:ID', (req: Request, res: Response) => {
    const iDFromReqParams: string = req.params.ID;
    const titleInBody: string = req.body.title;
    const isUpdated = productsRepository.updateProduct(titleInBody, +iDFromReqParams)
    if (isUpdated) {
        const updatedProd = productsRepository.findByTitle(iDFromReqParams);
        res.status(204).send(updatedProd);
    } else res.sendStatus(404);
})
