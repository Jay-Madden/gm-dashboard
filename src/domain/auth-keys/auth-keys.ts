import { BucketFile, getDataFromBucket } from "@/domain/storage";
import { minutesAgo } from "@/time-helpers";

export async function validateAuthKey(key: string): Promise<boolean> {
  let keys = await getDataFromBucket<string[]>(BucketFile.keys, minutesAgo(0));

  if (keys === null) {
    return false;
  }

  const validKey = keys.find((x) => x === key);
  return validKey !== undefined;
}
