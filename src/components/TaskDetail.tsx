import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import type { SifonadoTask } from "../types/SifonadoTask";


type Props = {

  // La tarea que queremos mostrar.
  task: SifonadoTask;

  // Función que HomeScreen nos pasa
  // para regresar.
  onBack: () => void;
};


export default function TaskDetail({
  task,
  onBack,
}: Props) {

  return (

    <View style={styles.container}>

      <View style={styles.card}>

        <Text style={styles.label}>
          Sifonado
        </Text>

        <Text style={styles.title}>
          {task.title}
        </Text>


        <Text style={styles.label}>
          Tanques
        </Text>

        <Text style={styles.tanks}>
          {task.tankRange}
        </Text>


        <Text style={styles.label}>
          Horario de Sifonado
        </Text>

        <Text style={styles.description}>
          {task.description}
        </Text>


        <Text style={styles.label}>
          Categoría
        </Text>

        <Text style={styles.value}>
          {task.category}
        </Text>


        <Text style={styles.label}>
          Duración programada
        </Text>

        <Text style={styles.value}>
          {task.durationMinutes} minutos
        </Text>


        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
        >

          <Text style={styles.backText}>
            Volver
          </Text>

        </TouchableOpacity>

      </View>

    </View>

  );

}


const styles = StyleSheet.create({

  container: {
    flex: 1,

    justifyContent: "center",

    backgroundColor: "#033A31",

    padding: 24,
  },


  card: {
    backgroundColor: "#314250",

    padding: 24,

    borderRadius: 15,
  },


  label: {
    color: "#AAB5BD",

    fontSize: 13,

    marginTop: 18,
    marginBottom: 5,
  },


  title: {
    color: "#FFFFFF",

    fontSize: 25,
    fontWeight: "bold",
  },


  tanks: {
    color: "#FF6B6B",

    fontSize: 22,
    fontWeight: "bold",
  },


  description: {
    color: "#FFFFFF",

    fontSize: 16,
    lineHeight: 23,
  },


  value: {
    color: "#FFFFFF",

    fontSize: 17,
  },


  backButton: {
    backgroundColor: "#5546E8",

    marginTop: 35,

    paddingVertical: 14,

    borderRadius: 8,

    alignItems: "center",
  },


  backText: {
    color: "#FFFFFF",

    fontSize: 16,
    fontWeight: "bold",
  },

});