import { useState } from "react";
import { motion } from "framer-motion";
import HeaderClase from "./components/HeaderClase";
import ObjetivoCard from "./components/ObjetivoCard";
import ActividadItem from "./components/ActividadItem";
import EvaluacionForm from "./components/EvaluacionForm";
import RegistrosNocoDB from "./components/RegistrosNocoDB";
import Hud from "./components/Hud";
import Confeti from "./components/Confeti";
import ActividadEtiquetas from "./actividades/ActividadEtiquetas";
import ActividadEstructura from "./actividades/ActividadEstructura";
import ActividadConstructor from "./actividades/ActividadConstructor";
import ActividadErrores from "./actividades/ActividadErrores";

const MISIONES = [
  { id: "etiquetas", icono: "🔎", corto: "Etiquetas", max: 4, fase: "inicio",
    nombre: "Misión 1: Detective de etiquetas",
    descripcion: "Descubre para qué sirve cada etiqueta HTML.",
    pista: "<h1> es el más grande, <p> es para escribir y <a> te lleva a otro lugar." },
  { id: "estructura", icono: "🧩", corto: "Esqueleto", max: 3, fase: "desarrollo",
    nombre: "Misión 2: Arma el esqueleto",
    descripcion: "Ordena las piezas de una página web arrastrándolas.",
    pista: "Todo lo que se abre se cierra al final: lo primero que abres es lo último que cierras." },
  { id: "constructor", icono: "🎨", corto: "Constructor", max: 5, fase: "desarrollo",
    nombre: "Misión 3: Constructor de páginas",
    descripcion: "Diseña tu título con colores, sticker y tamaño. ¡Mira el código crecer!",
    pista: "Cada cambio que haces escribe una línea de CSS en la caja de código." },
  { id: "errores", icono: "🐞", corto: "Bugs", max: 3, fase: "cierre",
    nombre: "Misión 4: Cazador de errores",
    descripcion: "Encuentra la línea con el error en cada código.",
    pista: "Revisa si falta una barra /, dos puntos : o un símbolo >." },
];

const TOTAL_MAX = MISIONES.reduce((s, m) => s + m.max, 0);

function App() {
  const [puntos, setPuntos] = useState({ etiquetas: 0, estructura: 0, constructor: 0, errores: 0 });
  const [activa, setActiva] = useState("etiquetas");
  const [celebra, setCelebra] = useState(0);
  const [recarga, setRecarga] = useState(0);

  const actualizar = (clave, valor) => setPuntos((p) => ({ ...p, [clave]: valor }));
  const celebrar = () => setCelebra((c) => c + 1);
  const total = Object.values(puntos).reduce((a, b) => a + b, 0);

  const medallas = MISIONES.map((m) => ({ id: m.id, icono: m.icono, lograda: puntos[m.id] >= m.max }));
  const props = { onPuntos: actualizar, onAcierto: celebrar };

  const contenido = {
    etiquetas: <ActividadEtiquetas {...props} />,
    estructura: <ActividadEstructura {...props} />,
    constructor: <ActividadConstructor {...props} />,
    errores: <ActividadErrores {...props} />,
  };

  return (
    <>
      <Confeti disparo={celebra} />
      <Hud total={total} totalMax={TOTAL_MAX} medallas={medallas} />

      <HeaderClase
        tituloTema="Mi primera página web"
        grado="Tercero Básico"
        nombreDocente="Luis Alfredo Hernández Estrada"
        duracion="40 min"
      />

      <main>
        <section id="objetivos" className="bloque">
          <h2 className="titulo-seccion">🎯 Objetivos de hoy</h2>
          <div className="fila">
            <ObjetivoCard indice={0} icono="🧱"
              competencia="Reconoce la estructura básica de una página web y la función de las etiquetas HTML más comunes."
              indicadorLogro="Relaciona las etiquetas h1, p, img y a con su función y ordena la estructura html, head y body." />
            <ObjetivoCard indice={1} icono="🎨"
              competencia="Aplica estilos básicos con CSS: color de texto, color de fondo y tamaño de letra."
              indicadorLogro="Crea un título propio, le cambia los colores y el tamaño, y observa el resultado en la vista previa." />
          </div>
        </section>

        <section id="misiones" className="bloque">
          <h2 className="titulo-seccion">🕹️ Misiones</h2>

          <nav className="selector" aria-label="Elegir misión">
            {MISIONES.map((m, i) => (
              <motion.button
                key={m.id}
                type="button"
                className={`selector-btn ${activa === m.id ? "activo" : ""} ${puntos[m.id] >= m.max ? "completa" : ""}`}
                onClick={() => setActiva(m.id)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.92 }}
              >
                <span>{puntos[m.id] >= m.max ? "🏅" : m.icono}</span>
                <small>{i + 1}. {m.corto}</small>
                {activa === m.id && <motion.span layoutId="subrayado" className="subrayado" />}
              </motion.button>
            ))}
          </nav>

          {MISIONES.map((m) => (
            <motion.div
              key={m.id}
              initial={false}
              animate={activa === m.id ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.4 }}
              style={{ display: activa === m.id ? "block" : "none" }}
            >
              <ActividadItem {...m} puntos={puntos[m.id]} puntosMax={m.max}>
                {contenido[m.id]}
              </ActividadItem>
            </motion.div>
          ))}
        </section>

        <section id="evaluacion" className="bloque">
          <h2 className="titulo-seccion">💾 Guarda tu récord</h2>
          <EvaluacionForm puntaje={total} puntajeMax={TOTAL_MAX} onGuardado={() => setRecarga((r) => r + 1)} />
        </section>

        <section id="ranking" className="bloque">
          <h2 className="titulo-seccion">🏆 Ranking de la clase</h2>
          <RegistrosNocoDB recarga={recarga} />
        </section>
      </main>

      <footer className="pie">
        Plan de Clase Digital · Tecnología · Tercero Básico · Universidad Rafael Landívar
      </footer>
    </>
  );
}

export default App;
