import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import winston from "winston";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
  ],
});

const cacheMap = new Map<string, { data: any; time: number }>();

export async function getDataFromBucket<T>(
  file: string,
  cacheCheckTime: number
): Promise<T | null> {
  let client: S3Client;
  if (process.env.PROD === "true") {
    client = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY || "",
      },
    });
  } else {
    client = new S3Client({ region: "us-east-1" });
  }

  if (checkCacheStatus(file, cacheCheckTime)) {
    const cacheEntry = cacheMap.get(file)!;
    logger.info(
      `Found cache entry for file ${file} expiring in ${
        cacheEntry.time - cacheCheckTime
      }`
    );
    return cacheEntry.data;
  }

  const command = new GetObjectCommand({
    Bucket: "gm-dashboard-bucket",
    Key: file,
  });

  const response = await client.send(command);
  const str = await response.Body?.transformToString();

  if (str === undefined) {
    return null;
  }

  const parsedData = JSON.parse(str);
  setCacheValue(file, parsedData);

  return parsedData;
}

function setCacheValue(key: string, data: any) {
  cacheMap.set(key, { data: data, time: Date.now() });
}

function checkCacheStatus(file: string, invalidTime: number): boolean {
  const cache = cacheMap.get(file);
  return !(cache === undefined || cache.time < invalidTime);
}
