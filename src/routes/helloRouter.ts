import {NextFunction, Request, Response, Router} from "express";
import {query} from "express-validator";
import {checkValidationInMiddleWare} from "./products_route";
export const helloRoute = Router({})

function urlValidMiddleware() {
    return query('person').isLength({min: 3, max: 100}).escape().withMessage("Query should be 3 ");
}


helloRoute.get('/',urlValidMiddleware(), checkValidationInMiddleWare, (req: Request, res: Response) => {
    const person: string | any = req.query.person;

    person ? res.send(person) : res.sendStatus(404)
})