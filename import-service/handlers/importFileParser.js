import AWS  from 'aws-sdk';
import csv from 'csv-parser';
const BUCKET = 'bucket-for-import-files';

const parseRecord = async (s3, key) => {
  console.log('parseRecord')
  console.log('key')
  console.log(key)
  const fileParams= {
    Bucket: BUCKET,
    Key: key
  }
  console.log('fileParams')
  console.log(fileParams)
  // const s3Stream = s3.getObject(fileParams);
  // console.log('s3 Object')
  // console.log(s3Stream)
  // console.log('START STREAM');
  // s3Stream
  //   .createReadStream()
  //   .pipe(csv())
  //   .on('data', (data) => {
  //     console.log('data')
  //     console.log(data)
  //   })
  //   .on('error', (error) => { console.error(error)})
  //   .on('end', async () => {
  //
  //     console.log('STREAM FINISHED')

      try {
        console.log('try to copy')
        console.log(BUCKET + '/' + key)
        console.log(key.replace('uploaded', 'parsed'))
        await s3.copyObject({
          Bucket: BUCKET,
          CopySource: BUCKET + '/' + key,
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
          Bucket: BUCKET,
          Key: key
        }).promise()
      }catch (e) {
        console.error('Delete Error')
        console.error(e)
      }

    // })
}

export const importFileParser  = async (event) => {
  const s3 = new AWS.S3({region: 'eu-west-1'})

  // let files;
  // const params = {
  //   Bucket: 'bucket-for-import-files',
  //   Prefix: 'uploaded/'
  // }
  //
  // try{
  //   const s3Response = await s3.listObjectsV2(params).promise();
  //   console.log('s3Response')
  //   console.log(s3Response)
  //   files = s3Response.Contents.filter(item => item.Size).map(item => item.Key);
  // }catch (e){
  //   console.log('error')
  //   console.log(e)
  // }
  //
  // console.log('files')
  // console.log(files)
  //
  // const fileParams= {
  //   Bucket: 'bucket-for-import-files',
  //   Key: files[0]
  // }
  //
  // files.forEach(file => {
  //   parseRecord(s3, file)
  // })

  event.Records.forEach(record => {
    parseRecord(s3, record.s3.object.key);
  })

};
