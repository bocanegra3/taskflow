import {
  NavigationContainer,
} from "@react-navigation/native";
import { useEffect } from "react";
import {
  ActivityIndicator,
  View,
} from "react-native";
import {
  onAuthStateChanged,
} from "firebase/auth";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { auth } from "../firebase/firebaseConfig";
import AuthStack from "./AuthStack";
import type {
  AppDispatch,
  RootState,
} from "../store/store";
import {
  setUser,
  clearUser,
} from "../store/authSlice";
import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { setTasks } from "../store/tasksSlice";

import {
  subscribeToUserTasks,
} from "../firebase/tasksService";

import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import AddTaskScreen from "../screens/AddTaskScreen";
import ProfileScreens from "../screens/ProfileScreens";
import TaskDetail from "../components/TaskDetail";
import TaskDetailScreen from "../screens/TaskDetailScreen";


// Navegador inferior
const Tab = createBottomTabNavigator();


// Navegador interno de Home
const Stack = createNativeStackNavigator();


export default function AppNavigator() {
  const dispatch =
  useDispatch<AppDispatch>();


const user = useSelector(
  (state: RootState) =>
    state.auth.user
);


const isLoading = useSelector(
  (state: RootState) =>
    state.auth.isLoading
);

useEffect(() => {

  // Firebase observa permanentemente
  // si existe una sesión iniciada.
  const unsubscribe =
    onAuthStateChanged(
      auth,

      (firebaseUser) => {

        if (firebaseUser) {

          // Hay usuario logueado.
          // Guardamos solamente los datos
          // que necesitamos en Redux.
          dispatch(
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
            })
          );

        } else {

          // No existe sesión activa.
          dispatch(clearUser());

        }

      }
    );


  // Al desmontar el componente
  // dejamos de escuchar Firebase.
  return unsubscribe;

}, [dispatch]);
useEffect(() => {

  // Si no hay usuario,
  // vaciamos las tareas de Redux.
  if (!user) {

    dispatch(setTasks([]));

    return;
  }


  // Escuchamos solamente las tareas
  // pertenecientes a este usuario.
  const unsubscribe =
    subscribeToUserTasks(

      user.uid,

      (tasks) => {

        dispatch(
          setTasks(tasks)
        );

      },

      (error) => {

        console.log(
          "Error cargando tareas:",
          error
        );

      }

    );


  return unsubscribe;

}, [user, dispatch]);

  // --------------------------------------------------
  // LISTA GENERAL DE SIFONADOS
  // --------------------------------------------------
  // --------------------------------------------------
  // STACK DE HOME
  // --------------------------------------------------

  function HomeStack() {

    return (

      <Stack.Navigator>

        {/* LISTA */}

<Stack.Screen
  name="TaskList"
  component={HomeScreen}
  options={{
    title: "Sifonados",
  }}
/>

          {/* DETALLE */}
<Stack.Screen
  name="TaskDetail"
  component={TaskDetailScreen}
  options={{
    title: "Detalle del sifonado",
  }}
/>


        {/* FORMULARIO */}

<Stack.Screen
  name="TaskForm"
  component={AddTaskScreen}
  options={{
    title: "Agregar sifonado",
  }}
/>


        {/* Más adelante agregaremos aquí TaskDetail */}

      </Stack.Navigator>

    );

  }
if (isLoading) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
}

  // --------------------------------------------------
  // NAVEGACIÓN PRINCIPAL
  // --------------------------------------------------

 return (
  <NavigationContainer>

    {user ? (

      // Si hay usuario logueado,
      // mostramos la app principal.
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {

            let iconName:
              keyof typeof Ionicons.glyphMap;

            if (route.name === "Sifonado") {
              iconName = "download";
            } else {
              iconName = "person";
            }

            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
          headerStyle: {
  backgroundColor: "#111827",
},

headerTintColor: "#FFFFFF",

tabBarStyle: {
  backgroundColor: "#111827",
  borderTopColor: "#1F2937",
},

tabBarActiveTintColor: "#20B8B2",

tabBarInactiveTintColor: "#9CA3AF",

        })}
      >

        <Tab.Screen
          name="Sifonado"
          component={HomeStack}
          options={{
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreens}
          options={{
            title: "Perfil",
          }}
        />

      </Tab.Navigator>

    ) : (

      // Si NO hay usuario logueado,
      // solamente mostramos Login / Register.
      <AuthStack />

    )}

  </NavigationContainer>
);

}
