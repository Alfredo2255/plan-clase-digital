import { motion } from "framer-motion";

function HeaderClase({ tituloTema, nombreDocente, horario }) {
  return (
    <motion.header
      className="header-clase"
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.3, ease: "easeOut" }}
    >
      <span className="header-etiqueta">Plan de Clase Digital</span>
      <h1>{tituloTema}</h1>
      <p>Docente: <strong>{nombreDocente}</strong></p>
      <p>Horario: {horario}</p>
    </motion.header>
  );
}

export default HeaderClase;