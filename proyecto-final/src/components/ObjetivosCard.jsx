import { motion } from "framer-motion";
import { tarjeta, elevar, presionar } from "./animaciones";

function ObjetivosCard({ competencia, indicadorLogro, indice = 0 }) {
  return (
    <motion.section
      className="tarjeta-modulo"
      variants={tarjeta}
      custom={indice}
      initial="oculta"
      animate="visible"
      whileHover={elevar}
      whileTap={presionar}
      style={{ cursor: "pointer" }}
    >
      <h2>Competencia</h2>
      <p>{competencia}</p>

      <h3>Indicador de logro</h3>
      <p>{indicadorLogro}</p>
    </motion.section>
  );
}

export default ObjetivosCard;
