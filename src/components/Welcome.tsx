import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {

  const [ahora, setAhora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setAhora(new Date());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const dosDigitos = (numero: number) => {
    return numero.toString().padStart(2, '0');
  };

  const fecha = `${dosDigitos(ahora.getDate())}/${dosDigitos(
    ahora.getMonth() + 1
  )}/${ahora.getFullYear()}`;

  const hora = `${dosDigitos(ahora.getHours())}:${dosDigitos(
    ahora.getMinutes()
  )}`;

  return (
    <View style={styles.container}>

      <View style={styles.contenido}>

        <Text style={styles.titulo}>
          MetPor
        </Text>

        <View style={styles.menu}>

          <View style={styles.boton}>
            <Text style={styles.textoBoton}>
              Lista de Sifonados
            </Text>
          </View>

          <View style={styles.boton}>
            <Text style={styles.textoBoton}>
              Cargar Sifonados
            </Text>
          </View>

          <View style={styles.boton}>
            <Text style={styles.textoBoton}>
              Historial de Sifonados
            </Text>
          </View>

        </View>

      </View>

      <View style={styles.footer}>
        <Text style={styles.textoFecha}>
          {fecha}   {hora}
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fcffff',
  },

  contenido: {
    flex: 1,
    padding: 50,
  },

  titulo: {
    fontSize: 78,
    color: '#104bdf',
    marginTop: 30,
    textAlign: 'center',
    fontWeight: 700
  },

  menu: {
    marginTop: 90,
    alignItems: 'center',
    gap: 80,
  },

  boton: {
    backgroundColor: '#6354d8',
    width: 340,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },

  textoBoton: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },

  footer: {
    height: 62,
    backgroundColor: '#5a50cf',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textoFecha: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

});