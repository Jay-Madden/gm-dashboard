import type { NextApiRequest, NextApiResponse } from "next";
import { getDataFromBucket } from "@/domain/storage";
import { Reaction } from "@/domain/data.types";

type ReactionCounts = { [key: string]: number };

let cachedReactions: Reaction[] | null = null;

let cacheTime = Date.now();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReactionCounts>
) {
  const invalidateTime = Date.now() - 1000 * 60;
  if (cachedReactions === null || cacheTime < invalidateTime) {
    console.log("Invalidating cache and requesting data");
    cachedReactions = await getDataFromBucket<Reaction[]>("reactions.json");
    cacheTime = Date.now();
  }

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
