import { useState } from "react";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import Ionicons from "@expo/vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import AddTaskScreen from "../screens/AddTaskScreen";
import ProfileScreens from "../screens/ProfileScreens";
import TaskDetail from "../components/TaskDetail";

import type { SifonadoTask } from "../types/SifonadoTask";
import TaskDetailScreen from "../screens/TaskDetailScreen";


// Navegador inferior
const Tab = createBottomTabNavigator();


// Navegador interno de Home
const Stack = createNativeStackNavigator();


export default function AppNavigator() {

  // --------------------------------------------------
  // LISTA GENERAL DE SIFONADOS
  // --------------------------------------------------
  //
  // El estado vive arriba de las pantallas.
  // De esta forma no se pierde al navegar.
  //

  const [tasks, setTasks] =
    useState<SifonadoTask[]>([]);


  // --------------------------------------------------
  // STACK DE HOME
  // --------------------------------------------------

  function HomeStack() {

    return (

      <Stack.Navigator>

        {/* LISTA */}

        <Stack.Screen
          name="TaskList"
          options={{
            title: "Sifonados",
          }}
        >

          {(props) => (

            <HomeScreen
              {...props}
              tasks={tasks}
              setTasks={setTasks}
            />

          )}

        </Stack.Screen>

          {/* DETALLE */}
        <Stack.Screen
            name="TaskDetail"
             options={{
              title: "Detalle del sifonado",
         }}
            >
            {(props) => (
            <TaskDetailScreen
              {...props}
              tasks={tasks}
             />
         )}
        </Stack.Screen>


        {/* FORMULARIO */}

        <Stack.Screen
          name="TaskForm"
          options={{
            title: "Agregar sifonado",
          }}
        >

          {(props) => (

            <AddTaskScreen
              {...props}

              onAddTask={(newTask) => {

                setTasks((currentTasks) => [
                  ...currentTasks,
                  newTask,
                ]);

              }}
            />

          )}

        </Stack.Screen>


        {/* Más adelante agregaremos aquí TaskDetail */}

      </Stack.Navigator>

    );

  }


  // --------------------------------------------------
  // NAVEGACIÓN PRINCIPAL
  // --------------------------------------------------

  return (

    <NavigationContainer>

      <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size }) => {
      let iconName: keyof typeof Ionicons.glyphMap;

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

    tabBarActiveTintColor: "#5546E8",
    tabBarInactiveTintColor: "#777777",
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

    </NavigationContainer>

  );

}
