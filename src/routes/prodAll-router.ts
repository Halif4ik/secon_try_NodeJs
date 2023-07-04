import {Request, Response, Router} from "express";
export const allProductsRoute = Router({})
interface IProduct {
    title?: string
    id?: number
}
const products: Array<IProduct> = [{title: 'tomato', 'id': 1} as IProduct, {title: 'banana', 'id': 2} as IProduct]

allProductsRoute.get('/', (req: Request, res: Response) => {
    products ? res.send(products) : res.sendStatus(404)
})