import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'

export async function getDataFromBucket<T>(file: string): Promise<T | null> {

  let client: S3Client;
  if (process.env.PROD) {
    client = new S3Client({ region: 'us-east-1', credentials: {
        accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY || ''
      } })
  }
  else {
    client = new S3Client({ region: 'us-east-1'});
  }

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
