/**
 * @swagger
 * /api/currencies:
 *   get:
 *     summary: Get all currencies (paginated)
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
 *         description: A list of currencies
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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const take = parseInt(searchParams.get("take") || "12");
  const skip = parseInt(searchParams.get("skip") || "0");
  const baseRateId = parseInt(searchParams.get("baseRateId") || "1");
  const currencies = await prisma.currencies.findMany({
    include: {
      targetRates: {
        where: {
          baseCurrencyId: baseRateId,
        },
        orderBy: {
          effectiveDate: "desc",
        },
      },
    },
    skip,
    take,
    orderBy: { id: "asc" },
  });
  const total = await prisma.currencies.count();
  return NextResponse.json({ currencies, total });
}

export async function POST(req: Request) {
  const body = await req.json();
  const currency = await prisma.currencies.create({ data: body });
  return NextResponse.json(currency);
}
