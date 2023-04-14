import { parseRecords } from "../services/s3/parseRecords";
import { replaceFile } from "../services/s3/replaceFile";

export const importFileParser  = async (event) => {
  for (const record of event.Records){
    await parseRecords(record.s3.object.key);
    await replaceFile(record.s3.object.key);
  }
};
