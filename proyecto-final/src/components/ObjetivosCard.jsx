function ObjetivosCard({ competencia, indicadorLogro }) {
  return (
    <section className="tarjeta-modulo">
      <h2>🎯 Competencia</h2>
      <p>{competencia}</p>

      <h3>✅ Indicador de logro</h3>
      <p>{indicadorLogro}</p>
    </section>
  );
}

export default ObjetivosCard;