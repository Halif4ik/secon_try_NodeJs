"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRepository = void 0;
const products = [{ title: 'tomato', 'id': 1 },
    { title: 'banana', 'id': 2 }, { title: 'cucumber', 'id': 3 }];
exports.productsRepository = {
    findByTitle(title) {
        let result;
        result = products.find(function (product) {
            var _a;
            return (_a = product.title) === null || _a === void 0 ? void 0 : _a.includes(title ? title : '');
        });
        return result;
    },
    getProdBiId(id) {
        let result;
        result = products.find(function (product) {
            return product.id === id;
        });
        return result;
    },
    getAllProd() {
        return products;
    },
    createProduct(title) {
        let newId = Math.round(Math.random() * 10) + 3;
        const containsThisId = products.some(function (product) {
            return product.id === newId;
        });
        let temp = 0;
        if (containsThisId)
            temp = Math.round(Math.random() * (200 + newId)) + newId;
        newId = containsThisId ? temp : newId;
        let newProd = {
            title: title,
            id: newId
        };
        products.push(newProd);
        return newProd;
    },
    updateProduct(title, id) {
        const foundProduct = products.find(function (product) {
            return product.id === +id;
        });
        if (foundProduct)
            foundProduct.title = title;
        return !!foundProduct;
    },
    deleteProduct(id) {
        let deletedProduct;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                deletedProduct = products[i];
                products.splice(i, 1);
                return deletedProduct;
            }
        }
        return undefined;
    }
};
