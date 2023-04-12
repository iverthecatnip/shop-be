import AWS  from 'aws-sdk';
export const importProductsFile  = async (event) => {
  const { queryStringParameters: { name } } = event
  let statusCode = 200;
  let body;

  const s3 = new AWS.S3({region: 'eu-west-1'})
  console.log(s3)
  const params = {
    Bucket: 'bucket-for-import-files',
    Key: `uploaded/${name}`,
    Expires: 60,
    ContentType: 'text/csv'
  }

  try{
    const s3Response = s3.getSignedUrl('putObject', params);
    body = {url: s3Response};
  }catch (e){
    statusCode = 500;
    body = {error: e};
    console.log('error')
    console.log(e)
  }

  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    statusCode,
    body: JSON.stringify(
      body,
      null,
      2
    )
  };

};
