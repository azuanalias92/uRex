import { PrismaClient } from "../generated/prisma/client";
import { Decimal } from "decimal.js";

const prisma = new PrismaClient();

async function main() {
  await prisma.currencies.createMany({
    data: [
      { code: "USD", name: "US Dollar" },
      { code: "EUR", name: "Euro" },
      { code: "GBP", name: "British Pound" },
      { code: "JPY", name: "Japanese Yen" },
      { code: "AUD", name: "Australian Dollar" },
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
