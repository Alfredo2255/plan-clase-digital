// Animación compartida: las tarjetas aparecen una tras otra (efecto escalonado)
export const tarjeta = {
  oculta: { opacity: 0, y: 60 },
  visible: (indice = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay: 0.6 + indice * 0.4, ease: "easeOut" },
  }),
};

// Efecto "elevación" al pasar el cursor (resorte elástico)
export const elevar = {
  scale: 1.04,
  boxShadow: "0px 14px 28px rgba(30, 47, 107, 0.25)",
  transition: { type: "spring", stiffness: 200, damping: 12 },
};

export const presionar = { scale: 0.97 };
