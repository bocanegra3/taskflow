import { useState } from "react";
import { useSelector } from "react-redux";

import type {
  RootState,
} from "../store/store";

import {
  createTaskInFirestore,
} from "../firebase/tasksService";

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { colors } from "../constants/colors";




import { useDispatch } from "react-redux";

import type { AppDispatch } from "../store/store";

import { addTask } from "../store/tasksSlice";

// ----------------------------------------------------
// PROPS
// ----------------------------------------------------

type AddTaskScreenProps = {
  navigation: any;

};


export default function AddTaskScreen({
  navigation,
}: AddTaskScreenProps) {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(
  (state: RootState) =>
    state.auth.user
);
  // --------------------------------------------------
  // ESTADOS DEL FORMULARIO
  // --------------------------------------------------

  // Ejemplo:
  // "1b al 4b"
  const [tankRange, setTankRange] = useState("");


  // Descripción del trabajo.
  const [description, setDescription] = useState("");


  // Lo guardamos inicialmente como string
  // porque TextInput siempre trabaja con texto.
  const [duration, setDuration] = useState("");


  // --------------------------------------------------
  // ERRORES
  // --------------------------------------------------

  const [tankRangeError, setTankRangeError] =
    useState("");

  const [descriptionError, setDescriptionError] =
    useState("");

  const [durationError, setDurationError] =
    useState("");


  // --------------------------------------------------
  // FOCO DE LOS INPUTS
  // --------------------------------------------------
  //
  // Los usamos para cambiar el color del borde.
  //

  const [tankFocused, setTankFocused] =
    useState(false);

  const [descriptionFocused, setDescriptionFocused] =
    useState(false);

  const [durationFocused, setDurationFocused] =
    useState(false);


  // --------------------------------------------------
  // VALIDACIÓN
  // --------------------------------------------------

  const validateForm = () => {

    let isValid = true;


    // Primero borramos errores anteriores.

    setTankRangeError("");
    setDescriptionError("");
    setDurationError("");


    // -------------------------------
    // VALIDAR TANQUES
    // -------------------------------

    if (tankRange.trim() === "") {

      setTankRangeError(
        "Debes indicar los tanques."
      );

      isValid = false;

    }


    // -------------------------------
    // VALIDAR DESCRIPCIÓN
    // -------------------------------

    if (description.trim() === "") {

      setDescriptionError(
        "El Horario es obligatoro."
      );

      isValid = false;

    }
    else if (description.trim().length < 4) {

      setDescriptionError(
        "El Horario debe tener al menos 4 caracteres."
      );

      isValid = false;

    }


    // -------------------------------
    // VALIDAR DURACIÓN
    // -------------------------------

    const durationNumber = Number(duration);


    if (duration.trim() === "") {

      setDurationError(
        "Debes indicar la duración."
      );

      isValid = false;

    }
    else if (
      Number.isNaN(durationNumber) ||
      durationNumber <= 0
    ) {

      setDurationError(
        "La duración debe ser mayor a 0."
      );

      isValid = false;

    }


    return isValid;

  };


  // --------------------------------------------------
  // GUARDAR SIFONADO
  // --------------------------------------------------

  const handleAddTask = async () => {

    // Primero validamos.
    const isValid = validateForm();


    // Si algo está mal,
    // detenemos la función.
    if (!isValid) {
      return;
    }


    // Creamos el objeto final.
if (!user) {

  Alert.alert(
    "Error",
    "No hay un usuario autenticado"
  );

  return;
}


try {

  await createTaskInFirestore(
    user.uid,
    {
      title:
        "Sifonados de los Tanques",

      tankRange:
        tankRange.trim(),

      description:
        description.trim(),

      category:
        "Sifonado",

      durationMinutes:
        Number(duration),
    }
  );


  Alert.alert(
    "Éxito",
    "Sifonado agregado"
  );


  setTankRange("");
  setDescription("");
  setDuration("");


  navigation.navigate(
    "TaskList"
  );

} catch (error) {

  console.log(
    "Error creando sifonado:",
    error
  );


  Alert.alert(
    "Error",
    "No se pudo guardar el sifonado"
  );

}


    // Podemos verlo en la consola.
    console.log(
      "Nuevo sifonado:",     
    );


    // ------------------------------------------------
    // ENVIAMOS EL SIFONADO
    // ------------------------------------------------

   


    // Mensaje para el usuario.

    Alert.alert(
      "Éxito",
      "Sifonado agregado a la lista"
    );

    navigation.navigate("TaskList");
    // ------------------------------------------------
    // LIMPIAMOS EL FORMULARIO
    // ------------------------------------------------

    setTankRange("");
    setDescription("");
    setDuration("");

  };


  // --------------------------------------------------
  // INTERFAZ
  // --------------------------------------------------

  return (

    <KeyboardAvoidingView
      style={styles.screen}

      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >

      <ScrollView
        contentContainerStyle={
          styles.scrollContent
        }

        keyboardShouldPersistTaps="handled"
      >

        {/* ENCABEZADO */}

        <View style={styles.header}>

          <Text style={styles.title}>
            Agregar sifonado
          </Text>

          <Text style={styles.subtitle}>
            Cargá los tanques y el tiempo estimado.
          </Text>

        </View>


        {/* FORMULARIO */}

        <View style={styles.form}>


          {/* ---------------------------
              TANQUES
          ---------------------------- */}

          <View style={styles.fieldContainer}>

            <Text style={styles.label}>
              Tanques
            </Text>

            <TextInput
              value={tankRange}

              onChangeText={(text) => {

                setTankRange(text);

                // Si el usuario comienza
                // a corregir el dato,
                // eliminamos el error.
                if (tankRangeError) {
                  setTankRangeError("");
                }

              }}

              placeholder="Ejemplo: 1b al 4b"

              autoCapitalize="sentences"

              onFocus={() =>
                setTankFocused(true)
              }

              onBlur={() =>
                setTankFocused(false)
              }

              style={[

                styles.input,

                tankFocused &&
                  styles.inputFocused,

                tankRangeError !== "" &&
                  styles.inputError,

              ]}
            />


            {tankRangeError !== "" && (

              <Text style={styles.errorText}>
                {tankRangeError}
              </Text>

            )}

          </View>


          {/* ---------------------------
              DESCRIPCIÓN
          ---------------------------- */}

          <View style={styles.fieldContainer}>

            <Text style={styles.label}>
              Horarios de Sifonados
            </Text>

            <TextInput
              value={description}

              onChangeText={(text) => {

                setDescription(text);

                if (descriptionError) {
                  setDescriptionError("");
                }

              }}

              placeholder="Ejemplo: 13:40 Hrs"

              multiline

              numberOfLines={4}

              textAlignVertical="top"

              autoCapitalize="sentences"

              onFocus={() =>
                setDescriptionFocused(true)
              }

              onBlur={() =>
                setDescriptionFocused(false)
              }

              style={[

                styles.input,

                styles.descriptionInput,

                descriptionFocused &&
                  styles.inputFocused,

                descriptionError !== "" &&
                  styles.inputError,

              ]}
            />


            {descriptionError !== "" && (

              <Text style={styles.errorText}>
                {descriptionError}
              </Text>

            )}

          </View>


          {/* ---------------------------
              DURACIÓN
          ---------------------------- */}

          <View style={styles.fieldContainer}>

            <Text style={styles.label}>
              Duración estimada
            </Text>


            <View style={styles.durationRow}>

              <TextInput
                value={duration}

                onChangeText={(text) => {

                  setDuration(text);

                  if (durationError) {
                    setDurationError("");
                  }

                }}

                placeholder="40"

                // Solo teclado numérico.
                keyboardType="numeric"

                onFocus={() =>
                  setDurationFocused(true)
                }

                onBlur={() =>
                  setDurationFocused(false)
                }

                style={[

                  styles.input,

                  styles.durationInput,

                  durationFocused &&
                    styles.inputFocused,

                  durationError !== "" &&
                    styles.inputError,

                ]}
              />


              <Text style={styles.minutesText}>
                minutos
              </Text>

            </View>


            {durationError !== "" && (

              <Text style={styles.errorText}>
                {durationError}
              </Text>

            )}

          </View>


          {/* ---------------------------
              BOTÓN GUARDAR
          ---------------------------- */}

          <TouchableOpacity
            style={styles.saveButton}

            activeOpacity={0.8}

            onPress={handleAddTask}
          >

            <Text style={styles.saveButtonText}>
              Guardar sifonado
            </Text>

          </TouchableOpacity>

        </View>

      </ScrollView>

    </KeyboardAvoidingView>

  );

}


// ----------------------------------------------------
// ESTILOS
// ----------------------------------------------------

const styles = StyleSheet.create({

  screen: {
  flex: 1,
  backgroundColor: "#111827",
  },


  scrollContent: {
    flexGrow: 1,

    paddingHorizontal: 24,
    paddingVertical: 30,
  },


  header: {
    marginBottom: 25,
  },


 title: {
  color: "#FFFFFF",
  fontSize: 30,
  fontWeight: "bold",
},
subtitle: {
  color: "#9CA3AF",
},



  form: {
  backgroundColor: "#1F2937",
  borderRadius: 18,
  padding: 22,
  },


  fieldContainer: {
    marginBottom: 22,
    
  },


  label: {
    fontSize: 16,
    fontWeight: "600",

    marginBottom: 8,

    color: "#ffffff",
  },


  input: {
    minHeight: 52,

    borderWidth: 1.5,

    borderColor: "#D5D8E0",

    borderRadius: 10,

    paddingHorizontal: 14,

    fontSize: 16,

    backgroundColor: "#FFFFFF",
  },


  descriptionInput: {
    minHeight: 32,

    paddingTop: 12,
  },


  durationRow: {
    flexDirection: "row",
    alignItems: "center",

    gap: 12,
  },


  durationInput: {
    flex: 1,
  },


  minutesText: {
    fontSize: 16,

    color: "#626879",
  },


  inputFocused: {
    borderColor: colors.botonColor,
  },


  inputError: {
    borderColor: "#D93025",
  },


  errorText: {
    color: "#D93025",

    fontSize: 13,

    marginTop: 6,
  },


  saveButton: {
    minHeight: 52,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: colors.botonColor,

    borderRadius: 10,
  },


  saveButtonText: {
    color: "#FFFFFF",

    fontSize: 17,
    fontWeight: "bold",
  },

});