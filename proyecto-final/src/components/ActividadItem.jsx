import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FASES = { inicio: "Inicio", desarrollo: "Desarrollo", cierre: "Cierre" };

// Tarjeta de misión reutilizable: el contenido interactivo se pasa como "children"
function ActividadItem({ icono, nombre, descripcion, fase = "inicio", pista, puntos = 0, puntosMax = 0, children }) {
  const [verPista, setVerPista] = useState(false);
  const lograda = puntos >= puntosMax && puntosMax > 0;

  return (
    <article className={`mision ${lograda ? "lograda" : ""}`}>
      <header className="mision-cabecera">
        <span className="mision-icono">{icono}</span>
        <div>
          <span className="chip-fase">{FASES[fase]}</span>
          <h3>{nombre}</h3>
          <p>{descripcion}</p>
        </div>
        <motion.span
          key={puntos}
          className="mision-puntos"
          initial={{ scale: 1.6 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {lograda ? "🏅" : "⭐"} {puntos}/{puntosMax}
        </motion.span>
      </header>

      {pista && (
        <div>
          <button type="button" className="btn-pista" onClick={() => setVerPista(!verPista)}>
            💡 {verPista ? "Ocultar pista" : "Necesito una pista"}
          </button>
          <AnimatePresence>
            {verPista && (
              <motion.p
                className="pista"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {pista}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className="mision-cuerpo">{children}</div>
    </article>
  );
}

export default ActividadItem;
