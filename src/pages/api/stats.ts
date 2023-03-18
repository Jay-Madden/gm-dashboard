import type { NextApiRequest, NextApiResponse } from "next";
import { getDataFromBucket } from "@/domain/storage";
import { Reaction } from "@/domain/data.types";
import { minutesAgo } from "@/time-helpers";

type ReactionCounts = { [key: string]: number };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReactionCounts>
) {
  let cachedReactions = await getDataFromBucket<Reaction[]>(
    "reactions.json",
    minutesAgo(1)
  );

  if (cachedReactions === null) {
    res.status(500);
    return;
  }

  const reactCounts: ReactionCounts = {};

  for (const react of cachedReactions) {
    reactCounts[react.author] = (reactCounts[react.author] || 0) + 1;
  }

  res.status(200).json(reactCounts);
}
