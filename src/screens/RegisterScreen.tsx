import { useState } from "react";

import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase/firebaseConfig";


type RegisterScreenProps = {
  navigation: any;
};


export default function RegisterScreen({
  navigation,
}: RegisterScreenProps) {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  const handleRegister = async () => {

    if (
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {

      Alert.alert(
        "Error",
        "Completa todos los campos"
      );

      return;

    }


    if (password.length < 6) {

      Alert.alert(
        "Error",
        "La contraseña debe tener al menos 6 caracteres"
      );

      return;

    }


    if (
      password !== confirmPassword
    ) {

      Alert.alert(
        "Error",
        "Las contraseñas no coinciden"
      );

      return;

    }


    try {

      setLoading(true);


      await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );


      // Firebase inicia sesión automáticamente
      // después de crear la cuenta.
      //
      // AppNavigator reaccionará mediante
      // onAuthStateChanged.


    } catch (error: any) {

      console.log(
        "Error registro:",
        error
      );


      Alert.alert(
        "Error",
        "No se pudo crear la cuenta"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Crear cuenta
      </Text>


      <Text style={styles.subtitle}>
        SifonadoApp
      </Text>


      <TextInput
        style={styles.input}

        placeholder="Email"

        autoCapitalize="none"

        keyboardType="email-address"

        value={email}

        onChangeText={setEmail}
      />


      <TextInput
        style={styles.input}

        placeholder="Contraseña"

        secureTextEntry

        value={password}

        onChangeText={setPassword}
      />


      <TextInput
        style={styles.input}

        placeholder="Repetir contraseña"

        secureTextEntry

        value={confirmPassword}

        onChangeText={setConfirmPassword}
      />


      <TouchableOpacity
        style={styles.button}

        onPress={handleRegister}

        disabled={loading}
      >

        <Text style={styles.buttonText}>

          {loading
            ? "Creando..."
            : "Crear cuenta"}

        </Text>

      </TouchableOpacity>


      <TouchableOpacity
        onPress={() =>
          navigation.goBack()
        }
      >

        <Text style={styles.link}>
          Volver al login
        </Text>

      </TouchableOpacity>

    </View>

  );

}


const styles = StyleSheet.create({

  container: {
    flex: 1,

    justifyContent: "center",

    paddingHorizontal: 28,

    backgroundColor: "#111827",
  },


  title: {
    color: "#FFFFFF",

    fontSize: 30,
    fontWeight: "bold",

    textAlign: "center",

    marginBottom: 8,
  },


  subtitle: {
    color: "#AAB2C0",

    fontSize: 18,

    textAlign: "center",

    marginBottom: 30,
  },


  input: {
    backgroundColor: "#FFFFFF",

    borderRadius: 10,

    paddingHorizontal: 14,
    paddingVertical: 14,

    fontSize: 16,

    marginBottom: 14,
  },


  button: {
    backgroundColor: "#5B4AE8",

    paddingVertical: 15,

    borderRadius: 10,

    alignItems: "center",

    marginTop: 5,
  },


  buttonText: {
    color: "#FFFFFF",

    fontSize: 16,
    fontWeight: "bold",
  },


  link: {
    color: "#8B80FF",

    textAlign: "center",

    marginTop: 22,

    fontSize: 15,
  },

});