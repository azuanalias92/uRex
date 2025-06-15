/**
 * @swagger
 * /api/rates/{id}:
 *   put:
 *     summary: Update an exchange rate
 *     description: Update the rate between two currencies by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the exchange rate to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currencyFromId:
 *                 type: integer
 *                 example: 1
 *               currencyToId:
 *                 type: integer
 *                 example: 2
 *               rate:
 *                 type: number
 *                 format: float
 *                 example: 4.25
 *     responses:
 *       200:
 *         description: Successfully updated exchange rate
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExchangeRate'
 *       404:
 *         description: Exchange rate not found
 */

/**
 * @swagger
 * /api/rates/{id}:
 *   delete:
 *     summary: Delete an exchange rate
 *     description: Delete a specific exchange rate by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the exchange rate to delete
 *     responses:
 *       204:
 *         description: Exchange rate deleted successfully (no content)
 *       404:
 *         description: Exchange rate not found
 */


import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../../generated/prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request, context: { params: { id: string } }) {
  const { params } = context;
  const body = await req.json();

  const updated = await prisma.rates.update({
    where: { id: Number(params.id) },
    data: body,
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.rates.delete({
      where: { id: Number(params.id) },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Rates not found" }, { status: 404 });
  }
}
