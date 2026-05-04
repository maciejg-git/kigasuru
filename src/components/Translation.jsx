import { motion } from "motion/react";

export default function Translation({ translation }) {
  return (
    <motion.div
      className="flex justify-center rounded-xl bg-sky-600 p-10 text-4xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {translation}
    </motion.div>
  );
}
