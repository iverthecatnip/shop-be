import { Client } from "pg";
const connect = async () => {
  const client = new Client({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  try {
    await client.connect()
  } catch (e) {
    console.log(e)
  }
  return client;
}
export const getDataFromDB = async (query, values = []) => {
  const client = await connect();
  let response;
  let error = false;

  try {
    const { rows }  = await client.query(query, values)
    response = rows;
  } catch (e) {
    console.log('')
    error = true;
  }
  client.end();

  if(error){
    return {data: [], error: 'Unexpected database error', statusCode: 500}
  }

  if(response.length){
    return {data: response, error: null, statusCode: 200};
  }else{
    return {data: [], error: 'Product not found', statusCode: 404};
  }
}

export const addProductToDB = async (data) => {
  const client = await connect();
  let error = false;
  let productId = null;

  const {title, description, price, count} = data;

  try {
    await client.query('BEGIN')
    const queryText = 'INSERT INTO products(title, description, price) VALUES($1, $2, $3) RETURNING id'
    const res = await client.query(queryText, [title, description, price || 0])
    productId = res.rows[0].id;
    const insertCount = 'INSERT INTO stocks(product_id, count) VALUES ($1, $2)'
    const insertCountValues = [productId, count || 0]
    await client.query(insertCount, insertCountValues)
    await client.query('COMMIT')
  } catch (e) {
    console.log('Transaction Error ' + e)
    await client.query('ROLLBACK')
    error = e.toString();
  }

  client.end()

  if(error){
    return {error, statusCode: 500}
  }

  return {data: { id : productId }, error: null, statusCode: 200};

}
