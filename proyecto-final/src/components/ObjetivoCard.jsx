import { useState } from "react";
import { motion } from "framer-motion";

// Tarjeta que se voltea al tocarla: el frente muestra la competencia, el reverso el indicador
function ObjetivoCard({ competencia, indicadorLogro, indice = 0, icono = "🎯" }) {
  const [volteada, setVolteada] = useState(false);
  const alternar = () => setVolteada((v) => !v);

  return (
    <motion.div
      className="objetivo"
      role="button"
      tabIndex={0}
      onClick={alternar}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && alternar()}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: indice * 0.15 }}
      whileHover={{ scale: 1.04, rotate: indice % 2 ? 1 : -1 }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.div
        className="objetivo-interior"
        animate={{ rotateY: volteada ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 14 }}
      >
        <div className="cara frente">
          <span className="objetivo-icono">{icono}</span>
          <h3>Competencia</h3>
          <p>{competencia}</p>
          <small>👆 Toca para ver el indicador</small>
        </div>
        <div className="cara reverso">
          <span className="objetivo-icono">✅</span>
          <h3>Lo lograrás cuando…</h3>
          <p>{indicadorLogro}</p>
          <small>👆 Toca para volver</small>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ObjetivoCard;
