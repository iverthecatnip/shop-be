import {mockProducts} from "./mock";
import {getProducts} from "./getProducts";

test('should return an array of objects', async () => {

    const result = await getProducts();

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(JSON.stringify(mockProducts,null, 2));

});

