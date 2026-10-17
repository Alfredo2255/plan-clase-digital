function HeaderClase({ tituloTema, nombreDocente, horario }) {
  return (
    <header className="header-clase">
      <span className="header-etiqueta">Plan de Clase Digital</span>
      <h1>{tituloTema}</h1>
      <p>Docente: <strong>{nombreDocente}</strong></p>
      <p>Horario: {horario}</p>
    </header>
  );
}

export default HeaderClase;