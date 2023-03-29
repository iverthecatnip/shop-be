import {mockProducts} from "./mock";

export const getProductById = async (event) => {
  const { pathParameters: { id } } = event

  const filtered = mockProducts.filter(item => item.id === id);

  if (filtered.length > 0) {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(
          filtered[0],
          null,
          2
      ),
    };
  }else{
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(
          {error: 'Product not found'},
          null,
          2
      ),
    };
  }

};
