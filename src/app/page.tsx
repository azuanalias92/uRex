"use client";

import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type currency = {
  id: number;
  code: string;
  name: string;
  targetRates: [
    {
      baseCurrencyId: number;
      targetCurrencyId: number;
      rate: number;
      effectiveDate: string;
    }
  ];
  rate: number | null;
};

export default function HomePage() {
  const loaderRef = useRef(null);
  const take = 12;
  const [hasMore, setHasMore] = useState(true);
  const [currencies, setCurrencies] = useState<currency[]>([]);
  const [baseRateId] = useState<number>(1);
  const [skip, setSkip] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);

  const setRates = (newCurrencies: currency[]) => {
    for (let i = 0; i < newCurrencies.length; i++) {
      newCurrencies[i].rate = null;
      if (newCurrencies[i].id == 1) {
        newCurrencies[i].rate = 1;
      } else {
        for (let j = 0; j < newCurrencies[i].targetRates.length; j++) {
          const rateDate = new Date(newCurrencies[i].targetRates[j].effectiveDate).toISOString().split("T")[0];
          if (rateDate == date) {
            newCurrencies[i].rate = parseFloat(String(newCurrencies[i].targetRates[j].rate));
          }
        }
      }
    }
    return newCurrencies;
  };

  const fetchCurrencies = async () => {
    if (loading) return;
    setLoading(true);

    const res = await fetch(`/api/currencies?skip=${skip}&take=${take}&baseRateId=${baseRateId}`);
    const data = await res.json();
    const ratecurrencies = setRates(data.currencies);

    setCurrencies((prev) => {
      const updated = [...prev, ...ratecurrencies];
      if (updated.length >= data.total) {
        setHasMore(false);
      }
      return updated;
    });

    setSkip((prev) => prev + take);
    setLoading(false);
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0 && hasMore && !loading) {
        fetchCurrencies();
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [hasMore, loading]);

  useEffect(() => {
    if (date) {
      const tempCurrencies = [...currencies];
      setCurrencies(setRates(tempCurrencies));
    }
  }, [date]);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">uRex</h1>

      {/* Date Picker */}
      <div className="flex flex-row justify-between items-center mb-6">
        {/* Left: Display current date */}
        <div>
          <label className="block font-medium">Rates as {date}</label>
        </div>

        {/* Right: Date Picker */}
        <div className="flex items-center gap-2">
          <DatePicker
            selected={date ? new Date(date) : null}
            onChange={(date: Date | null) => setDate(date?.toISOString().split("T")[0] ?? "")}
            dateFormat="yyyy-MM-dd"
            className="border px-3 py-2 rounded w-full max-w-xs"
            placeholderText="Select a date"
          />
        </div>
      </div>

      {/* Currency List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {currencies.map((cur, index) => (
          <div key={index} className="border p-6 rounded-lg bg-gray-50 shadow text-center">
            <div className="text-sm font-semibold text-gray-700">{cur.code + " - " + cur.name}</div>
            <div className="text-xl text-green-500">{cur.rate?.toFixed(4)}</div>
          </div>
        ))}
      </div>

      {/* Infinite Scroll Loader */}
      <div ref={loaderRef} className="mt-10 flex justify-center">
        {hasMore ? <span className="text-white">Loading more...</span> : <span className="text-white">--- End of list ---</span>}
      </div>
    </div>
  );
}
