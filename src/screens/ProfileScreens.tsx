import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileCard from "../components/ProfileCard";
import colors from "../constants/colors"

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Metpor</Text>

        <Text style={styles.subtitle}>
          Información del usuario de TaskFlow
        </Text>

        <ProfileCard
          name="Fran"
          role="Desarrollador Frontend Junior"
          image="https://media.licdn.com/dms/image/v2/D4D03AQHtpKRvlAoQEw/profile-displayphoto-scale_200_200/B4DZ0iNKFnIYBE-/0/1774395369744?e=1787184000&v=beta&t=QbUJES7wx4nirH52Fwc7XWinreFkZ3ljs9tW2ASnmjU"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgounrdColor,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 87,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 30,
  },
});