/**
 * @swagger
 * /api/rates:
 *   get:
 *     summary: Get all rates (paginated)
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *         description: Skip number of items
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *         description: Number of items to fetch
 *     responses:
 *       200:
 *         description: A list of rates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   code:
 *                     type: string
 *                   name:
 *                     type: string
 *   post:
 *     summary: Create a new currency
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - name
 *             properties:
 *               code:
 *                 type: string
 *                 description: Currency code (e.g., USD)
 *               name:
 *                 type: string
 *                 description: Full currency name (e.g., US Dollar)
 *     responses:
 *       201:
 *         description: The created currency
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 code:
 *                   type: string
 *                 name:
 *                   type: string
 *       400:
 *         description: Invalid input
 */

import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const rates = await prisma.rates.findMany({});
  return NextResponse.json(rates);
}

export async function POST(req: Request) {
  const body = await req.json();
  const rates = await prisma.rates.create({ data: body });
  return NextResponse.json(rates);
}
