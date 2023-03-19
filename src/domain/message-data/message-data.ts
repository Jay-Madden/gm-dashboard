import { Bucket, getDataFromBucket } from "@/domain/storage";
import {
  Reaction,
  Message,
  ReactionCounts,
} from "@/domain/message-data/data.types";
import { minutesAgo } from "@/time-helpers";

export async function getReactionsByUser(
  daysBack: number
): Promise<ReactionCounts[] | null> {
  const data = await getDataFromBucket<Reaction[]>(
    Bucket.reactions,
    minutesAgo(1)
  );

  if (data === null) {
    return null;
  }

  const reactCounts: ReactionCounts[] = [];

  for (const react of data) {
    if (react.date_given < daysBack) {
      continue;
    }

    let reaction = reactCounts.find((x) => x.author === react.author);
    if (reaction !== undefined) {
      reaction.count++;
    } else {
      reactCounts.push({ author: react.author, count: 1 });
    }
  }

  return reactCounts;
}

export async function getMessages(
  daysBack: number | null = null
): Promise<Map<string, Message> | null> {
  let messages = await getDataFromBucket<Message[]>(
    Bucket.messages,
    minutesAgo(1)
  );

  if (messages === null) {
    return null;
  }

  console.log(messages.length);

  if (daysBack !== null) {
    messages = messages.filter((x) => x.date > daysBack);
  }

  const messageMap = new Map<string, Message>();

  for (const message of messages) {
    messageMap.set(message.id, message);
  }
  console.log(messageMap.size);

  return messageMap;
}
