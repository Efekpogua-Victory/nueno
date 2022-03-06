import { JobsListResponseParams as ResponseParams } from "@api-contracts/jobs/list";
import JobEntity from "@business-logic/Job";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return;

  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: "Not authenticated" });

  const entity = new JobEntity();

  try {
    const response: ResponseParams = await entity.list(session.user.id);
    return res.status(201).json(response);
  } catch (error) {
    const errorCode = entity.error?.code;
    const errorMessage = entity.error?.message;
    if (errorCode && errorMessage) return res.status(errorCode).json(errorMessage);

    throw error;
  }
}
