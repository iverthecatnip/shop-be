export const generateResponse = ({data, error, statusCode}, multiple = true) => {
  const response = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    },
    statusCode,
  };
  let body;

  if (error) {
    body = {error: error};
  }else{
    if(!multiple && data instanceof Array){
      body = data[0];
    }else{
      body = data;
    }
  }

  return {
    ...response,
    body: JSON.stringify(
        body,
        null,
        2
    )
  }
}


export const generateEmail = (data) => {
  let message = 'Products:\n\n';
  let price = 'low'

  data.forEach((item, id) => {
    const {title, description, price: productPrice, count} = item.product;
    if(productPrice > 499) {
      price = 'high';
    }
    message += `${id+1}:\nTitle: ${title}\nDescription: ${description}\nPrice: ${productPrice}\nCount: ${count}\n\n`
  })

  return {message, price}

}
