import AWS from "aws-sdk";
import { putProductToDB } from "../services/database";
export const catalogBatchProcess = async (event) => {
  console.log('catalogBatchProcess')
  const products = event.Records.map(({body}) => JSON.parse(body));
  console.log('products')
  console.log(products)

  const resultArray = []
  for (const product of products){
    const result = await putProductToDB(product);
    resultArray.push({product, result})
  }

  console.log('result')
  console.log(resultArray)
  const sns = new AWS.SNS({region: 'eu-west-1'})
  sns.publish({
    Subject: 'Products were added',
    Message: JSON.stringify(resultArray),
    TopicArn: process.env.SNS_ARN
  }, (err, data) => {
      if (err){
        console.error('Error')
        console.error(err)
      }else{
        console.log('SUCCESS')
        console.log(data)
      }
  })

};
