"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { convertCurrency } from "../lib/convert";
import type { ConversionDirection } from "../lib/types";
import ConverterImages from "./ConverterImages";

export default function ConverterManual() {
  const [direction, setDirection] = useState<ConversionDirection>("USD_TO_IRR");
  const [amount, setAmount] = useState<string>("0");
  const [rate, setRate] = useState<string>("1,110,000");

  const formatNumberWithCommas = (value: string): string => {
    const numericValue = value.replace(/[^\d.]/g, '');
    
    const parts = numericValue.split('.');
    let integerPart = parts[0];
    const decimalPart = parts[1] ? `.${parts[1]}` : '';
    
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    return integerPart + decimalPart;
  };

  const parseFormattedNumber = (value: string): number => {
    const numericValue = value.replace(/,/g, '');
    return parseFloat(numericValue) || 0;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatNumberWithCommas(e.target.value);
    setAmount(formattedValue);
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatNumberWithCommas(e.target.value);
    setRate(formattedValue);
  };

  const formatDisplayNumber = (value: number): string => {
    if (value < 0 || isNaN(value)) return "Invalid";
    const parts = value.toString().split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1] ? `.${parts[1].slice(0, 2)}` : "";
    const formattedInt = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedInt + decimalPart;
  };

  const result = useMemo(() => {
    try {
      const amountNum = parseFormattedNumber(amount);
      const rateNum = parseFormattedNumber(rate);
      return convertCurrency(amountNum, rateNum, direction);
    } catch {
      return NaN;
    }
  }, [amount, rate, direction]);

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
   
        <ConverterImages  direction={direction}  />
      
      

      <motion.div
        key={direction}
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -30 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute z-10 mx-auto max-w-md rounded-xl bg-black/40 backdrop-blur-md border border-gray-600 text-white p-6 shadow-2xl w-[90%] sm:w-[70%] md:w-[50%]"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-white">
          مبدل دلار ↔ ریال
        </h2>

        <label className="mb-4 block">
          <span className="mb-2 block text-sm font-medium text-white/90">نوع تبدیل</span>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value as ConversionDirection)}
            className="w-full rounded-lg border border-gray-600 bg-gray-800/80 px-4 py-3 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
          >
            <option value="USD_TO_IRR">دلار به ریال</option>
            <option value="IRR_TO_USD">ریال به دلار</option>
          </select>
        </label>

        <label className="mb-4 block">
          <span className="mb-2 block text-sm font-medium text-white/90">
            مقدار ({direction === "USD_TO_IRR" ? "دلار" : "ریال"})
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={handleAmountChange}
            className="w-full rounded-lg border border-gray-600 bg-gray-800/80 px-4 py-3 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-left font-mono"
            placeholder="0"
            dir="ltr"
          />
        </label>

        <label className="mb-4 block">
          <span className="mb-2 block text-sm font-medium text-white/90">
            نرخ دلار (ریال برای هر دلار)
          </span>
          <input
            type="text"
            inputMode="decimal"
            value={rate}
            onChange={handleRateChange}
            className="w-full rounded-lg border border-gray-600 bg-gray-800/80 px-4 py-3 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-left font-mono"
            placeholder="1,110,000"
            dir="ltr"
          />
        </label>

        <motion.div
          key={result + direction}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6 rounded-xl bg-gradient-to-r from-black-600/20 to-gray-700/80 border border-blue-500/30 p-4 text-center backdrop-blur-sm"
        >
          <p className="text-sm text-blue-300 mb-2 font-medium">نتیجه تبدیل</p>
          {isNaN(result) ? (
            <p className="text-red-400 text-sm font-medium">ورودی نامعتبر</p>
          ) : (
            <p className="text-xl font-bold text-white font-mono break-all">
              {formatDisplayNumber(result)}{" "}
              <span className="text-blue-300">
                {direction === "USD_TO_IRR" ? "ریال" : "دلار"}
              </span>
            </p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}