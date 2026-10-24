import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NIVELES = {
  basico:     { etiqueta: "Dificultad básica",     barras: 1, color: "#2e9e6b" },
  intermedio: { etiqueta: "Dificultad intermedia", barras: 2, color: "#d98b0b" },
  avanzado:   { etiqueta: "Dificultad avanzada",   barras: 3, color: "#c53a3a" },
};

const FASES = {
  inicio:     { etiqueta: "Inicio",     fondo: "#e0f2fe", texto: "#075985" },
  desarrollo: { etiqueta: "Desarrollo", fondo: "#ede9fe", texto: "#4c3aa8" },
  cierre:     { etiqueta: "Cierre",     fondo: "#ecfccb", texto: "#3f6212" },
};

function IndicadorDificultad({ nivel }) {
  const { etiqueta, barras, color } = NIVELES[nivel];
  return (
    <div style={{ margin: "10px 0" }}>
      <div style={{ display: "flex", gap: "6px" }}>
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            style={{
              flex: 1,
              height: "8px",
              borderRadius: "4px",
              backgroundColor: n <= barras ? color : "#e2e6f0",
            }}
          />
        ))}
      </div>
      <small style={{ color, fontWeight: 600, display: "block", marginTop: "4px" }}>
        {etiqueta}
      </small>
    </div>
  );
}

function ActividadItem({ nombre, descripcion, nivel = "basico", fase = "inicio" }) {
  const [completada, setCompletada] = useState(false);
  const f = FASES[fase];

  return (
    <motion.li
      className={`actividad ${completada ? "completada" : "pendiente"}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        backgroundColor: completada ? "#f1faf5" : "#ffffff",
      }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -4,
        boxShadow: "0 12px 28px rgba(30, 47, 107, 0.25)",
      }}
    >
      <span
        style={{
          display: "inline-block",
          backgroundColor: f.fondo,
          color: f.texto,
          padding: "3px 12px",
          borderRadius: "999px",
          fontSize: "0.75rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        Fase: {f.etiqueta}
      </span>

      <strong className="actividad-nombre" style={{ display: "block", marginTop: "8px" }}>
        {nombre}
      </strong>
      <p style={{ margin: "4px 0" }}>{descripcion}</p>

      <IndicadorDificultad nivel={nivel} />

      <p style={{ fontSize: "0.9rem", fontWeight: 600 }}>
        Estado:{" "}
        <AnimatePresence mode="wait">
          <motion.span
            key={completada ? "completada" : "pendiente"}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.2 }}
            style={{ display: "inline-block" }}
          >
            {completada ? "Completada" : "Pendiente"}
          </motion.span>
        </AnimatePresence>
      </p>

      <motion.button
        onClick={() => setCompletada(!completada)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {completada ? "Marcar como pendiente" : "Marcar como completada"}
      </motion.button>
    </motion.li>
  );
}

export default ActividadItem;