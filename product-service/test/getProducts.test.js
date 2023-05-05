import {mockProducts} from "./mock";
import {getProducts} from "../handlers/getProducts";
jest.mock('../services/database', () => ({
    getAllProductsFromDB: jest.fn().mockReturnValue({data: mockProducts, statusCode: 200})
}))

describe('getProducts test', () => {
    test('should return an array of objects', async () => {
        const result = await getProducts();

        expect(result.statusCode).toBe(200);
        expect(result.body).toEqual(JSON.stringify(mockProducts,null, 2));

    });
})


