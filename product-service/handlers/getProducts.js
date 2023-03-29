import {mockProducts} from "./mock";

export const getProducts = async () => {
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(
            mockProducts,
            null,
            2
        ),
    };
};
