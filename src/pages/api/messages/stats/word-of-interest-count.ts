import { NextApiRequest, NextApiResponse } from "next";
import { getWordsOfInterestCount } from "@/domain/message-data/message-data";
import { daysAgo } from "@/time-helpers";
import { HttpCodes } from "@/http-codes";
import { WordOfInterestCount } from "@/domain/message-data/data.types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WordOfInterestCount>
) {
  const counts = await getWordsOfInterestCount(daysAgo(30));

  if (counts === null) {
    res.status(HttpCodes.internal_server_error);
    return;
  }

  res.status(HttpCodes.ok).json(counts);
}
