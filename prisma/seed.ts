import { PrismaClient } from "../generated/prisma/client";
import { Decimal } from "decimal.js";

const prisma = new PrismaClient();

async function main() {
  await prisma.currencies.createMany({
    data: [
      { id: 1, code: "USD", name: "US Dollar" },
      { id: 2, code: "EUR", name: "Euro" },
      { id: 3, code: "GBP", name: "British Pound" },
      { id: 4, code: "JPY", name: "Japanese Yen" },
      { id: 5, code: "AUD", name: "Australian Dollar" },
    ],
    skipDuplicates: true,
  });

  const today = new Date();

  await prisma.rates.createMany({
    data: [
      { baseCurrencyId: 1, targetCurrencyId: 2, rate: new Decimal(0.85), effectiveDate: today },
      { baseCurrencyId: 1, targetCurrencyId: 3, rate: new Decimal(0.73), effectiveDate: today },
      { baseCurrencyId: 1, targetCurrencyId: 4, rate: new Decimal(110.25), effectiveDate: today },
      { baseCurrencyId: 1, targetCurrencyId: 5, rate: new Decimal(1.35), effectiveDate: today },
      { baseCurrencyId: 1, targetCurrencyId: 2, rate: new Decimal(0.81), effectiveDate: new Date("2023-07-01") },
      { baseCurrencyId: 1, targetCurrencyId: 3, rate: new Decimal(0.68), effectiveDate: new Date("2023-07-01") },
      { baseCurrencyId: 1, targetCurrencyId: 4, rate: new Decimal(109.31), effectiveDate: new Date("2023-07-01") },
      { baseCurrencyId: 1, targetCurrencyId: 5, rate: new Decimal(1.25), effectiveDate: new Date("2023-07-01") },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
