import { addProductToDB, getDataFromDB } from "./connection";

const QUERIES = {
    GET_ALL_PRODUCTS: 'select id, title, description, price, count from products left join stocks on products.id = stocks.product_id ',
    GET_PRODUCT_BY_ID: 'select id, title, description, price, count from products left join stocks on products.id = stocks.product_id WHERE products.id = $1'
}

export const getAllProductsFromDB = async () => {
    return await getDataFromDB(QUERIES.GET_ALL_PRODUCTS);
}

export const getProductByIdFromDB = async (id) => {
    return await getDataFromDB(QUERIES.GET_PRODUCT_BY_ID, [id]);
}

export const putProductToDB = async (data) => {
    return await addProductToDB(data);
}
