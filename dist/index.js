"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const parserMiddleWare = (0, body_parser_1.default)({});
const exprApp = (0, express_1.default)();
exprApp.use(parserMiddleWare);
const port = 3000;
const products = [{ title: 'tomato', id: 1 }, { title: 'banana', id: 2 }];
exprApp.get('/productsI/:ID', (req, res) => {
    const reqProdID = req.params.ID;
    const result = products.find(function (product) {
        return product.id === +reqProdID;
    });
    result ? res.send(result) : res.sendStatus(404);
});
exprApp.get('/products', (req, res) => {
    const reqQueryParam = req.query;
    const arrQueryParams = Object.keys(reqQueryParam);
    let result;
    arrQueryParams.forEach(function (oneParam) {
        if (products[0][oneParam]) {
            result = products.find(function (product) {
                return product[oneParam].includes(reqQueryParam[oneParam]);
            });
        }
    });
    result ? res.send(result) : res.sendStatus(404);
});
exprApp.get('/productsAll', (req, res) => {
    products ? res.send(products) : res.sendStatus(404);
});
exprApp.delete('/products/:ID', (req, res) => {
    const uriProdID = req.params.ID;
    let findedProduct;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +uriProdID) {
            findedProduct = products[i];
            products.splice(i, 1);
            break;
        }
    }
    findedProduct ? res.sendStatus(204) : res.sendStatus(404);
});
exprApp.post('/products', (req, res) => {
    const reqBody = req.body.title;
    let newId = Math.round(Math.random() * 10) + 3;
    const containsThisId = products.some(function (product) {
        return product.id === newId;
    });
    let temp;
    if (containsThisId)
        temp = Math.round(Math.random() * (200 + newId)) + newId;
    newId = containsThisId ? temp : newId;
    if (reqBody) {
        let newProd;
        newProd = {
            title: reqBody,
            id: newId
        };
        products.push(newProd);
        res.status(201).send(newProd);
    }
    else
        res.sendStatus(404);
});
exprApp.put('/products/:ID', (req, res) => {
    const iDFromReqParams = req.params.ID;
    const titleInBody = req.body.title;
    const foundProduct = products.find(function (product) {
        return product.id === +iDFromReqParams;
    });
    if (foundProduct) {
        foundProduct.title = titleInBody;
    }
    foundProduct ? res.status(204).send(foundProduct) : res.sendStatus(404);
});
exprApp.listen(port, () => {
    console.log(`Example MYapp listening on port ${port}`);
});
