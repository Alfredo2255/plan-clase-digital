import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const URL_API = import.meta.env.VITE_NOCODB_URL;
const TOKEN = import.meta.env.VITE_NOCODB_TOKEN;

// Separa "[8/15] comentario" en puntaje y texto
function leer(fields) {
  const texto = fields?.Descripcion ?? "";
  const m = texto.match(/^\[(\d+)\/(\d+)\]\s*(.*)$/s);
  return m
    ? { puntos: Number(m[1]), max: Number(m[2]), comentario: m[3] }
    : { puntos: null, max: null, comentario: texto };
}

// READ: ranking de la clase (GET). Se vuelve a pedir cuando cambia "recarga"
function RegistrosNocoDB({ recarga }) {
  const [registros, setRegistros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true;
    async function cargar() {
      try {
        const respuesta = await fetch(`${URL_API}?limit=50`, {
          method: "GET",
          headers: { "xc-token": TOKEN, "Content-Type": "application/json" },
        });
        if (!respuesta.ok) throw new Error(`Error ${respuesta.status} al consultar NocoDB`);
        const datos = await respuesta.json();
        if (activo) {
          setRegistros(datos.records ?? datos.list ?? []);
          setError(null);
        }
      } catch (err) {
        if (activo) setError(err.message);
      } finally {
        if (activo) setCargando(false);
      }
    }
    cargar();
    return () => { activo = false; };
  }, [recarga]);

  if (cargando) return <p className="mensaje">⏳ Cargando ranking...</p>;
  if (error) return <p className="mensaje-error">No se pudieron cargar los datos: {error}</p>;
  if (registros.length === 0) return <p className="mensaje">Aún no hay récords. ¡Sé el primero!</p>;

  const filas = registros
    .map((r) => ({ id: r.id, nombre: r.fields?.Nombre, ...leer(r.fields) }))
    .sort((a, b) => (b.puntos ?? -1) - (a.puntos ?? -1));

  return (
    <ol className="ranking">
      {filas.map((f, i) => (
        <motion.li
          key={f.id}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08, type: "spring", stiffness: 120 }}
          whileHover={{ scale: 1.03, x: 6 }}
        >
          <span className="puesto">{["🥇", "🥈", "🥉"][i] ?? `#${i + 1}`}</span>
          <div className="ranking-datos">
            <strong>{f.nombre}</strong>
            <small>{f.comentario}</small>
          </div>
          <span className="ranking-puntos">{f.puntos !== null ? `${f.puntos} XP` : "—"}</span>
        </motion.li>
      ))}
    </ol>
  );
}

export default RegistrosNocoDB;
