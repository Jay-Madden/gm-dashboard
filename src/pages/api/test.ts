import type { NextApiRequest, NextApiResponse } from "next";

let cache = 0;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>
) {
  cache = cache + 1;
  res.status(200).json(cache);
}
