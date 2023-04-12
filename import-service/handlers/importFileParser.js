import AWS  from 'aws-sdk';
import csv from 'csv-parser';

const parseRecord = async (s3, key) => {
  console.log('parseRecord')
  console.log('key')
  console.log(key)

  const fileParams= {
    Bucket: process.env.BUCKET,
    Key: key
  }
  console.log('fileParams')
  console.log(fileParams)
  const s3Stream = await s3.getObject(fileParams).createReadStream();

  console.log('s3 Object')
  console.log(s3Stream)
  console.log('START STREAM');
  s3Stream
    .pipe(csv())
    .on('data', (data) => {
      console.log('data')
      console.log(data)
    })
    .on('error', (error) => {
      console.error('STREAM ERROR')
      console.error(error)
    })
    .on('end', async () => {

      console.log('STREAM FINISHED')

      try {
        console.log('try to copy')
        console.log(process.env.BUCKET + '/' + key)
        console.log(key.replace('uploaded', 'parsed'))
        await s3.copyObject({
          Bucket: process.env.BUCKET,
          CopySource: process.env.BUCKET + '/' + key,
          Key: key.replace('uploaded', 'parsed')
        }).promise()
      }catch (e) {
        console.error('Copy Error')
        console.error(e)
      }

      try {
        console.log('try to delete')
        console.log(key)
        await s3.deleteObject({
          Bucket: process.env.BUCKET,
          Key: key
        }).promise()
      }catch (e) {
        console.error('Delete Error')
        console.error(e)
      }
    })

  return true;
};

export const importFileParser  = async (event) => {
  const s3 = new AWS.S3({region: 'eu-west-1'})

  for (const record of event.Records){
    const response = await parseRecord(s3, record.s3.object.key);
    console.log('response')
    console.log(response)
  }

  return {
    statusCode: 202,
  };
};
