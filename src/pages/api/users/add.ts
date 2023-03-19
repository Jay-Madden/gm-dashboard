import type { NextApiRequest, NextApiResponse } from "next";
import { Methods } from "@/api-methods";
import { HttpCodes } from "@/http-codes";
import { addUser } from "@/domain/users/users-data";
import { User } from "@/domain/users/users.types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const { method, body } = req;

  if (method !== Methods.post) {
    res.status(HttpCodes.method_not_allowed);
    return;
  }

  await addUser(body.name, body.phoneNumber);
  res
    .status(HttpCodes.ok)
    .json({ name: body.name, phoneNumber: body.phoneNumber });
}
