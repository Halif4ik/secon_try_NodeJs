import {Request, Response, Router} from "express";
import {productsRepository} from "../repositories/products-repository";
export const allProductsRoute = Router({})

allProductsRoute.get('/', (req: Request, res: Response) => {
    const products = productsRepository.getAllProd()
    products ? res.send(products) : res.sendStatus(404)
})