import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, CheckIn } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    CheckIn[] | CheckIn | { error: string } | { message: string }
  >
) {
  if (req.method === "GET") {
    try {
      const posts = await prisma.checkIn.findMany();
      res.status(200).json(posts);
    } catch {
      res.status(500).json({ error: "Failed to fetch check-ins" });
    }
  } else if (req.method === "POST") {
    try {
      const { name, mood } = req.body;

      if (!name || !mood) {
        return res.status(400).json({ error: "Name and mood is required" });
      }

      const post = await prisma.checkIn.create({
        data: { name, mood },
      });

      res.status(201).json(post);
    } catch {
      res.status(500).json({ error: "Failed to create check-in" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.body;

      if (!id) {
        await prisma.checkIn.deleteMany();
        res.status(200).json({ message: "All check-ins deleted" });
      }

      const checkIn = await prisma.checkIn.delete({
        where: { id },
      });

      res.status(200).json(checkIn);
    } catch {
      res.status(500).json({ error: "Failed to delete check-in" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
