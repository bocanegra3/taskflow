import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

export type SifonadoTask = {
  id: string;

  // Nombre general de la tarea
  title: string;

  // Por ejemplo: "1b al 4b"
  tankRange: string;

  description: string;

  category: string;

  // Tiempo total que debería durar el sifonado
  durationMinutes: number;

  // null significa que todavía no comenzó.
  // Cuando empieza guardaremos Date.now()
  startedAt: number | null;
};