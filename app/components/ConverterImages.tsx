"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {ConversionDirection} from "../lib/types";
type Props = {
  direction: ConversionDirection; 
};

export default function ConverterImages({ direction }: Props) {
  const isUsdToIrr = direction === "USD_TO_IRR";

  return (
    <div className="relative w-full h-screen overflow-hidden hidden flex-col  justify-center mt-18 md:flex gap-[400px] mb-90 opacity-[95%]">
      <AnimatePresence mode="wait">
        <motion.div
          key={isUsdToIrr ? "dollar-top" : "rial-top"}
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 200, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className=" relative"
        >
          <Image
            src={isUsdToIrr ? "/h-d.png" : "/h-r.png"}
            alt="currency"
            fill
            priority
            className=" object-fill   !w-35 !h-35 mt-40 rounded-full  "
          />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={isUsdToIrr ? "rial-bottom" : "dollar-bottom"}
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -200, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative"
        >
          <Image
            src={isUsdToIrr ? "/h-r.png" : "/h-d.png"}
            alt="currency"
            fill
            priority
            className="object-fill ml-75 !w-35 !h-35  rounded-full"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
