import { motion } from "framer-motion";

const FLOTANTES = ["</>", "{ }", "🖥️", "🎨", "<h1>", "🚀", "#", "🌐"];

function HeaderClase({ tituloTema, grado, nombreDocente, duracion }) {
  return (
    <motion.header
      className="header-clase"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {FLOTANTES.map((f, i) => (
        <motion.span
          key={i}
          className="flotante"
          style={{ left: `${6 + i * 12}%`, top: `${(i % 3) * 28 + 8}%` }}
          animate={{ y: [0, -18, 0], rotate: [0, i % 2 ? 12 : -12, 0] }}
          transition={{ repeat: Infinity, duration: 3 + i * 0.35, ease: "easeInOut" }}
        >
          {f}
        </motion.span>
      ))}

      <motion.span
        className="header-etiqueta"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        🎮 Plan de Clase Digital · {grado}
      </motion.span>

      <motion.h1
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 10, delay: 0.5 }}
      >
        {tituloTema}
      </motion.h1>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        Tecnología · {duracion} · Docente: <strong>{nombreDocente}</strong>
      </motion.p>
    </motion.header>
  );
}

export default HeaderClase;
