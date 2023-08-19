"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkValidationInMiddleWare = exports.productsRoute = void 0;
const express_1 = require("express");
const products_repository_1 = require("../repositories/products-repository");
const express_validator_1 = require("express-validator");
exports.productsRoute = (0, express_1.Router)({});
function titleValidMiddleware() {
    return (0, express_validator_1.body)('title').trim().isLength({ min: 3, max: 10 }).escape().withMessage("Min length should be 3");
}
function emailValidMiddleware() {
    return (0, express_validator_1.body)('email').isEmail().withMessage("Email should be email");
}
function checkValidationInMiddleWare(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty())
        next();
    else {
        res.status(400).send({ errors: errors.array() });
    }
}
exports.checkValidationInMiddleWare = checkValidationInMiddleWare;
exports.productsRoute.post('/', titleValidMiddleware(), emailValidMiddleware(), checkValidationInMiddleWare, (req, res) => {
    const autorHeders = req.headers.authorization;
    if (autorHeders) {
        const cutAuth = autorHeders.substring(autorHeders.indexOf(' ') + 1);
        console.log('cutAuth-', cutAuth);
        console.log(cutAuth === 'aGFsbDoxMjM=');
    }
    const title = req.body.title;
    const email = req.body.email;
    const newProd = products_repository_1.productsRepository.createProduct(title, email);
    newProd ? res.status(201).send(newProd) : res.sendStatus(404);
});
exports.productsRoute.get('/', (req, res) => {
    const title = req.query.title;
    const foundProd = products_repository_1.productsRepository.findByTitle(title);
    foundProd ? res.send(foundProd) : res.sendStatus(404);
});
exports.productsRoute.get('/:ID', (req, res) => {
    const reqProdID = req.params.ID;
    const foundProd = products_repository_1.productsRepository.getProdBiId(+reqProdID);
    foundProd ? res.send(foundProd) : res.sendStatus(404);
});
exports.productsRoute.delete('/:ID', (req, res) => {
    const uriProdID = req.params.ID;
    const findedProduct = products_repository_1.productsRepository.deleteProduct(+uriProdID);
    findedProduct ? res.status(204).send(findedProduct) : res.sendStatus(404);
});
exports.productsRoute.put('/:ID', titleValidMiddleware(), (req, res) => {
    const iDFromReqParams = req.params.ID;
    const titleInBody = req.body.title;
    const isUpdated = products_repository_1.productsRepository.updateProduct(titleInBody, +iDFromReqParams);
    if (isUpdated) {
        const updatedProd = products_repository_1.productsRepository.findByTitle(iDFromReqParams);
        res.status(204).send(updatedProd);
    }
    else
        res.sendStatus(404);
});
