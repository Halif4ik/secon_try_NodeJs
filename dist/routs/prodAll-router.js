"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allProductsRoute = void 0;
const express_1 = require("express");
exports.allProductsRoute = (0, express_1.Router)({});
const products = [{ title: 'tomato', 'id': 1 }, { title: 'banana', 'id': 2 }];
exports.allProductsRoute.get('/', (req, res) => {
    products ? res.send(products) : res.sendStatus(404);
});
