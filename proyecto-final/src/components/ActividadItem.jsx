import { useState } from "react";
import { motion } from "framer-motion";
import { elevar } from "./animaciones";

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
          <motion.span
            key={n}
            // las barras "crecen" de izquierda a derecha al aparecer
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 1.4 + n * 0.25 }}
            style={{
              flex: 1,
              height: "8px",
              borderRadius: "4px",
              transformOrigin: "left",
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

function ActividadItem({ nombre, descripcion, nivel = "basico", fase = "inicio", indice = 0 }) {
  const [completada, setCompletada] = useState(false);
  const f = FASES[fase];

  return (
    <motion.li
      className={`actividad ${completada ? "completada" : "pendiente"}`}
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, delay: 1.2 + indice * 0.5, ease: "easeOut" }}
      whileHover={elevar}
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
        Estado: {completada ? "Completada" : "Pendiente"}
      </p>

      <motion.button
        onClick={() => setCompletada(!completada)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 250 }}
      >
        {completada ? "Marcar como pendiente" : "Marcar como completada"}
      </motion.button>
    </motion.li>
  );
}

export default ActividadItem;
