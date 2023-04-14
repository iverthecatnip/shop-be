import AWS from "aws-sdk";

const BUCKET = process.env.BUCKET;

export const replaceFile = async (key) => {
  const s3 = new AWS.S3({region: 'eu-west-1'})

  try {
    console.log('Try to copy')
    console.log(BUCKET + '/' + key)
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
    console.log('Try to delete')
    console.log(key)
    await s3.deleteObject({
      Bucket: BUCKET,
      Key: key
    }).promise()
  }catch (e) {
    console.error('Delete Error')
    console.error(e)
  }
}
