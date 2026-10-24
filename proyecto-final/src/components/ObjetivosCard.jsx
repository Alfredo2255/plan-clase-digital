import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ObjetivosCard({ competencia, indicadorLogro }) {
  const [mostrarIndicador, setMostrarIndicador] = useState(false);

  return (
    <motion.section
      className="tarjeta-modulo"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      whileHover={{ y: -6, boxShadow: "0 14px 30px rgba(30, 47, 107, 0.22)" }}
    >
      <h2>Competencia</h2>
      <p>{competencia}</p>

      <motion.button
        onClick={() => setMostrarIndicador(!mostrarIndicador)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          marginTop: "14px",
          padding: "9px 16px",
          border: "none",
          borderRadius: "8px",
          backgroundColor: "#1e2f6b",
          color: "#fff",
          fontFamily: "inherit",
          fontSize: "0.9rem",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        {mostrarIndicador ? "Ocultar indicador de logro" : "Ver indicador de logro"}
      </motion.button>

      <AnimatePresence>
        {mostrarIndicador && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            style={{ overflow: "hidden" }}
          >
            <h3>Indicador de logro</h3>
            <p>{indicadorLogro}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

export default ObjetivosCard;