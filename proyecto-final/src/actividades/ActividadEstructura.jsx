import { useState } from "react";
import { Reorder, motion } from "framer-motion";
import { sacudir } from "../components/animaciones";

const CORRECTO = ["html", "head", "body", "/body", "/html"];
const PIEZAS = {
  html:    { texto: "<html>",              nota: "Abre la página" },
  head:    { texto: "<head> … </head>",    nota: "Información y título" },
  body:    { texto: "<body>",              nota: "Empieza lo que se ve" },
  "/body": { texto: "</body>",             nota: "Termina lo que se ve" },
  "/html": { texto: "</html>",             nota: "Cierra la página" },
};

function ActividadEstructura({ onPuntos, onAcierto }) {
  const [items, setItems] = useState(["/html", "body", "html", "/body", "head"]);
  const [revisado, setRevisado] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const comprobar = () => {
    const buenos = items.filter((id, i) => id === CORRECTO[i]).length;
    const pts = buenos === 5 ? 3 : Math.floor((buenos * 3) / 5);
    setRevisado(true);
    onPuntos("estructura", pts);
    if (buenos === 5) {
      setMensaje("🎉 ¡Perfecto! Armaste el esqueleto completo.");
      onAcierto();
    } else {
      setMensaje(`Vas bien: ${buenos} de 5 están en su lugar. ¡Arrastra y prueba otra vez!`);
    }
  };

  return (
    <div>
      <p className="instruccion">Arrastra las piezas hacia arriba o abajo para ordenar la página.</p>

      <Reorder.Group axis="y" values={items} onReorder={(n) => { setItems(n); setRevisado(false); }} className="piezas">
        {items.map((id, i) => {
          const bien = revisado && id === CORRECTO[i];
          const mal = revisado && id !== CORRECTO[i];
          return (
            <Reorder.Item
              key={id}
              value={id}
              className={`pieza ${bien ? "ok" : ""} ${mal ? "mal" : ""}`}
              whileDrag={{ scale: 1.06, boxShadow: "0 0 24px #22d3ee" }}
            >
              <span className="agarre">⠿</span>
              <code>{PIEZAS[id].texto}</code>
              <small>{PIEZAS[id].nota}</small>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>

      <motion.button type="button" className="btn-principal" onClick={comprobar}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.94 }}
        animate={revisado && mensaje.startsWith("Vas") ? sacudir : {}}>
        ✔ Comprobar orden
      </motion.button>
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
}

export default ActividadEstructura;
