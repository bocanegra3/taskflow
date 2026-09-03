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
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase/firebaseConfig";


type LoginScreenProps = {
  navigation: any;
};


export default function LoginScreen({
  navigation,
}: LoginScreenProps) {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  const handleLogin = async () => {

    if (
      email.trim() === "" ||
      password.trim() === ""
    ) {
      Alert.alert(
        "Error",
        "Completa email y contraseña"
      );

      return;
    }


    try {

      setLoading(true);


      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );


      // No navegamos manualmente.
      //
      // onAuthStateChanged va a detectar
      // automáticamente que existe un usuario
      // y AppNavigator mostrará la app principal.


    } catch (error: any) {

      console.log(
        "Error login:",
        error
      );


      Alert.alert(
        "Error",
        "No se pudo iniciar sesión. Revisa tus datos."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        SifonadoApp
      </Text>


      <Text style={styles.subtitle}>
        Iniciar sesión
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


      <TouchableOpacity
        style={styles.button}

        onPress={handleLogin}

        disabled={loading}
      >

        <Text style={styles.buttonText}>

          {loading
            ? "Ingresando..."
            : "Ingresar"}

        </Text>

      </TouchableOpacity>


      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Register")
        }
      >

        <Text style={styles.link}>
          ¿No tenés cuenta? Crear cuenta
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

    fontSize: 34,
    fontWeight: "bold",

    textAlign: "center",

    marginBottom: 10,
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