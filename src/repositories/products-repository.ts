interface IProduct {
    title: string
    email?: string
    id?: number
}

const products: Array<IProduct> = [{title: 'tomato', 'id': 1} as IProduct,
    {title: 'banana', 'id': 2} as IProduct, {title: 'cucumber', 'id': 3} as IProduct]

export const productsRepository = {
    findByTitle(title: string | null): IProduct | undefined {
        let result: IProduct | undefined;
        result = products.find(function (product: IProduct) {
            return product.title?.includes(title ? title : '');
        });
        return result;
    },
    getProdBiId(id: number): IProduct | undefined {
        let result: IProduct | undefined;
        result = products.find(function (product: IProduct) {
            return product.id === id;
        });
        return result;
    },
    getAllProd(): IProduct[] {
        return products;
    },

    createProduct(title: string, email: string): IProduct {
        let newId: number = Math.round(Math.random() * 10) + 3;
        const containsThisId: boolean = products.some(function (product) {
            return product.id === newId;
        });
        let temp = 0;
        if (containsThisId) temp = Math.round(Math.random() * (200 + newId)) + newId
        newId = containsThisId ? temp : newId;
        let newProd = {
            title: title,
            email: email,
            id: newId
        } as IProduct
        products.push(newProd);
        return newProd;
    },

    updateProduct(title: string, id: number): boolean {
        const foundProduct: IProduct | undefined = products.find(function (product) {
            return product.id === +id;
        });
        if (foundProduct) foundProduct.title = title;
        return !!foundProduct;

    },

    deleteProduct(id: number): IProduct | undefined {
        let deletedProduct: IProduct | undefined;
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
