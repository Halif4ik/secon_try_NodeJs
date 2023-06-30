"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const exprApp = (0, express_1.default)();
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
    arrQueryParams.forEach(function (oneParam, i) {
        if (products[0][oneParam]) {
            result = products.find(function (product) {
                return product[oneParam].includes(reqQueryParam[oneParam]);
            });
        }
    });
    console.log('!-', result);
    result ? res.send(result) : res.sendStatus(404);
});
exprApp.listen(port, () => {
    console.log(`Example MYapp listening on port ${port}`);
});
