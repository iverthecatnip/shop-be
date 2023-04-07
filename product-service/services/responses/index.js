export const generateResponse = ({data, error, statusCode}, multiple = true) => {
  const response = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
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
