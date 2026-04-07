import type { NextApiRequest, NextApiResponse } from "next";
import { logger } from "@/logging";
import { HttpCodes } from "@/http-codes";
import { validateAuthKey } from "@/domain/auth-keys/auth-keys";
import { uploadData } from "@/domain/message-data/message-data";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '200mb',
    },
  },

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!await authorizeRequestStatus(req)) {
      logger.info("Unauthorized request received")
      return res.status(HttpCodes.unauthorized).send(null);
    }

    logger.info("Received upload request");

    await uploadData(req.body.reactions, req.body.messages);

    res.status(201).send(null);
  } catch (e) {
    logger.error(e);
    res.status(500).send(null)
  }
}

export async function authorizeRequestStatus(request: NextApiRequest) : Promise<boolean> {
  logger.info(`Received auth request at endpoint ${request.url}`);

  const reqKey = request.headers.authorization;
  if (!reqKey) {
    return false;
  }

  return await validateAuthKey(reqKey);
}

