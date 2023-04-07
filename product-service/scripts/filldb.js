const { Client } = require('pg')

console.log('Start')

const items = [
  {
    title: 'Sofa',
    description: 'A long upholstered seat with a back and arms, for two or more people',
    price: 300,
    count: 10,
  },
  {
    title: 'Chair',
    description: 'A separate seat for one person, typically with a back and four legs',
    price: 30,
    count: 30,
  },
  {
    title: 'Table',
    description: 'An item of furniture with a raised flat top and is supported most commonly by 1 or 4 legs (although some can have more)',
    price: 200,
    count: 15,
  },
  {
    title: 'Armchair',
    description: 'A comfortable, cushioned chair with a support on each side, where you can rest your arms while you sit',
    price: 100,
    count: 20,
  },
  {
    title: 'Bed',
    description: 'A large, rectangular piece of furniture, often with four legs, used for sleeping on',
    price: 400,
    count: 25,
  },
  {
    title: 'Cabinet',
    description: 'A case or cupboard with shelves and/or drawers for storing or displaying items',
    price: 100,
    count: 30,
  },
  {
    title: 'Cupboard ',
    description: 'A piece of furniture with a door and typically shelves, used for storage',
    price: 200,
    count: 20,
  }
]

const main = async () => {

  let queryProducts = 'INSERT INTO products (title, description, price) VALUES '

  items.forEach((item, id) => {
    queryProducts += `('${item.title}', '${item.description}', ${item.price} )`
    if(id < items.length-1){
      queryProducts += ', '
    }
  })

  queryProducts += ' RETURNING id'

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

  console.log(queryProducts)

  const { rows }  = await client.query(queryProducts)

  console.log(rows);

  let queryStocks = 'INSERT INTO stocks (product_id, count) VALUES ';

  rows.forEach((row, id) => {
    queryStocks += `('${row.id}', ${items[id].count} )`
    if(id < rows.length-1){
      queryStocks += ', '
    }
  })

  console.log(queryStocks)

  await client.query(queryStocks)

  client.end();

}

main();


