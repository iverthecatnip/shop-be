import { generateResponse } from "../services/responses";
import { putProductToDB } from "../services/database";

export const createProduct = async (event) => {
  console.log('POST /products : event')
  console.log(event)
  const { body } = event
  const res = await putProductToDB(JSON.parse(body));
  return generateResponse(res);
};
