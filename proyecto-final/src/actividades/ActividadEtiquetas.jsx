import { useState } from "react";
import { motion } from "framer-motion";
import { sacudir } from "../components/animaciones";

const PREGUNTAS = [
  { etiqueta: "<h1>", correcta: "Es el título principal",
    opciones: ["Es el título principal", "Pone una imagen", "Crea un enlace"] },
  { etiqueta: "<p>", correcta: "Escribe un párrafo",
    opciones: ["Cambia el fondo", "Escribe un párrafo", "Es el título principal"] },
  { etiqueta: "<img>", correcta: "Muestra una imagen",
    opciones: ["Muestra una imagen", "Escribe un párrafo", "Crea una lista"] },
  { etiqueta: "<a>", correcta: "Crea un enlace",
    opciones: ["Muestra una imagen", "Crea un enlace", "Es el título principal"] },
];

function ActividadEtiquetas({ onPuntos, onAcierto }) {
  const [aciertos, setAciertos] = useState({});
  const [fallo, setFallo] = useState(null);
  const [racha, setRacha] = useState(0);

  const responder = (p, op) => {
    if (aciertos[p.etiqueta]) return;
    if (op === p.correcta) {
      const nuevos = { ...aciertos, [p.etiqueta]: true };
      setAciertos(nuevos);
      setFallo(null);
      setRacha(racha + 1);
      onPuntos("etiquetas", Object.keys(nuevos).length);
      onAcierto();
    } else {
      setFallo(p.etiqueta + op);
      setRacha(0);
    }
  };

  return (
    <div>
      <p className="instruccion">Toca lo que hace cada etiqueta HTML.</p>
      {racha >= 2 && (
        <motion.p className="racha" initial={{ scale: 0 }} animate={{ scale: 1 }} key={racha}>
          🔥 ¡Racha de {racha}!
        </motion.p>
      )}
      {PREGUNTAS.map((p) => (
        <div key={p.etiqueta} className={`pregunta ${aciertos[p.etiqueta] ? "resuelta" : ""}`}>
          <code className="etiqueta-html">{p.etiqueta}</code>
          <div className="opciones">
            {p.opciones.map((op) => {
              const ok = aciertos[p.etiqueta] && op === p.correcta;
              const mal = fallo === p.etiqueta + op;
              return (
                <motion.button
                  key={op}
                  type="button"
                  className={`opcion ${ok ? "ok" : ""} ${mal ? "mal" : ""}`}
                  onClick={() => responder(p, op)}
                  animate={mal ? sacudir : { x: 0 }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.92 }}
                >
                  {ok ? "✅ " : mal ? "❌ " : ""}{op}
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ActividadEtiquetas;
