"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  direction: "USD_TO_IRR" | "IRR_TO_USD";
};

export default function ConverterImages({ direction }: Props) {
  const isUsdToIrr = direction === "USD_TO_IRR";

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col justify-baseline mt-18 ">
      <AnimatePresence mode="wait">
        {/* بخش بالایی */}
        <motion.div
          key={isUsdToIrr ? "dollar-top" : "rial-top"}
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 200, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex-1 relative"
        >
          <Image
            src={isUsdToIrr ? "/h-d.png" : "/h-r.png"}
            alt="currency"
            fill
            priority
            className=" object-fill !w-35 !h-35 mt-40 rounded-full"
          />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {/* بخش پایینی */}
        <motion.div
          key={isUsdToIrr ? "rial-bottom" : "dollar-bottom"}
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -200, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex-1 relative"
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
