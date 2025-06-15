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
