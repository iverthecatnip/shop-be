import { getProductByIdFromDB } from "../services/database";
import { generateResponse } from "../services/responses";

export const getProductById = async (event) => {
  const { pathParameters: { id } } = event
  console.log(`GET /products/${id} : event`)
  console.log(event)
  const res = await getProductByIdFromDB(id);

  return generateResponse(res, false);
};
