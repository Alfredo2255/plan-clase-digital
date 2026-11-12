import { motion } from "framer-motion";

const EMOJIS = ["⭐", "✨", "🎉", "💥", "🌟"];
const PARTICULAS = Array.from({ length: 22 }, (_, i) => {
  const angulo = (i * 360) / 22 + (i % 3) * 9;
  const distancia = 110 + ((i * 37) % 120);
  const rad = (angulo * Math.PI) / 180;
  return {
    id: i,
    emoji: EMOJIS[i % EMOJIS.length],
    x: Math.cos(rad) * distancia,
    y: Math.sin(rad) * distancia,
    giro: (i % 2 ? 1 : -1) * (180 + i * 20),
  };
});

// Explosión de estrellas: cambia "disparo" para activarla de nuevo
function Confeti({ disparo }) {
  if (disparo === 0) return null;
  return (
    <div className="confeti" key={disparo} aria-hidden="true">
      {PARTICULAS.map((p) => (
        <motion.span
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.4, rotate: 0 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 1.3, rotate: p.giro }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  );
}

export default Confeti;
