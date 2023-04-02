import type { NextApiRequest, NextApiResponse } from "next";
import { ReactionCounts } from "@/domain/message-data/data.types";
import { getReactionsByUser } from "@/domain/message-data/message-data";
import { daysAgo } from "@/time-helpers";
import { HttpCodes } from "@/http-codes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReactionCounts[]>
) {
  const reacts = await getReactionsByUser(daysAgo(30));

  if (reacts === null) {
    res.status(HttpCodes.internal_server_error);
    return;
  }

  res.status(HttpCodes.ok).json(reacts);
}
