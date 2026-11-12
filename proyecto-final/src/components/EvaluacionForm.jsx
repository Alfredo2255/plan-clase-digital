import { useState } from "react";
import { motion } from "framer-motion";

const URL_API = import.meta.env.VITE_NOCODB_URL;
const TOKEN = import.meta.env.VITE_NOCODB_TOKEN;

// CREATE: guarda el resultado en NocoDB (POST). El puntaje va al inicio de "Descripcion" como [X/Y]
function EvaluacionForm({ puntaje, puntajeMax, onGuardado }) {
  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");
  const [estado, setEstado] = useState("inactivo"); // inactivo | enviando | exito | error
  const [mensaje, setMensaje] = useState("");

  const enviar = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      setEstado("error");
      setMensaje("Escribe tu nombre para guardar tu récord.");
      return;
    }
    setEstado("enviando");
    try {
      const respuesta = await fetch(URL_API, {
        method: "POST",
        headers: { "xc-token": TOKEN, "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: {
            Nombre: nombre.trim(),
            Descripcion: `[${puntaje}/${puntajeMax}] ${comentario.trim() || "Sin comentario"}`,
          },
        }),
      });
      if (!respuesta.ok) throw new Error(`Error ${respuesta.status} al guardar`);
      setEstado("exito");
      setMensaje("¡Récord guardado en la nube! 🏆");
      setNombre("");
      setComentario("");
      onGuardado();
    } catch (err) {
      setEstado("error");
      setMensaje(`No se pudo guardar: ${err.message}`);
    }
  };

  return (
    <form className="formulario" onSubmit={enviar}>
      <motion.p className="puntaje-total" key={puntaje}
        initial={{ scale: 1.3 }} animate={{ scale: 1 }}>
        Tu récord: <strong>{puntaje} / {puntajeMax} XP</strong>
      </motion.p>

      <label className="campo">
        Tu nombre
        <input type="text" value={nombre} maxLength={40}
          onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Ana López" />
      </label>

      <label className="campo">
        ¿Qué aprendiste hoy?
        <textarea rows={3} value={comentario} maxLength={160}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="Escribe con tus palabras algo que aprendiste" />
      </label>

      <motion.button type="submit" className="btn-principal" disabled={estado === "enviando"}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.94 }}>
        {estado === "enviando" ? "Guardando..." : "💾 Guardar mi récord"}
      </motion.button>

      {estado === "exito" && (
        <motion.p className="mensaje" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {mensaje}
        </motion.p>
      )}
      {estado === "error" && <p className="mensaje-error">{mensaje}</p>}
    </form>
  );
}

export default EvaluacionForm;
