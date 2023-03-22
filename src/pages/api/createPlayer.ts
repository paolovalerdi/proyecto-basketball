// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

type Response = {
  status: string,
  data: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method == 'POST') {
    console.log("method", req.body);
    await prisma.player.create({ data: { name: req.body.name } })
    res.status(200).json({
      status: '200',
      data: 'User created'
    })
  } else {
    res.status(404).json({
      status: '404',
      data: 'Not supported operation',
    })
  }
}
