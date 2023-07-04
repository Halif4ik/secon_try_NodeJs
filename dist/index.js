"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const products_route_1 = require("./routes/products_route");
const prodAll_router_1 = require("./routes/prodAll-router");
const parserMiddleWare = (0, body_parser_1.default)({});
const exprApp = (0, express_1.default)();
exprApp.use(parserMiddleWare);
exprApp.use('/products', products_route_1.productsRoute);
exprApp.use('/productsAll', prodAll_router_1.allProductsRoute);
const port = 3000;
/*start express App*/
exprApp.listen(port, () => {
    console.log(`Example MYapp listening on port ${port}`);
});
