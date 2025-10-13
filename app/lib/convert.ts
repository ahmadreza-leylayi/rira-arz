import { ConversionDirection } from "./types";

export function convertCurrency(
  amount: number,
  rate: number,
  direction: ConversionDirection
): number {
  if (!isFinite(rate) || rate <= 0) return NaN;
  if (!isFinite(amount) || amount < 0) return NaN;

  return direction === "USD_TO_IRR" ? amount * rate : amount / rate;
}
