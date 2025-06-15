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
      { code: "CAD", name: "Canadian Dollar" },
      { code: "CHF", name: "Swiss Franc" },
      { code: "CNY", name: "Chinese Yuan" },
      { code: "SEK", name: "Swedish Krona" },
      { code: "NZD", name: "New Zealand Dollar" },
      { code: "SGD", name: "Singapore Dollar" },
      { code: "HKD", name: "Hong Kong Dollar" },
      { code: "NOK", name: "Norwegian Krone" },
      { code: "KRW", name: "South Korean Won" },
      { code: "INR", name: "Indian Rupee" },
      { code: "MXN", name: "Mexican Peso" },
      { code: "BRL", name: "Brazilian Real" },
      { code: "ZAR", name: "South African Rand" },
      { code: "RUB", name: "Russian Ruble" },
      { code: "TRY", name: "Turkish Lira" },
      { code: "IDR", name: "Indonesian Rupiah" },
      { code: "MYR", name: "Malaysian Ringgit" },
      { code: "THB", name: "Thai Baht" },
      { code: "PHP", name: "Philippine Peso" },
    ],
    skipDuplicates: true,
  });

  const baseCurrencyId = 1;

  const currencyRates = [
    { id: 2, base: 0.85 },
    { id: 3, base: 0.73 },
    { id: 4, base: 110.25 },
    { id: 5, base: 1.35 },
    { id: 6, base: 1.25 },
    { id: 7, base: 0.92 },
    { id: 8, base: 6.45 },
    { id: 9, base: 8.72 },
    { id: 10, base: 1.4 },
    { id: 11, base: 20.2 },
    { id: 12, base: 1.36 },
    { id: 13, base: 7.78 },
    { id: 14, base: 9.02 },
    { id: 15, base: 1325.0 },
    { id: 16, base: 18.5 },
    { id: 17, base: 82.3 },
    { id: 18, base: 95.6 },
    { id: 19, base: 5.15 },
    { id: 20, base: 18.0 },
    { id: 21, base: 6.3 },
    { id: 22, base: 4.2 },
    { id: 23, base: 34.1 },
    { id: 24, base: 4.7 },
  ];

  const rates: {
    baseCurrencyId: number;
    targetCurrencyId: number;
    rate: Decimal;
    effectiveDate: Date;
  }[] = [];

  for (let i = 0; i < 10; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    for (const { id, base } of currencyRates) {
      const variation = 1 + (Math.random() * 0.02 - 0.01); // ±1%
      const rate = new Decimal((base * variation).toFixed(4));

      rates.push({
        baseCurrencyId,
        targetCurrencyId: id,
        rate,
        effectiveDate: new Date(date),
      });
    }
  }

  await prisma.rates.createMany({
    data: rates,
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
