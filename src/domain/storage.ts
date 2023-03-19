import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { logger } from "@/logging";
import { parse } from "csv-parse/sync";

const cacheMap = new Map<string, { data: any; time: number }>();

const bucket = "gm-dashboard-bucket";

export enum BucketFile {
  reactions = "reactions.csv",
  messages = "messages.csv",
  users = "users.json",
}

export async function setDataInBucket(
  file: BucketFile,
  data: string
): Promise<boolean> {
  if (checkCacheStatus(file)) {
    logger.info(`Invalidating ${file} cache`);
    // Clear the cache if we put in new data
    cacheMap.delete(file);
  }

  const client = getAwsClient();

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: file,
    Body: data,
  });

  logger.info(`Setting data in file: ${file}}`);

  try {
    await client.send(command);
  } catch (err) {
    logger.error(`Failed to send data to bucket: ${file}`);
    return false;
  }
  return true;
}

export async function getDataFromBucket<T>(
  file: BucketFile,
  cacheCheckTime: number
): Promise<T | null> {
  let client = getAwsClient();

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
    Bucket: bucket,
    Key: file,
  });

  logger.info(`Sending GetObject command to bucket: ${bucket} for file: ${file}`)

  const response = await client.send(command);
  const str = await response.Body?.transformToString();

  if (str === undefined) {
    return null;
  }

  let parsedData: T;

  if (file.split(".").at(-1) === "csv") {
    parsedData = parse(str, {
      columns: true,
      skip_empty_lines: true,
    });
  } else {
    parsedData = JSON.parse(str) as T;
  }

  setCacheValue(file, parsedData);

  return parsedData;
}

function setCacheValue(key: string, data: any) {
  cacheMap.set(key, { data: data, time: Date.now() });
}

function checkCacheStatus(
  file: string,
  invalidTime: number | null = null
): boolean {
  const cache = cacheMap.get(file);

  if (invalidTime === null) {
    invalidTime = Date.now();
  }

  return !(cache === undefined || cache.time < invalidTime);
}

function getAwsClient(): S3Client {
  if (process.env.PROD === "true") {
    return new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY || "",
      },
    });
  }
  return new S3Client({ region: "us-east-1" });
}
