import {
  BucketFile,
  getDataFromBucket,
  setDataInBucket,
} from "@/domain/storage";
import { minutesAgo } from "@/time-helpers";
import { User } from "@/domain/users/users.types";
import { logger } from "@/logging";

export async function addUser(name: string, phone: number): Promise<boolean> {
  const users = await getUsers();

  if (users === null) {
    return false;
  }

  logger.info(
    `Adding user to user.json with name ${name} and phone number: ${phone}`
  );

  users.push({ name, phoneNumber: phone });

  await setDataInBucket(BucketFile.users, JSON.stringify(users, null, 2));

  return true;
}

export async function getUsers(): Promise<User[] | null> {
  const users = await getDataFromBucket<User[]>(
    BucketFile.users,
    minutesAgo(1)
  );

  if (users === null) {
    return null;
  }

  return users;
}
