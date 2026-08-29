import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import type { SifonadoTask } from "../types/SifonadoTask";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

type TaskDetailScreenProps = {
  route: any;
};

export default function TaskDetailScreen({
  route,
}: TaskDetailScreenProps) {

  // 1. Recibimos el ID enviado desde HomeScreen
  const { taskId } = route.params;

// Buscamos directamente en Redux
// la tarea cuyo ID recibimos por navegación.

const task = useSelector(
  (state: RootState) =>
    state.tasks.tasks.find(
      (item) => item.id === taskId
    )
);
  // 3. Si por algún motivo no existe
  if (!task) {
    return (
      <View style={styles.container}>
        <Text>
          No se encontró el sifonado.
        </Text>
      </View>
    );
  }

  // 4. Si existe, mostramos sus datos
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        {task.title}
      </Text>

      <Text>
        Tanques: {task.tankRange}
      </Text>

      <Text>
        {task.description}
      </Text>

      <Text>
        Duración: {task.durationMinutes} minutos
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
});