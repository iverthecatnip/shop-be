import { getAllProductsFromDB } from "../services/database";
import { generateResponse } from "../services/responses";


export const getProducts = async (event) => {
    console.log('GET /products : event')
    console.log(event)
    const res = await getAllProductsFromDB();
    return generateResponse(res);
};
