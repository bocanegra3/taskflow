import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import type { SifonadoTask } from "../types/SifonadoTask";


// ----------------------------------------------------
// FILTROS DISPONIBLES
// ----------------------------------------------------

export type TaskFilter =
  | "all"
  | "completed"
  | "pending";


// ----------------------------------------------------
// DATOS QUE RECIBIREMOS DESDE EL FORMULARIO
// ----------------------------------------------------
//
// No recibimos:
// - id
// - startedAt
// - completed
//
// Redux se encargará de generarlos.
//

type NewTaskPayload = {
  title: string;
  tankRange: string;
  description: string;
  category: string;
  durationMinutes: number;
};


// ----------------------------------------------------
// FORMA DEL ESTADO GLOBAL DE TAREAS
// ----------------------------------------------------

type TasksState = {
  tasks: SifonadoTask[];
  filter: TaskFilter;
};


// ----------------------------------------------------
// ESTADO INICIAL
// ----------------------------------------------------

const initialState: TasksState = {
  tasks: [],
  filter: "all",
};


// ----------------------------------------------------
// SLICE
// ----------------------------------------------------

const tasksSlice = createSlice({
  name: "tasks",

  initialState,

  reducers: {

    // ==================================================
    // AGREGAR UN SIFONADO
    // ==================================================
    //
    // Recibe los datos del formulario.
    //
    // Redux agrega automáticamente:
    // - id
    // - startedAt
    // - completed
    //

    addTask: (
      state,
      action: PayloadAction<NewTaskPayload>
    ) => {

      const newTask: SifonadoTask = {
        id: Date.now().toString(),

        title: action.payload.title,

        tankRange: action.payload.tankRange,

        description: action.payload.description,

        category: action.payload.category,

        durationMinutes:
          action.payload.durationMinutes,

        // Todavía no comenzó
        startedAt: null,

        // Empieza como pendiente
        completed: false,
      };


      // Agregamos la tarea al array global.
      state.tasks.push(newTask);
    },


    // ==================================================
    // INICIAR SIFONADO
    // ==================================================
    //
    // Recibe el ID.
    //
    // Busca ese sifonado y guarda
    // el momento exacto en que comenzó.
    //

    startTask: (
      state,
      action: PayloadAction<string>
    ) => {

      const task = state.tasks.find(
        (item) =>
          item.id === action.payload
      );


      // Solamente lo iniciamos
      // si existe y todavía no comenzó.
      if (
        task &&
        task.startedAt === null
      ) {
        task.startedAt = Date.now();
      }

    },


    // ==================================================
    // COMPLETAR / VOLVER A PENDIENTE
    // ==================================================
    //
    // true  → completada
    // false → pendiente
    //

    toggleTaskStatus: (
      state,
      action: PayloadAction<string>
    ) => {

      const task = state.tasks.find(
        (item) =>
          item.id === action.payload
      );


      if (task) {
        task.completed =
          !task.completed;
      }

    },


    // ==================================================
    // ELIMINAR SIFONADO
    // ==================================================
    //
    // Conservamos todas las tareas
    // excepto la que tiene ese ID.
    //

    deleteTask: (
      state,
      action: PayloadAction<string>
    ) => {

      state.tasks =
        state.tasks.filter(
          (task) =>
            task.id !== action.payload
        );

    },


    // ==================================================
    // CAMBIAR FILTRO
    // ==================================================
    //
    // Puede recibir:
    //
    // "all"
    // "completed"
    // "pending"
    //

    setFilter: (
      state,
      action: PayloadAction<TaskFilter>
    ) => {

      state.filter =
        action.payload;

    },

  },
});


// ----------------------------------------------------
// EXPORTAMOS LAS ACCIONES
// ----------------------------------------------------
//
// Después las pantallas podrán hacer:
//
// dispatch(addTask(...))
// dispatch(deleteTask(id))
// etc.
//

export const {
  addTask,
  startTask,
  toggleTaskStatus,
  deleteTask,
  setFilter,
} = tasksSlice.actions;


// ----------------------------------------------------
// EXPORTAMOS EL REDUCER
// ----------------------------------------------------

export default tasksSlice.reducer;