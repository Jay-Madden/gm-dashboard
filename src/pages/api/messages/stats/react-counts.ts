import type { NextApiRequest, NextApiResponse } from "next";
import { ReactionCounts } from "@/domain/message-data/data.types";
import { getReactionsByUser } from "@/domain/message-data/message-data";
import { daysAgo } from "@/time-helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReactionCounts[]>
) {
  const reacts = await getReactionsByUser(daysAgo(30));

  if (reacts === null) {
    res.status(500);
    return;
  }

  res.status(200).json(reacts);
}
