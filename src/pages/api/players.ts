import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/server/db';

export default async function playersHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;

    if (id) {
      return getPlayerById(req, res);
    } else {
      return getAllPlayers(req, res);
    }
  } else if (req.method === 'POST') {
    return createPlayer(req, res);
  } else if (req.method === 'DELETE') {
    return deletePlayer(req, res);
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

async function getPlayerById(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const player = await prisma.player.findUnique({
      where: { id: Number(id) },
    });

    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    return res.status(200).json(player);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving player' });
  }
}

async function getAllPlayers(req: NextApiRequest, res: NextApiResponse) {
  try {
    const players = await prisma.player.findMany();
    return res.status(200).json(players);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving players' });
  }
}

async function createPlayer(req: NextApiRequest, res: NextApiResponse) {
  const { name, birthday } = req.body;

  try {
    const player = await prisma.player.create({
      data: {
        name,
        birthday,
      },
    });

    return res.status(201).json(player);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating player' });
  }
}

async function deletePlayer(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const deletedPlayer = await prisma.player.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json(deletedPlayer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting player' });
  }
}