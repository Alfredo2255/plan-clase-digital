import { useState } from "react";

function ActividadItem({ nombre, descripcion }) {
  const [completada, setCompletada] = useState(false);

  return (
    <li className={`actividad ${completada ? "completada" : "pendiente"}`}>
      <strong className="actividad-nombre">{nombre}</strong>
      <p>{descripcion}</p>
      <p>Estado: {completada ? "✅ Completada" : "⏳ Pendiente"}</p>

      <button onClick={() => setCompletada(!completada)}>
        {completada ? "Marcar como pendiente" : "Marcar como completada"}
      </button>
    </li>
  );
}

export default ActividadItem;