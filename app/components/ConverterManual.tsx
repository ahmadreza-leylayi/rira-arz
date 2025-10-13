"use client";

import { useState, useMemo } from "react";
import { convertCurrency } from "../lib/convert";
import type { ConversionDirection } from "../lib/types";

export default function ConverterManual() {
  const [direction, setDirection] = useState<ConversionDirection>("USD_TO_IRR");
  const [amount, setAmount] = useState<number>(0);
  const [rate, setRate] = useState<number>(1110000);

  const formatNumber = (value: number): string => {
    if (value < 0 || isNaN(value)) return "Invalid";

    const parts = value.toString().split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1] ? `.${parts[1].slice(0, 2)}` : "";

    const formattedInt = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return formattedInt + decimalPart;
  };

  const result = useMemo(() => {
    try {
      return convertCurrency(amount, rate, direction);
    } catch {
      return NaN;
    }
  }, [amount, rate, direction]);

  return (
    <div className="mx-auto max-w-md rounded-lg border bg-gray-700 p-6 shadow-sm h-[90%] w-[95%]">
      <h2 className="mb-4 text-center text-xl font-semibold text-white  flex-nowrap">
        مبدل دلار ↔ ریال
      </h2>

      <label className="mb-3 block ">
        <span className="mb-1 block text-sm text-white/80">نوع تبدیل</span>
        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value as ConversionDirection)}
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-100 bg-gray-800 text-white"
        >
          <option value="USD_TO_IRR" className="bg-gray-700">
            دلار به ریال
          </option>
          <option value="IRR_TO_USD" className="bg-gray-700">
            ریال به دلار
          </option>
        </select>
      </label>

      <label className="mb-3 block">
        <span className="mb-1 block text-sm text-white/70">
          مقدار ({direction === "USD_TO_IRR" ? "دلار" : "ریال"})
        </span>
        <input
          type="number"
          inputMode="decimal"
          className="w-full rounded-md border px-3 py-2 text-white bg-gray-800"
          value={amount || ""}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val >= 0) setAmount(val);
          }}
        />
      </label>

      <label className="mb-3 block">
        <span className="mb-1 block text-sm text-white/70">
          نرخ دلار (ریال برای هر دلار)
        </span>
        <input
          type="number"
          inputMode="decimal"
          className="w-full rounded-md border px-3 py-2 text-white bg-gray-800"
          value={rate || ""}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (val >= 0) setRate(val);
          }}
        />
      </label>

      <div className="mt-4 rounded-md bg-gray-100 p-3 text-center">
        <p className="text-sm text-gray-600 mb-1">نتیجه</p>
        {isNaN(result) ? (
          <p className="text-red-500 text-sm">ورودی نامعتبر</p>
        ) : (
          <p className="text-lg font-semibold text-blue-700">
            {formatNumber(result)}{" "}
            {direction === "USD_TO_IRR" ? "ریال" : "دلار"}
          </p>
        )}
      </div>
    </div>
  );
}
