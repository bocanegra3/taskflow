import { useState } from "react";
import { StyleSheet, Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ProfileScreens from "./ProfileScreens";
import AddTaskScreen from "./AddTaskScreen";
import { colors } from "../constants/colors";

export default function App() {
  // false: muestra el perfil
  // true: muestra el formulario de tareas
  const [showAddTask, setShowAddTask] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {showAddTask ? (
        <View style={styles.screenContainer}>
          <Button
            title="Volver al perfil"
            color={colors.botonColor}
            onPress={() => setShowAddTask(false)}
          />

          <AddTaskScreen />
        </View>
      ) : (
        <View style={styles.screenContainer}>
          <ProfileScreens />

          <Button
            title="Agregar sifonado"
            color={colors.botonColor}
            onPress={() => setShowAddTask(true)}
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
  },

  screenContainer: {
    flex: 1,
    padding: 10,
    gap: 10,
  },
});