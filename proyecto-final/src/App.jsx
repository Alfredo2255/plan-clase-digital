import { motion, MotionConfig } from "framer-motion";
import HeaderClase from "./components/HeaderClase";
import ObjetivosCard from "./components/ObjetivosCard";
import ActividadItem from "./components/ActividadItem";

const animacionTarjeta = (retraso) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: retraso },
  whileHover: { y: -6, boxShadow: "0 14px 30px rgba(30, 47, 107, 0.22)" },
});

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <nav className="navbar">
        <span className="navbar-logo">Futuro Docente</span>
        <ul className="navbar-enlaces">
          <li><a href="#sobre-mi">Sobre mí</a></li>
          <li><a href="#por-que">¿Por qué la docencia?</a></li>
          <li><a href="#objetivos">Objetivos</a></li>
          <li><a href="#sesion">Mi clase</a></li>
        </ul>
      </nav>

      <HeaderClase
        tituloTema="TEC"
        nombreDocente="Luis Alfredo Hernández Estrada"
        horario="Lunes a viernes, 8:00 a.m. - 12:30 p.m."
      />

      <main className="contenedor-tarjetas">
        <motion.section className="tarjeta-modulo" id="sobre-mi" {...animacionTarjeta(0.1)}>
          <h2>Un poco sobre mí</h2>
          <p>
            Soy estudiante de la carrera de Profesorado y estoy iniciando este
            curso con muchas ganas de aprender herramientas que me ayuden a
            mejorar como futuro educador.
          </p>
        </motion.section>

        <motion.section className="tarjeta-modulo" id="por-que" {...animacionTarjeta(0.2)}>
          <h2>¿Por qué elegí la docencia?</h2>
          <p>
            Elegí este camino porque quiero contribuir a la formación de otras
            personas y ser parte del cambio positivo en la educación de mi país.
          </p>
        </motion.section>

        <motion.section className="tarjeta-modulo" id="objetivos" {...animacionTarjeta(0.3)}>
          <h2>Mis objetivos personales para este curso</h2>
          <ul>
            <li>Aprender los fundamentos básicos de HTML y CSS.</li>
            <li>Aplicar herramientas digitales en mi futura práctica docente.</li>
            <li>Desarrollar material educativo visual e interactivo.</li>
            <li>Perder el miedo a la tecnología y usarla como aliada.</li>
          </ul>
        </motion.section>

        <div id="sesion">
          <ObjetivosCard
            competencia="Explica el proceso de la fotosíntesis y su importancia para los seres vivos."
            indicadorLogro="Identifica las etapas de la fotosíntesis y describe con sus palabras qué necesita una planta para producir su alimento."
          />
        </div>

        <motion.section className="tarjeta-modulo" {...animacionTarjeta(0.5)}>
          <h2>Actividades de la sesión</h2>
          <ul className="lista-actividades">
            <ActividadItem
              nombre="Lluvia de ideas"
              descripcion="Los estudiantes comparten qué creen que necesitan las plantas para vivir."
              nivel="basico"
              fase="inicio"
            />
            <ActividadItem
              nombre="Video explicativo"
              descripcion="Observar un video corto sobre la fotosíntesis y tomar apuntes."
              nivel="intermedio"
              fase="desarrollo"
            />
            <ActividadItem
              nombre="Dibujo del proceso"
              descripcion="Dibujar y rotular las etapas de la fotosíntesis en su cuaderno."
              nivel="avanzado"
              fase="cierre"
            />
          </ul>
        </motion.section>
      </main>
    </MotionConfig>
  );
}

export default App;