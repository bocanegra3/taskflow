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
import TaskDetailScreen from "../screens/TaskDetailScreen";


// Navegador inferior
const Tab = createBottomTabNavigator();


// Navegador interno de Home
const Stack = createNativeStackNavigator();


export default function AppNavigator() {

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
