"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allProductsRoute = void 0;
const express_1 = require("express");
const products_repository_1 = require("./products-repository");
exports.allProductsRoute = (0, express_1.Router)({});
exports.allProductsRoute.get('/', (req, res) => {
    const products = products_repository_1.productsRepository.getAllProd();
    products ? res.send(products) : res.sendStatus(404);
});
