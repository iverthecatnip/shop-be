import AWS from "aws-sdk";
import { putProductToDB } from "../services/database";
import { generateEmail } from '../services/responses';
export const catalogBatchProcess = async (event) => {
  const products = event.Records.map(({body}) => JSON.parse(body));

  const resultArray = []
  for (const product of products){
    const result = await putProductToDB(product);
    resultArray.push({product, result})
  }

  const {message, price} = generateEmail(resultArray);

  const sns = new AWS.SNS({region: 'eu-west-1'})
  sns.publish({
    Subject: 'Products were added',
    Message: message,
    TopicArn: process.env.SNS_ARN,
    MessageAttributes: {
      price: {
        DataType: 'String',
        StringValue: price
      },
    }
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
