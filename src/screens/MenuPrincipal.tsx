import { useState } from "react";
import { StyleSheet, Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ProfileScreens from "./ProfileScreens";
import AddTaskScreen from "../screens/AddTaskScreen";
import { colors } from "../constants/colors";
import HomeScreen from "./HomeScreen";

import type { SifonadoTask } from "../types/SifonadoTask";

export default function App() {
  // false: muestra el perfil
  // true: muestra el formulario de tareas
  const [screen, setScreen] = useState<"profile" | "addTask" | "home">(
  "profile"
);


const [tasks, setTasks] = useState<SifonadoTask[]>([
  {
    id: "1",
    title: "Sifonados de los Tanques",
    tankRange: "1b al 4b",
    description: "Sifonado correspondiente a los tanques 1b al 4b.",
    category: "Sifonado",
    durationMinutes: 40,
    startedAt: null,
  },

  {
    id: "2",
    title: "Sifonados de los Tanques",
    tankRange: "16b al 20b",
    description: "Sifonado correspondiente a los tanques 16b al 20b.",
    category: "Sifonado",
    durationMinutes: 30,
    startedAt: null,
  },
]);
const handleAddTask = (newTask: SifonadoTask) => {
  setTasks((currentTasks) => [
    ...currentTasks,
    newTask,
  ]);
};
  return ( 
  <SafeAreaView style={styles.container}>
    {screen === "addTask" ? (
      <View style={styles.screenContainer}>
        <Button
          title="Volver al perfil"
          color={colors.botonColor}
          onPress={() => setScreen("profile")}
        />

       <AddTaskScreen
  onAddTask={handleAddTask}
/>
      </View>
    ) : screen === "home" ? (
      <View style={styles.screenContainer}>
        <Button
          title="Volver al perfil"
          color={colors.botonColor}
          onPress={() => setScreen("profile")}
        />

       <HomeScreen
  tasks={tasks}
  setTasks={setTasks}
/>
      </View>
    ) : (
      <View style={styles.screenContainer}>
        <ProfileScreens />

        <Button
          title="Agregar Sifonados"
          color={colors.botonColor}
          onPress={() => setScreen("addTask")}
        />

        <Button
          title="Ver Sifonados"
          color={colors.botonColor}
          onPress={() => setScreen("home")}
        />
      </View>
    )}
  </SafeAreaView>
);
  
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: colors.backgounrdColor,
  padding: 0,
},

screenContainer: {
  flex: 1,
  // Menos espacio a los costados = botones más anchos
  paddingHorizontal: 10,
  // Reduce espacio arriba
  paddingTop: 5,
  // Espacio inferior
  paddingBottom: 150,
  // Acerca los botones entre sí y los sube
  gap: 55,
},
});