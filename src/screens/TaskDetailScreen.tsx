import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import type { SifonadoTask } from "../types/SifonadoTask";

type TaskDetailScreenProps = {
  route: any;
  tasks: SifonadoTask[];
};

export default function TaskDetailScreen({
  route,
  tasks,
}: TaskDetailScreenProps) {

  // 1. Recibimos el ID enviado desde HomeScreen
  const { taskId } = route.params;

  // 2. Buscamos dentro de tasks
  // la tarea que tenga ese ID
  const task = tasks.find(
    (item) => item.id === taskId
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