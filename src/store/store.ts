import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import tasksReducer from "./tasksSlice";


// Store principal de la aplicación.
//
// Acá iremos agregando los distintos slices.
// Por ahora solamente tenemos tasks.
export const store = configureStore({
reducer: {
  tasks: tasksReducer,
  auth: authReducer,
},
});


// Tipo del estado global completo.
//
// Después nos va a servir para useSelector.
export type RootState = ReturnType<
  typeof store.getState
>;


// Tipo del dispatch.
//
// Después nos va a servir cuando enviemos
// acciones como addTask o deleteTask.
export type AppDispatch = typeof store.dispatch;