import { motion } from "motion/react";

export default function Translation({ translation }) {
  return (
    <motion.div
      className="flex justify-center rounded-xl p-10 text-4xl border border-gray-200 shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {translation}
    </motion.div>
  );
}
