import HeaderClase from "./components/HeaderClase";
import ObjetivosCard from "./components/ObjetivosCard";
import ActividadItem from "./components/ActividadItem";

function App() {
  return (
    <>
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
        <section className="tarjeta-modulo" id="sobre-mi">
          <h2>Un poco sobre mí</h2>
          <p>
            Soy estudiante de la carrera de Profesorado y estoy iniciando este
            curso con muchas ganas de aprender herramientas que me ayuden a
            mejorar como futuro educador.
          </p>
        </section>

        <section className="tarjeta-modulo" id="por-que">
          <h2>¿Por qué elegí la docencia?</h2>
          <p>
            Elegí este camino porque quiero contribuir a la formación de otras
            personas y ser parte del cambio positivo en la educación de mi país.
          </p>
        </section>

        <section className="tarjeta-modulo" id="objetivos">
          <h2>Mis objetivos personales para este curso</h2>
          <ul>
            <li>Aprender los fundamentos básicos de HTML y CSS.</li>
            <li>Aplicar herramientas digitales en mi futura práctica docente.</li>
            <li>Desarrollar material educativo visual e interactivo.</li>
            <li>Perder el miedo a la tecnología y usarla como aliada.</li>
          </ul>
        </section>

        <div id="sesion">
          <ObjetivosCard
            competencia="Explica el proceso de la fotosíntesis y su importancia para los seres vivos."
            indicadorLogro="Identifica las etapas de la fotosíntesis y describe con sus palabras qué necesita una planta para producir su alimento."
          />
        </div>

        <section className="tarjeta-modulo">
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
        </section>
      </main>
    </>
  );
}

export default App;