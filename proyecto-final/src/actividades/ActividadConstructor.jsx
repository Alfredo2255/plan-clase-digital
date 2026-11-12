import { useState } from "react";
import { motion } from "framer-motion";

const TEXTO = [
  { n: "Cian", v: "#22d3ee" }, { n: "Rosa", v: "#f472b6" },
  { n: "Lima", v: "#a3e635" }, { n: "Naranja", v: "#fb923c" },
];
const FONDO = [
  { n: "Noche", v: "#1e1b4b" }, { n: "Vino", v: "#4c0519" },
  { n: "Bosque", v: "#052e16" }, { n: "Blanco", v: "#ffffff" },
];
const STICKERS = ["🐶", "🚀", "⚽", "🦄", "🌮", "🎸"];
const TAM_INICIAL = 28;

function ActividadConstructor({ onPuntos, onAcierto }) {
  const [titulo, setTitulo] = useState("");
  const [ct, setCt] = useState(null);
  const [cf, setCf] = useState(null);
  const [sticker, setSticker] = useState(null);
  const [tam, setTam] = useState(TAM_INICIAL);

  const calcular = (t, a, b, s, z) =>
    onPuntos("constructor", (t.trim() ? 1 : 0) + (a ? 1 : 0) + (b ? 1 : 0) + (s ? 1 : 0) + (z !== TAM_INICIAL ? 1 : 0));

  const elegir = (setter, valor, nuevo) => {
    setter(valor);
    calcular(...nuevo);
    onAcierto();
  };

  return (
    <div className="constructor">
      <div className="constructor-controles">
        <label className="campo">
          1. Escribe tu título <code>&lt;h1&gt;</code>
          <input type="text" maxLength={24} value={titulo} placeholder="Ej: Mi equipo favorito"
            onChange={(e) => { setTitulo(e.target.value); calcular(e.target.value, ct, cf, sticker, tam); }} />
        </label>

        <p className="campo-etiqueta">2. Color del texto <code>color</code></p>
        <div className="opciones">
          {TEXTO.map((c) => (
            <button type="button" key={c.v} className={`opcion ${ct === c.v ? "ok" : ""}`}
              onClick={() => elegir(setCt, c.v, [titulo, c.v, cf, sticker, tam])}>
              <span className="muestra" style={{ background: c.v }} /> {c.n}
            </button>
          ))}
        </div>

        <p className="campo-etiqueta">3. Color de fondo <code>background-color</code></p>
        <div className="opciones">
          {FONDO.map((c) => (
            <button type="button" key={c.v} className={`opcion ${cf === c.v ? "ok" : ""}`}
              onClick={() => elegir(setCf, c.v, [titulo, ct, c.v, sticker, tam])}>
              <span className="muestra" style={{ background: c.v }} /> {c.n}
            </button>
          ))}
        </div>

        <p className="campo-etiqueta">4. Un sticker para tu página</p>
        <div className="opciones">
          {STICKERS.map((s) => (
            <motion.button type="button" key={s} className={`opcion sticker ${sticker === s ? "ok" : ""}`}
              whileHover={{ scale: 1.25, rotate: 10 }} whileTap={{ scale: 0.8 }}
              onClick={() => elegir(setSticker, s, [titulo, ct, cf, s, tam])}>
              {s}
            </motion.button>
          ))}
        </div>

        <label className="campo">
          5. Tamaño de letra <code>font-size</code>: {tam}px
          <input type="range" min={16} max={44} value={tam}
            onChange={(e) => { const z = Number(e.target.value); setTam(z); calcular(titulo, ct, cf, sticker, z); }} />
        </label>
      </div>

      <div className="constructor-vista">
        <p className="campo-etiqueta">Vista previa en vivo</p>
        <motion.div className="vista-previa" animate={{ backgroundColor: cf ?? "#312e81" }} transition={{ duration: 0.5 }}>
          {sticker && (
            <motion.div key={sticker} className="sticker-grande"
              initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 10 }}>
              <motion.span animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
                {sticker}
              </motion.span>
            </motion.div>
          )}
          <motion.h4 layout style={{ color: ct ?? "#e0e7ff", fontSize: tam }}>
            {titulo || "Tu título aparece aquí"}
          </motion.h4>
        </motion.div>

        <p className="campo-etiqueta">Tu código HTML + CSS</p>
        <pre className="codigo">{`<h1 style="
  color: ${ct ?? "…"};
  background-color: ${cf ?? "…"};
  font-size: ${tam}px;
">
  ${sticker ?? ""} ${titulo || "…"}
</h1>`}</pre>
      </div>
    </div>
  );
}

export default ActividadConstructor;
