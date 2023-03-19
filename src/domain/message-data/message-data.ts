import { BucketFile, getDataFromBucket } from "@/domain/storage";
import {
  Reaction,
  Message,
  ReactionCounts,
} from "@/domain/message-data/data.types";
import { minutesAgo } from "@/time-helpers";
import {getUsers} from "@/domain/users/users-data";

export async function getReactionsByUser(
  daysBack: number
): Promise<ReactionCounts[] | null> {
  const data = await getDataFromBucket<Reaction[]>(
    BucketFile.reactions,
    minutesAgo(1)
  );

  if (data === null) {
    return null;
  }

  const users = await getUsers();

  const reactCounts: ReactionCounts[] = [];

  for (const react of data) {
    if (react.date_given < daysBack) {
      continue;
    }

    let reaction = reactCounts.find((x) => x.phoneNumber === react.author);
    if (reaction !== undefined) {
      reaction.count++;
    } else {
      let user = users?.find(x => x.phoneNumber === react.author) || null;
      reactCounts.push({author: user?.name || null, phoneNumber: react.author, count: 1 });
    }
  }

  return reactCounts;
}

export async function getMessages(
  daysBack: number | null = null
): Promise<Map<string, Message> | null> {
  let messages = await getDataFromBucket<Message[]>(
    BucketFile.messages,
    minutesAgo(1)
  );

  if (messages === null) {
    return null;
  }

  if (daysBack !== null) {
    messages = messages.filter((x) => x.date > daysBack);
  }

  const messageMap = new Map<string, Message>();

  for (const message of messages) {
    messageMap.set(message.id, message);
  }

  return messageMap;
}
