-- CreateTable
CREATE TABLE "currencies" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(3) NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "currencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rates" (
    "id" SERIAL NOT NULL,
    "baseCurrencyId" INTEGER NOT NULL,
    "targetCurrencyId" INTEGER NOT NULL,
    "rate" DECIMAL(18,6) NOT NULL,
    "effective_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rates" ADD CONSTRAINT "rates_baseCurrencyId_fkey" FOREIGN KEY ("baseCurrencyId") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rates" ADD CONSTRAINT "rates_targetCurrencyId_fkey" FOREIGN KEY ("targetCurrencyId") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
