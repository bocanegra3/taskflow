import { useState } from "react";
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

import colors from "../constants/colors";

const CATEGORIES = ["Trabajo", "Estudio", "Personal"] as const;

type Category = (typeof CATEGORIES)[number];

type FormErrors = {
  title?: string;
  description?: string;
};

export default function AddTaskScreen() {
  // Estados de los campos del formulario
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("Trabajo");

  // Estado de los errores
  const [errors, setErrors] = useState<FormErrors>({});

  // Estados para cambiar el borde cuando un campo tiene foco
  const [titleFocused, setTitleFocused] = useState(false);
  const [descriptionFocused, setDescriptionFocused] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const cleanTitle = title.trim();
    const cleanDescription = description.trim();

    if (!cleanTitle) {
      newErrors.title = "El título es obligatorio.";
    } else if (cleanTitle.length < 5) {
      newErrors.title = "El título debe tener al menos 5 caracteres.";
    }

    if (!cleanDescription) {
      newErrors.description = "La descripción es obligatoria.";
    } else if (cleanDescription.length < 10) {
      newErrors.description =
        "La descripción debe tener al menos 10 caracteres.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);

    // Elimina el mensaje mientras el usuario corrige el campo.
    if (errors.title) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        title: undefined,
      }));
    }
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);

    if (errors.description) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        description: undefined,
      }));
    }
  };

  const handleAddTask = () => {
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const newTask = {
      title: title.trim(),
      description: description.trim(),
      category,
    };

    console.log("Nueva tarea:", newTask);

    Alert.alert("Éxito", "Tarea capturada localmente");

    // Limpieza del formulario
    setTitle("");
    setDescription("");
    setCategory("Trabajo");
    setErrors({});
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Crear tarea</Text>

          <Text style={styles.subtitle}>
            Agregá una nueva actividad a TaskFlow.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Título</Text>

            <TextInput
              value={title}
              onChangeText={handleTitleChange}
              placeholder="Ejemplo: Completar entrega"
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="sentences"
              keyboardType="default"
              returnKeyType="next"
              onFocus={() => setTitleFocused(true)}
              onBlur={() => setTitleFocused(false)}
              style={[
                styles.input,
                titleFocused && styles.inputFocused,
                errors.title && styles.inputError,
              ]}
            />

            {errors.title ? (
              <Text style={styles.errorText}>{errors.title}</Text>
            ) : null}
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Descripción</Text>

            <TextInput
              value={description}
              onChangeText={handleDescriptionChange}
              placeholder="Describí la tarea que necesitás realizar"
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="sentences"
              keyboardType="default"
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              onFocus={() => setDescriptionFocused(true)}
              onBlur={() => setDescriptionFocused(false)}
              style={[
                styles.input,
                styles.descriptionInput,
                descriptionFocused && styles.inputFocused,
                errors.description && styles.inputError,
              ]}
            />

            {errors.description ? (
              <Text style={styles.errorText}>{errors.description}</Text>
            ) : null}
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Categoría</Text>

            <View style={styles.categoriesContainer}>
              {CATEGORIES.map((item) => {
                const isSelected = category === item;

                return (
                  <TouchableOpacity
                    key={item}
                    activeOpacity={0.8}
                    onPress={() => setCategory(item)}
                    style={[
                      styles.categoryButton,
                      isSelected && styles.categoryButtonSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        isSelected && styles.categoryTextSelected,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            activeOpacity={0.8}
            onPress={handleAddTask}
          >
            <Text style={styles.saveButtonText}>Guardar tarea</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  header: {
    marginBottom: 30,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },

  form: {
    backgroundColor: colors.card,
    padding: 22,
    borderRadius: 18,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,

    elevation: 5,
  },

  fieldContainer: {
    marginBottom: 22,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 8,
  },

  input: {
    width: "100%",
    minHeight: 52,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.white,
    color: colors.text,
    fontSize: 16,
  },

  descriptionInput: {
    minHeight: 120,
  },

  inputFocused: {
    borderColor: colors.primary,
  },

  inputError: {
    borderColor: colors.error,
  },

  errorText: {
    marginTop: 6,
    color: colors.error,
    fontSize: 13,
  },

  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 20,
    backgroundColor: colors.white,
  },

  categoryButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  categoryText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: "600",
  },

  categoryTextSelected: {
    color: colors.white,
  },

  saveButton: {
    minHeight: 52,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginTop: 4,
  },

  saveButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "bold",
  },
});