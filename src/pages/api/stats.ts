// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getDataFromBucket } from '@/domain/storage'

type ReactionCounts = { [key: string]: number }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReactionCounts>
) {
  let data = await getDataFromBucket<Reaction[]>('reactions.json')

  if (data === null) {
    res.status(500)
    return
  }

  let reactCounts: ReactionCounts = {}

  for (let react of data) {
    reactCounts[react.author] = (reactCounts[react.author] || 0) + 1
  }

  res.status(200).json(reactCounts)
}
