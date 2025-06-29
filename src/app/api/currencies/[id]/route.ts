/**
 * @swagger
 * /api/currencies/{id}:
 *   put:
 *     summary: Update a currency
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the currency to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "EUR"
 *               name:
 *                 type: string
 *                 example: "Euro"
 *     responses:
 *       200:
 *         description: Updated currency
 *       404:
 *         description: Currency not found
 */

/**
 * @swagger
 * /api/currencies/{id}:
 *   delete:
 *     summary: Delete a currency
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the currency to delete
 *     responses:
 *       204:
 *         description: Deleted successfully
 *       404:
 *         description: Currency not found
 */

import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../../generated/prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request, context: { params: { id: string } }) {
  const { params } = context;
  const body = await req.json();


  const updated = await prisma.currencies.update({
    where: { id: Number(params.id) },
    data: body,
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.currencies.delete({
      where: { id: Number(params.id) },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Currency not found" }, { status: 404 });
  }
}
