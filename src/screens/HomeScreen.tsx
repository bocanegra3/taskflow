import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  type ListRenderItem,
} from "react-native";
import {
  startTaskInFirestore,
  deleteTaskInFirestore,
  completeTaskInFirestore,
} from "../firebase/tasksService";

import { colors } from "../constants";
import type { SifonadoTask } from "../types/SifonadoTask";



import type {
  RootState,
  AppDispatch,
} from "../store/store";

import {
    setFilter,

} from "../store/tasksSlice";



type HomeScreenProps = {
  navigation: any;
};
// -----------------------------------------------------
// FUNCIÓN PARA MOSTRAR EL TIEMPO
// -----------------------------------------------------
//
// Recibe segundos.
//
// Ejemplo:
//
// 90 segundos
//
// devuelve:
//
// 01:30
// -----------------------------------------------------

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}


// -----------------------------------------------------
// FORMATEAR HORA DE INICIO
// -----------------------------------------------------
//
// Date.now() guarda un número.
//
// Esta función lo transforma en algo como:
//
// 12:30
// -----------------------------------------------------

function formatStartTime(timestamp: number) {
 return new Date(timestamp).toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Argentina/Buenos_Aires",
  });
}


export default function HomeScreen({
  navigation,
}: HomeScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const filter = useSelector(
  (state: RootState) => state.tasks.filter
);
const tasks = useSelector(
  (state: RootState) => state.tasks.tasks
);
const filteredTasks = tasks.filter((task) => {
  if (filter === "pending") {
    return !task.completed;
  }

  if (filter === "completed") {
    return task.completed;
  }

  return true;
});

// Obtenemos la lista de sifonados
// directamente desde el Store global.

  // ---------------------------------------------------
  // RELOJ GENERAL
  // ---------------------------------------------------
  //
  // Actualizamos "now" cada segundo.
  //
  // Esto hace que las barras y los tiempos
  // se actualicen automáticamente.
  // ---------------------------------------------------

  const [now, setNow] = useState(Date.now());


  useEffect(() => {

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);


    // Cuando HomeScreen deja de existir,
    // detenemos el intervalo.
    return () => {
      clearInterval(interval);
    };

  }, []);
  // ---------------------------------------------------
// COMPLETAR SIFONADOS AUTOMÁTICAMENTE
// ---------------------------------------------------
//
// Cada vez que cambia "now", revisamos todas
// las tareas que ya comenzaron.
//
// Si el tiempo transcurrido supera la duración
// programada, Redux la marca como completada.
//

useEffect(() => {

  tasks.forEach((task) => {

    // Todavía no inició.
    if (task.startedAt === null) {
      return;
    }

    // Ya terminó.
    if (task.completed) {
      return;
    }


    const totalDurationMs =
      task.durationMinutes * 60 * 1000;


    const elapsedMs =
      now - task.startedAt;


    if (elapsedMs >= totalDurationMs) {

      // Firestore marca el sifonado
      // como completado.
      completeTaskInFirestore(
        task.id
      ).catch((error) => {

        console.log(
          "Error completando sifonado:",
          error
        );

      });

    }

  });

}, [now, tasks]);


  // ---------------------------------------------------
  // INICIAR SIFONADO
  // ---------------------------------------------------
const handleStartTask = async (id: string) => {
  try {
    await startTaskInFirestore(id);
  } catch (error) {
    console.log(
      "Error iniciando sifonado:",
      error
    );

    Alert.alert(
      "Error",
      "No se pudo iniciar el sifonado. Revisá tu conexión."
    );
  }
};
  // ---------------------------------------------------
  // ELIMINAR SIFONADO
  // ---------------------------------------------------
const handleDeleteTask = async (id: string) => {
  try {
    await deleteTaskInFirestore(id);
  } catch (error) {
    console.log(
      "Error eliminando sifonado:",
      error
    );

    Alert.alert(
      "Error",
      "No se pudo eliminar el sifonado. Revisá tu conexión."
    );
  }
};
  // ---------------------------------------------------
  // RENDER DE CADA TARJETA
  // ---------------------------------------------------

  const renderTask: ListRenderItem<SifonadoTask> = ({
    item,
  }) => {

    // Tiempo total de la tarea pasado a segundos.
    const totalSeconds =
      item.durationMinutes * 60;


    // -------------------------------------------------
    // TIEMPO TRANSCURRIDO
    // -------------------------------------------------

    let elapsedSeconds = 0;


    if (item.startedAt !== null) {

      elapsedSeconds = Math.floor(
        (now - item.startedAt) / 1000
      );

    }


    // Nunca permitimos que supere
    // la duración total.
    elapsedSeconds = Math.min(
      elapsedSeconds,
      totalSeconds
    );


    // -------------------------------------------------
    // TIEMPO RESTANTE
    // -------------------------------------------------

    const remainingSeconds = Math.max(
      totalSeconds - elapsedSeconds,
      0
    );


    // -------------------------------------------------
    // PORCENTAJE DE PROGRESO
    // -------------------------------------------------

    const progress =
      totalSeconds > 0
        ? elapsedSeconds / totalSeconds
        : 0;


    const progressPercent =
      Math.round(progress * 100);


    const progressWidth =
      `${progressPercent}%` as `${number}%`;


    const finished =
      item.startedAt !== null &&
      remainingSeconds === 0;


    return (

      // ------------------------------------------------
      // TODA LA TARJETA ES PRESIONABLE
      // ------------------------------------------------
      //
      // Al tocarla:
      //
      // selectedTask = item
      //
      // y se abre TaskDetail.
      // ------------------------------------------------

  <Pressable
  style={styles.card}
  onPress={() =>
    navigation.navigate("TaskDetail", {
      taskId: item.id,
    })
  }
>
        {/* CABECERA */}

        <View style={styles.cardHeader}>

          <View style={styles.titleContainer}>

            <Text style={styles.cardTitle}>
              {item.title}
            </Text>


            {/* SIFONADOS / TANQUES */}

            <Text style={styles.tankRange}>
              {item.tankRange}
            </Text>

          </View>


          {/* BOTÓN X */}

          <Pressable
            style={styles.deleteButton}

            onPress={(event) => {

              // Evita que al tocar X
              // también se abra el detalle.
              event.stopPropagation();

              handleDeleteTask(item.id);

            }}
          >

            <Text style={styles.deleteText}>
              ×
            </Text>

          </Pressable>

        </View>


        {/* HORA DE INICIO + BOTÓN PLAY */}

        <View style={styles.controlsRow}>

          <View style={styles.startTimeBox}>

            <Text style={styles.startLabel}>
              Inicio
            </Text>

            <Text style={styles.startTime}>

              {item.startedAt
                ? formatStartTime(item.startedAt)
                : "--:--"}

            </Text>

          </View>


          {/* BOTÓN COMENZAR */}

          <Pressable
            style={[
              styles.playButton,

              item.startedAt !== null &&
                styles.playButtonStarted,
            ]}

            onPress={(event) => {

              // Evitamos abrir TaskDetail.
              event.stopPropagation();

              handleStartTask(item.id);

            }}
          >

            <Text style={styles.playText}>

              {item.startedAt !== null
                ? "✓"
                : "▶"}

            </Text>

          </Pressable>

        </View>


        {/* INFORMACIÓN DEL TIEMPO */}

        <View style={styles.timeInformation}>

          <Text style={styles.elapsedText}>
            Lleva {formatTime(elapsedSeconds)}
          </Text>


          <Text style={styles.remainingText}>

            {finished
              ? "Finalizado"
              : `Falta ${formatTime(
                  remainingSeconds
                )}`}

          </Text>

        </View>


        {/* BARRA DE PROGRESO */}

        <View style={styles.progressBackground}>

          <View
            style={[
              styles.progressBar,

              {
                width: progressWidth,
              },

            ]}
          />

        </View>

      </Pressable>

    );

  };
  // ---------------------------------------------------
  // HOME SCREEN
  // ---------------------------------------------------

  return (
    

    <View style={styles.container}>

      <Text style={styles.screenTitle}>
        Sifonados
      </Text>
    <TouchableOpacity
      onPress={() =>
    navigation.navigate("TaskForm")
  }
    >
  <Text style={styles.addButton}>Agregar sifonado</Text>
    </TouchableOpacity>
      <View style={styles.filterContainer}>

  <Pressable
    style={[
      styles.filterButton,
      filter === "all" && styles.filterButtonActive,
    ]}
    onPress={() => dispatch(setFilter("all"))}
  >
    <Text
      style={[
        styles.filterText,
        filter === "all" && styles.filterTextActive,
      ]}
    >
      TODOS
    </Text>
  </Pressable>


  <Pressable
    style={[
      styles.filterButton,
      filter === "pending" && styles.filterButtonActive,
    ]}
    onPress={() => dispatch(setFilter("pending"))}
  >
    <Text
      style={[
        styles.filterText,
        filter === "pending" && styles.filterTextActive,
      ]}
    >
      PENDIENTES
    </Text>
  </Pressable>


  <Pressable
    style={[
      styles.filterButton,
      filter === "completed" && styles.filterButtonActive,
    ]}
    onPress={() => dispatch(setFilter("completed"))}
  >
    <Text
      style={[
        styles.filterText,
        filter === "completed" && styles.filterTextActive,
      ]}
    >
      COMPLETOS
    </Text>
  </Pressable>

</View>
      <FlatList

        data={filteredTasks}

        keyExtractor={(item) =>
          item.id
        }

        renderItem={renderTask}


        // Espacio entre tarjetas.
        contentContainerStyle={[
          styles.listContent,

          tasks.length === 0 &&
            styles.emptyList,
        ]}


        // ---------------------------------------------
        // ESTADO VACÍO
        // ---------------------------------------------

        ListEmptyComponent={

          <View style={styles.emptyContainer}>

            <Text style={styles.emptyTitle}>
              No hay sifonados cargados
            </Text>

            <Text style={styles.emptyText}>
              ¡No tienes Sifonados cargados!
              Empieza por agregar un Sifonado.
            </Text>

          </View>

        }

      />

    </View>

  );

}


// -----------------------------------------------------
// ESTILOS
// -----------------------------------------------------

const styles = StyleSheet.create({

  // ==========================================
  // PANTALLA
  // ==========================================

  container: {
    flex: 1,
    backgroundColor: "#111827",

    paddingHorizontal: 12,
    paddingTop: 18,
  },


  screenTitle: {
    color: "#FFFFFF",

    fontSize: 25,
    fontWeight: "bold",

    marginBottom: 18,
    marginLeft: 10,
  },


  listContent: {
    width: "100%",
    paddingBottom: 30,
  },


  // ==========================================
  // CARD
  // ==========================================

  card: {
    width: "100%",
    alignSelf: "stretch",

    backgroundColor: "#1F2937",
  borderRadius: 12,
  padding: 16,
  marginBottom: 14,
  },


  // ==========================================
  // CABECERA
  // ==========================================

  cardHeader: {
    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "center",
  },


  titleContainer: {
    flex: 1,
    paddingRight: 15,
      fontSize: 28,
  fontWeight: "bold",
  },


  cardTitle: {
    color: "#FFFFFF",

    fontSize: 16,
    fontWeight: "600",

    marginBottom: 12,
  },


  tankRange: {
    color: "#FFFFFF",

    fontSize: 16,
    fontWeight: "bold",

    marginTop: 0,
  },


  // ==========================================
  // BOTÓN ELIMINAR
  // ==========================================

  deleteButton: {
    width: 30,
    height: 30,

    borderRadius: 15,

    borderWidth: 0,

    justifyContent: "center",
    alignItems: "center",

    marginLeft: 10,
  },


  deleteText: {
    color: "#FFFFFF",

    fontSize: 24,
    fontWeight: "bold",

    lineHeight: 25,
  },


  // ==========================================
  // HORA DE INICIO + PLAY
  // ==========================================

  controlsRow: {
    flexDirection: "row",

    justifyContent: "flex-end",
    alignItems: "center",

    marginTop: 12,
  },


  startTimeBox: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#526575",

    borderWidth: 0,
    borderRadius: 0,

    paddingHorizontal: 12,
    paddingVertical: 9,

    marginRight: 18,
  },


  startLabel: {
    color: "#D7DEE3",

    fontSize: 12,

    marginRight: 8,
  },


  startTime: {
    color: "#FFFFFF",

    fontSize: 17,
    fontWeight: "bold",
  },


  // ==========================================
  // BOTÓN PLAY
  // ==========================================

  playButton: {
    width: 42,
    height: 42,

    borderRadius: 21,

    borderWidth: 0,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "transparent",
  },


  playButtonStarted: {
    borderWidth: 0,
  },


  playText: {
    color: "#FFFFFF",

    fontSize: 22,
    fontWeight: "bold",
  },


  // ==========================================
  // INFORMACIÓN DE TIEMPO
  // ==========================================

  timeInformation: {
    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "center",

    marginTop: 10,
    marginBottom: 7,
  },


  elapsedText: {
    color: "#FFFFFF",

    fontSize: 12,
    fontWeight: "500",
  },


  remainingText: {
    color: "#FFFFFF",

    fontSize: 12,
    fontWeight: "500",
  },


  // ==========================================
  // BARRA DE PROGRESO
  // ==========================================

  progressBackground: {
    width: "100%",

    height: 2,

    backgroundColor: "#A7B4BF",

    borderRadius: 0,

    overflow: "hidden",

    marginTop: 3,
  },


  progressBar: {
    height: "100%",

    backgroundColor: "#20B8B2",

    borderRadius: 0,
  },


  // ==========================================
  // LISTA VACÍA
  // ==========================================

  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
  },


  emptyContainer: {
    alignItems: "center",

    paddingHorizontal: 30,
  },


  emptyTitle: {
    color: "#FFFFFF",

    fontSize: 20,
    fontWeight: "bold",

    marginBottom: 10,
  },


  emptyText: {
    color: "#C8D1D7",

    fontSize: 15,

    textAlign: "center",

    lineHeight: 22,
  },
addButton: {
  backgroundColor: "#06050b",
  paddingVertical: 14,
  paddingHorizontal: 20,
  borderRadius: 8,
  alignItems: "center",
  marginBottom: 18,
  color: "#FFFFFF",
  textAlign: "center",
  fontSize: 16,
  fontWeight: "bold",
},

addButtonText: {
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: "bold",
},
filterContainer: {
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
backgroundColor: "#1F2937",

  paddingVertical: 18,

  marginBottom: 20,
},

filterButton: {
  paddingVertical: 6,
  paddingHorizontal: 8,
},

filterButtonActive: {
  borderBottomWidth: 2,
  borderBottomColor: "#56D8D0",
},

filterText: {
  color: "#FFFFFF",

  fontSize: 15,
  fontWeight: "600",
},

filterTextActive: {
  color: "#56D8D0",
},
});