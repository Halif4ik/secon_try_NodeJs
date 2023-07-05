"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRoute = void 0;
const express_1 = require("express");
exports.productsRoute = (0, express_1.Router)({});
const products = [{ title: 'tomato', 'id': 1 }, { title: 'banana', 'id': 2 }];
exports.productsRoute.get('/:ID', (req, res) => {
    const reqProdID = req.params.ID;
    const result = products.find(function (product) {
        return product.id === +reqProdID;
    });
    result ? res.send(result) : res.sendStatus(404);
});
exports.productsRoute.get('/', (req, res) => {
    const reqQueryParam = req.query;
    const arrQueryParams = Object.keys(reqQueryParam);
    let result;
    console.log('reqQueryParam-', reqQueryParam);
    arrQueryParams.forEach(function (oneParam) {
        if (products[0][oneParam]) {
            let quryPar = Array.isArray(reqQueryParam[oneParam]) ? reqQueryParam[oneParam][0] : reqQueryParam[oneParam];
            result = products.find(function (product) {
                return product[oneParam].includes(quryPar);
            });
        }
    });
    result ? res.send(result) : res.sendStatus(404);
});
exports.productsRoute.delete('/:ID', (req, res) => {
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
exports.productsRoute.post('/', (req, res) => {
    const reqBody = req.body.title;
    let newId = Math.round(Math.random() * 10) + 3;
    const containsThisId = products.some(function (product) {
        return product.id === newId;
    });
    let temp = 0;
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
exports.productsRoute.put('/:ID', (req, res) => {
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
