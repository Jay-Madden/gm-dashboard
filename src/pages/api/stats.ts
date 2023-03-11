// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'

type Data = {
  name: any
}

interface Reaction {
  message_id: string
  author: number
  reaction_type: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let s3data = await GetDataFromBucket<Reaction[]>('reactions.json')

  if (s3data === null) {
    res.status(500)
    return
  }

  let reactCounts: { [key: string]: number } = {}

  for (let react of s3data) {
    reactCounts[react.author] = (reactCounts[react.author] || 0) + 1
  }

  res.status(200).json({ name: reactCounts })
}

async function GetDataFromBucket<T>(file: string): Promise<T | null> {
  const client = new S3Client({ region: 'us-east-1' })

  const command = new GetObjectCommand({
    Bucket: 'gm-dashboard-bucket',
    Key: file,
  })

  const response = await client.send(command)
  const str = await response.Body?.transformToString()

  if (str === undefined) {
    return null
  }

  return JSON.parse(str)
}
