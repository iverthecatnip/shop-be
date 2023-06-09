import {getProductById} from "../handlers/getProductById";
import {mockProducts} from "./mock";
jest.mock('../services/database', () => ({
  getProductByIdFromDB: jest.fn(id => {
    const filtered = mockProducts.filter(item => item.id === id);
    return {
      data: filtered,
      statusCode: filtered.length > 0 ? 200 : 404,
      error: filtered.length > 0 ? null : 'Product not found'
    }
  })
}))
test('should return one product by id', async () => {
  const mockId = '1';
  const mockResult = mockProducts.filter(item => item.id === mockId)

  const result = await getProductById({pathParameters : {id : mockId}});

  expect(result.statusCode).toBe(200);
  expect(result.body).toEqual(JSON.stringify(mockResult[0],null, 2));
})

test('should return an error', async () => {
  const mockId = '8';

  const result = await getProductById({pathParameters : {id : mockId}});

  expect(result.statusCode).toBe(404);
  expect(result.body).toEqual(JSON.stringify({error: 'Product not found'},null, 2));
})
