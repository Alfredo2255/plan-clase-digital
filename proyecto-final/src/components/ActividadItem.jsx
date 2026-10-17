import { useState } from "react";

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
          ? "0 12px 28px rgba(30, 47, 107, 0.25)"
          : "0 1px 3px rgba(0, 0, 0, 0.08)",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
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
        Estado: {completada ? "Completada" : "Pendiente"}
      </p>

      <button onClick={() => setCompletada(!completada)}>
        {completada ? "Marcar como pendiente" : "Marcar como completada"}
      </button>
    </li>
  );
}

export default ActividadItem;