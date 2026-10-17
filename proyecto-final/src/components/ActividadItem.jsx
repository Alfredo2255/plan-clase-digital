import { useState } from "react";

// Paleta: usa tu azul y tu verde lima como base
const NIVELES = {
  basico:     { etiqueta: "Básico",     barras: 1, color: "#2e9e6b" },
  intermedio: { etiqueta: "Intermedio", barras: 2, color: "#f0a020" },
  avanzado:   { etiqueta: "Avanzado",   barras: 3, color: "#d64545" },
};

const FASES = {
  inicio:     { etiqueta: "Inicio",     fondo: "#e0f2fe", texto: "#0b5b8a" },
  desarrollo: { etiqueta: "Desarrollo", fondo: "#ede9fe", texto: "#4c3aa8" },
  cierre:     { etiqueta: "Cierre",     fondo: "#ecfccb", texto: "#3f6212" },
};

function IndicadorDificultad({ nivel }) {
  const { etiqueta, barras, color } = NIVELES[nivel];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px", margin: "6px 0" }}>
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          style={{
            width: "28px",
            height: "8px",
            borderRadius: "4px",
            backgroundColor: n <= barras ? color : "#d9dce6",
          }}
        />
      ))}
      <small style={{ color, fontWeight: "bold" }}>{etiqueta}</small>
    </div>
  );
}

function ActividadItem({ nombre, descripcion, nivel = "basico", fase = "inicio" }) {
  const [completada, setCompletada] = useState(false);
  const [hover, setHover] = useState(false);
  const f = FASES[fase];

  return (
    <li
      className={`actividad ${completada ? "completada" : "pendiente"}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        boxShadow: hover
          ? "0 10px 24px rgba(31, 47, 122, 0.30)"
          : "0 2px 4px rgba(0, 0, 0, 0.10)",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <span
        style={{
          display: "inline-block",
          backgroundColor: f.fondo,
          color: f.texto,
          padding: "2px 10px",
          borderRadius: "12px",
          fontSize: "0.75rem",
          fontWeight: "bold",
        }}
      >
        {f.etiqueta}
      </span>

      <strong className="actividad-nombre" style={{ display: "block", marginTop: "6px" }}>
        {nombre}
      </strong>
      <p>{descripcion}</p>

      <IndicadorDificultad nivel={nivel} />

      <p>Estado: {completada ? "✅ Completada" : "⏳ Pendiente"}</p>

      <button onClick={() => setCompletada(!completada)}>
        {completada ? "Marcar como pendiente" : "Marcar como completada"}
      </button>
    </li>
  );
}

export default ActividadItem;