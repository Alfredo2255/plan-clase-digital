import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sacudir } from "../components/animaciones";

const CASOS = [
  { titulo: "Caso 1 · HTML",
    lineas: ["<html>", "<body>", "<h1>Mi página<h1>", "<p>Hola mundo</p>", "</body>", "</html>"],
    error: 2, explicacion: "El título se cierra con </h1>. ¡Faltaba la barra /!" },
  { titulo: "Caso 2 · CSS",
    lineas: ["h1 {", "  color: blue;", "  background-color red;", "  font-size: 30px;", "}"],
    error: 2, explicacion: "En CSS cada propiedad lleva dos puntos: background-color: red;" },
  { titulo: "Caso 3 · Enlace",
    lineas: ["<p>Visita mi sitio:</p>", '<a href="inicio.html" Ir al inicio</a>', "<p>¡Gracias!</p>"],
    error: 1, explicacion: "La etiqueta de apertura <a …> necesita cerrar con el símbolo >" },
];

function ActividadErrores({ onPuntos, onAcierto }) {
  const [resueltos, setResueltos] = useState([]);
  const [fallo, setFallo] = useState(null);

  const tocar = (caso, linea) => {
    if (resueltos.includes(caso)) return;
    if (linea === CASOS[caso].error) {
      const nuevos = [...resueltos, caso];
      setResueltos(nuevos);
      setFallo(null);
      onPuntos("errores", nuevos.length);
      onAcierto();
    } else {
      setFallo(`${caso}-${linea}`);
    }
  };

  return (
    <div>
      <p className="instruccion">🐞 Hay un error escondido en cada código. ¡Toca la línea con el bug!</p>
      {CASOS.map((c, ci) => (
        <div key={ci} className="caso">
          <h4>{c.titulo} {resueltos.includes(ci) && "✅"}</h4>
          <div className="codigo-lineas">
            {c.lineas.map((l, li) => {
              const bug = resueltos.includes(ci) && li === c.error;
              const mal = fallo === `${ci}-${li}`;
              return (
                <motion.button
                  type="button"
                  key={li}
                  className={`linea ${bug ? "bug" : ""} ${mal ? "mal" : ""}`}
                  onClick={() => tocar(ci, li)}
                  animate={mal ? sacudir : { x: 0 }}
                  whileHover={{ backgroundColor: "rgba(34,211,238,0.18)" }}
                >
                  <span className="num">{li + 1}</span>
                  <code>{l}</code>
                </motion.button>
              );
            })}
          </div>
          <AnimatePresence>
            {resueltos.includes(ci) && (
              <motion.p className="mensaje" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
                🎯 {c.explicacion}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      ))}
      {fallo && <p className="mensaje-error">Esa línea está bien. ¡Sigue buscando!</p>}
    </div>
  );
}

export default ActividadErrores;
