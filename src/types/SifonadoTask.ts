// Este tipo define cómo debe estar formada
// cada tarea de sifonado dentro de la aplicación.

export type SifonadoTask = {
  // Identificador único
  id: string;

  // Título general
  title: string;

  // Ejemplo: "1b al 4b"
  tankRange: string;

  // Información adicional
  description: string;

  // Por ahora siempre será "Sifonado"
  category: string;

  // Duración total prevista, en minutos
  durationMinutes: number;

  // Momento exacto en que comenzó.
  // null significa que todavía no comenzó.
  startedAt: number | null;
};