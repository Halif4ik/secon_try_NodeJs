import {NextFunction, Request, Response, Router} from "express";
import {checkValidationInMiddleWare,urlValidMiddleware} from "../midleware/validator";
export const helloRoute = Router({})



helloRoute.get('/',urlValidMiddleware(), checkValidationInMiddleWare, (req: Request, res: Response) => {
    const person: string | any = req.query.person;

    person ? res.send(person) : res.sendStatus(404)
})