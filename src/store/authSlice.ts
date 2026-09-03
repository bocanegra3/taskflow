import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";


// ----------------------------------------------------
// USUARIO GUARDADO EN REDUX
// ----------------------------------------------------

type AuthUser = {
  uid: string;
  email: string | null;
};


// ----------------------------------------------------
// ESTADO DE AUTENTICACIÓN
// ----------------------------------------------------

type AuthState = {
  user: AuthUser | null;

  // Mientras Firebase verifica si existe
  // una sesión guardada.
  isLoading: boolean;
};


// ----------------------------------------------------
// ESTADO INICIAL
// ----------------------------------------------------

const initialState: AuthState = {
  user: null,
  isLoading: true,
};


// ----------------------------------------------------
// AUTH SLICE
// ----------------------------------------------------

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {

    // Firebase encontró un usuario logueado
    setUser: (
      state,
      action: PayloadAction<AuthUser>
    ) => {
      state.user = action.payload;
      state.isLoading = false;
    },


    // Firebase confirmó que NO existe sesión
    clearUser: (state) => {
      state.user = null;
      state.isLoading = false;
    },


    // Nos permite controlar manualmente
    // el estado de carga si lo necesitamos.
    setAuthLoading: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isLoading = action.payload;
    },

  },
});


export const {
  setUser,
  clearUser,
  setAuthLoading,
} = authSlice.actions;


export default authSlice.reducer;