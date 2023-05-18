import csv from "csv-parser";
import AWS from "aws-sdk";
const BUCKET = process.env.BUCKET;

export const parseRecords = (key) => {
  const s3 = new AWS.S3({region: 'eu-west-1'})

  console.log(`Parse file: ${key}`);
  const fileParams= {
    Bucket: BUCKET,
    Key: key
  }
  const SQS = new AWS.SQS({region: 'eu-west-1'});

  return new Promise((resolve, reject) => {
    s3.getObject(fileParams)
      .createReadStream()
      .pipe(csv({
        mapHeaders: ({ header }) => header.trim()
      }))
      .on('data',  (data) => {
        SQS.sendMessage({
          QueueUrl: process.env.SQS_URL,
          MessageBody: JSON.stringify(
            data,
            null,
            2
          )
        }, (err) => {
          if(err){
            console.error('SQS ERROR');
            console.error(err);
          }
        })
      })
      .on('error',  (error) => {
        console.error('STREAM ERROR')
        console.error(error)
        reject(error)
      })
      .on('end',  () => {
        resolve()
        console.log('STREAM FINISHED')
      })
  })
};
