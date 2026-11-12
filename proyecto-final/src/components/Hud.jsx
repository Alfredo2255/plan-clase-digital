import { motion } from "framer-motion";

const NIVELES = [
  { min: 0,  nombre: "Aprendiz",    icono: "🐣" },
  { min: 5,  nombre: "Programador", icono: "💻" },
  { min: 10, nombre: "Experto web", icono: "🚀" },
  { min: 15, nombre: "Maestro web", icono: "👑" },
];

// Barra superior fija: nivel, barra de experiencia y medallas
function Hud({ total, totalMax, medallas }) {
  const nivel = [...NIVELES].reverse().find((n) => total >= n.min);
  return (
    <div className="hud">
      <motion.div
        key={nivel.nombre}
        className="hud-nivel"
        initial={{ scale: 0.4, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <span className="hud-icono">{nivel.icono}</span>
        <span>{nivel.nombre}</span>
      </motion.div>

      <div className="hud-barra" role="progressbar" aria-valuenow={total} aria-valuemax={totalMax}>
        <motion.div
          className="hud-relleno"
          animate={{ width: `${(total / totalMax) * 100}%` }}
          transition={{ type: "spring", stiffness: 90, damping: 14 }}
        />
        <span className="hud-texto">{total} / {totalMax} XP</span>
      </div>

      <div className="hud-medallas" title="Medallas por misión completada">
        {medallas.map((m) => (
          <motion.span
            key={m.id}
            className={m.lograda ? "medalla activa" : "medalla"}
            animate={m.lograda ? { scale: [1, 1.5, 1], rotate: [0, 20, 0] } : { scale: 1 }}
          >
            {m.icono}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export default Hud;
