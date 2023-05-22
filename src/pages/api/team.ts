import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/server/db';

export default async function teamsHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;

    if (id) {
      return getTeamById(req, res);
    } else {
      return getAllTeams(req, res);
    }
  } else if (req.method === 'POST') {
    return createTeam(req, res);
  } else if (req.method === 'PUT') {
    const { id } = req.query;
    if (id) {
      return updateTeam(req, res);
    } else {
      return res.status(400).json({ message: 'Team ID is required' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    if (id) {
      return deleteTeam(req, res);
    } else {
      return res.status(400).json({ message: 'Team ID is required' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

async function getTeamById(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const team = await prisma.team.findUnique({
      where: { id: Number(id) },
      include: { players: true },
    });

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    return res.status(200).json(team);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving team' });
  }
}

async function getAllTeams(req: NextApiRequest, res: NextApiResponse) {
  try {
    const teams = await prisma.team.findMany({ include: { players: true } });
    return res.status(200).json(teams);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving teams' });
  }
}

async function createTeam(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.body;

  try {
    const team = await prisma.team.create({
      data: {
        name,
      },
    });

    return res.status(201).json(team);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating team' });
  }
}

async function updateTeam(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { name, playerIds } = req.body;

  try {
    const updatedTeam = await prisma.team.update({
      where: { id: Number(id) },
      data: {
        name,
        players: {
          connect: playerIds.map((playerId: number) => ({ id: playerId })),
        },
      },
      include: { players: true },
    });

    return res.status(200).json(updatedTeam);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating team' });
  }
}

async function deleteTeam(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const deletedTeam = await prisma.team.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json(deletedTeam);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting team' });
  }
}